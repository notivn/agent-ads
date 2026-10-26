#!/usr/bin/env node
// Runs one Ads-department workflow unattended (for Windows Task Scheduler / cron).
//
//   node scripts/run-schedule.mjs <quy-trinh> [--tool claude|codex|antigravity] [--dry-run]
//   node scripts/run-schedule.mjs --crontab      print crontab lines from lich.json
//
// Claude Code needs env ADS_MCP_URL (the MCP link with its key). Codex / Antigravity read the MCP
// link from their own user config (see mcp/*.example.*). The link is never logged.
import { spawn } from "node:child_process"
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
  createWriteStream,
} from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

// The agent-ads-mcp folder: workspace root for every CLI and base of all relative paths.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const LOG_DIR = path.join(ROOT, "nhat-ky", "lich")
const TIMEOUT_MS = 30 * 60 * 1000
const LOCK_STALE_MS = 60 * 60 * 1000
const MCP = "mcp__ads-mcp__"
// Never needed by the department; blocked on the client side as well as by the MCP grant.
const DENIED_MCP_TOOLS = [
  "ads_delete_object",
  "apify_run_actor",
  "tiktok_gmv_max_update",
  "tiktok_gmv_max_creatives",
  "tiktok_gmv_max_create",
  "google_ads_link_assets",
  "google_ads_update_campaign_targeting",
]
// Unattended runs may only read, pause / change budgets, report and research (nguong-an-toan.md §6).
// Creating objects or editing targeting / creatives / bids is never allowed without a person.
// Known limit: ads_set_status cannot be restricted to "paused" at the tool level — the agents'
// rules and the MCP money caps are what stop an unattended "active".
const SCHEDULED_MCP_TOOLS = [
  "ads_list_accounts",
  "ads_get_report",
  "ads_list_objects",
  "ads_get_object",
  "ads_lookup",
  "ads_get_media_upload",
  "ads_set_status",
  "ads_update_budget",
  "google_ads_run_gaql",
  "google_ads_get_campaign_targeting",
  "google_ads_list_assets",
  "openai_ads_get_conversions",
  "tiktok_gmv_max_shops",
  "tiktok_gmv_max_campaigns",
  "tiktok_gmv_max_report",
  "tiktok_gmv_max_products",
  "tiktok_gmv_max_identities",
  "tiktok_gmv_max_bid_recommend",
  "tiktok_messaging_assets",
  "meta_list_pages",
  "meta_list_page_posts",
  "meta_get_post",
  "meta_get_post_insights",
  "meta_get_page_insights",
  "drive_list_sources",
  "drive_list_files",
  "drive_sheet_read",
  "drive_sheet_update_rows",
  "telegram_list_channels",
  "telegram_send_message",
  "apify_list_tasks",
  "apify_run_task",
  "apify_get_run",
  "apify_get_results",
  "apify_abort_run",
]

const args = process.argv.slice(2)
const schedule = JSON.parse(readFileSync(path.join(ROOT, "lich.json"), "utf8"))

if (args.includes("--crontab")) {
  const days = { "hang-ngay": "*", "thu-hai": "1" }
  console.log(`CRON_TZ=${schedule.mui_gio}`)
  for (const item of schedule.lich) {
    const [hh, mm] = item.gio.split(":").map(Number)
    console.log(
      `${mm} ${hh} * * ${days[item.ngay] ?? "*"} cd "${ROOT}" && node scripts/run-schedule.mjs ${item.quy_trinh} >/dev/null 2>&1`
    )
  }
  process.exit(0)
}

const workflow = args.find((a) => !a.startsWith("--"))
const tool = args.includes("--tool")
  ? args[args.indexOf("--tool") + 1]
  : "claude"
const dryRun = args.includes("--dry-run")
if (
  !workflow ||
  !/^[a-z0-9-]+$/.test(workflow) ||
  !existsSync(path.join(ROOT, "quy-trinh", `${workflow}.md`))
) {
  console.error(
    "Thiếu hoặc sai tên quy trình. Có: bao-cao-sang, tuan-tra, bao-cao-cuoi-ngay, bao-cao-tuan"
  )
  process.exit(2)
}
if (!["claude", "codex", "antigravity"].includes(tool)) {
  console.error("--tool chỉ nhận claude | codex | antigravity")
  process.exit(2)
}

const vnNow = new Intl.DateTimeFormat("sv-SE", {
  timeZone: schedule.mui_gio,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
}).formatToParts(new Date())
const part = (t) => vnNow.find((p) => p.type === t)?.value
const date = `${part("year")}-${part("month")}-${part("day")}`
const time = `${part("hour")}:${part("minute")}`
const weekday = new Intl.DateTimeFormat("vi-VN", {
  timeZone: schedule.mui_gio,
  weekday: "long",
}).format(new Date())

// Kept free of shell metacharacters (% ^ & | < > " !) because Windows runs the CLIs through cmd.exe.
const prompt = [
  `Chạy quy trình ${workflow} theo đúng file quy-trinh/${workflow}.md.`,
  `Bây giờ là ${date} ${time} giờ Việt Nam (${weekday}).`,
  "Đây là lần chạy theo lịch, KHÔNG có người trực: không hỏi lại; không bao giờ gửi confirm_token;",
  "việc nào cần người duyệt thì ghi đề xuất vào nhat-ky/de-xuat.md và báo Telegram.",
  "Kết thúc bằng tóm tắt ngắn: số thao tác đã làm, số đề xuất chờ duyệt, lỗi.",
].join(" ")
if (/[%^&|<>"!]/.test(prompt))
  throw new Error("prompt contains shell metacharacters")

function commandFor() {
  if (tool === "claude") {
    const allowed = [
      "Read",
      "Glob",
      "Grep",
      "Agent",
      "Edit(./nhat-ky/**)",
      ...SCHEDULED_MCP_TOOLS.map((t) => MCP + t),
    ]
    const denied = [
      "Bash",
      "WebFetch",
      "WebSearch",
      ...DENIED_MCP_TOOLS.map((t) => MCP + t),
    ]
    return {
      cmd: "claude",
      argv: [
        "-p",
        "--agent",
        "ads-truong-phong",
        "--mcp-config",
        ".mcp.json",
        "--strict-mcp-config",
        "--permission-mode",
        "dontAsk",
        "--allowedTools",
        allowed.join(","),
        "--disallowedTools",
        denied.join(","),
        "--output-format",
        "json",
      ],
      stdin: prompt,
    }
  }
  const entry =
    "Dùng skill phong-ads (đọc .agents/skills/phong-ads/SKILL.md) và giao việc cho các agent con ads-*. "
  if (tool === "codex") {
    return {
      cmd: "codex",
      argv: [
        "exec",
        "--sandbox",
        "workspace-write",
        "-c",
        'approval_policy="never"',
        "--skip-git-repo-check",
        entry + prompt,
      ],
    }
  }
  return {
    cmd: "agy",
    argv: [
      "-p",
      entry + prompt,
      "--agent",
      "ads-truong-phong",
      "--output-format",
      "text",
    ],
  }
}

function quoteForCmd(a) {
  return /^[\w./:=@,*()-]+$/.test(a) ? a : `"${a.replace(/"/g, '\\"')}"`
}

if (tool === "claude" && !process.env.ADS_MCP_URL) {
  console.error(
    "Chưa đặt biến môi trường ADS_MCP_URL (link MCP của Ads MCP Simple). Xem README.md"
  )
  process.exit(2)
}

const { cmd, argv, stdin } = commandFor()
if (dryRun) {
  console.log([cmd, ...argv].map(quoteForCmd).join(" "))
  if (stdin) console.log(`(stdin) ${stdin}`)
  process.exit(0)
}

mkdirSync(LOG_DIR, { recursive: true })
const lock = path.join(LOG_DIR, ".lock")
if (existsSync(lock) && Date.now() - statSync(lock).mtimeMs < LOCK_STALE_MS) {
  console.error("Một quy trình khác đang chạy — bỏ qua lần này.")
  process.exit(3)
}
writeFileSync(lock, `${process.pid} ${workflow} ${date} ${time}\n`)

const base = path.join(
  LOG_DIR,
  `${date}-${time.replace(":", "")}-${workflow}-${tool}`
)
const outFile = createWriteStream(
  `${base}.out${tool === "claude" ? ".json" : ".txt"}`
)
const errFile = createWriteStream(`${base}.err.log`)
const isWin = process.platform === "win32"
const child = spawn(
  isWin ? [cmd, ...argv].map(quoteForCmd).join(" ") : cmd,
  isWin ? [] : argv,
  {
    cwd: ROOT,
    shell: isWin,
    stdio: ["pipe", "pipe", "pipe"],
    env: process.env,
    windowsHide: true,
  }
)
child.stdout.pipe(outFile)
child.stderr.pipe(errFile)
child.stdin.end(stdin ?? "")
const timer = setTimeout(() => {
  errFile.write(`\nHết thời gian ${TIMEOUT_MS / 60000} phút — dừng.\n`)
  child.kill()
}, TIMEOUT_MS)
child.on("error", (err) => {
  errFile.write(`Không chạy được ${cmd}: ${err.message}\n`)
})
child.on("close", (code) => {
  clearTimeout(timer)
  rmSync(lock, { force: true })
  console.log(
    `${workflow} (${tool}) xong, mã thoát ${code}. Nhật ký: ${path.relative(ROOT, base)}.*`
  )
  process.exit(code ?? 1)
})
