#!/usr/bin/env node
// Generates the Codex / Antigravity copies of the Ads department from the single source of truth:
// .claude/agents/ads-*.md (Claude Code subagents). Never edit the generated files by hand.
//
//   node scripts/build-agents.mjs          write files
//   node scripts/build-agents.mjs --check  fail if generated files are stale
//
// Outputs (paths relative to the agent-ads-mcp folder):
//   AGENTS.md                              whole department in ONE file (any AGENTS.md-aware tool)
//   .codex/agents/<name>.toml              Codex custom subagents
//   .agents/agents/<name>.md               Antigravity custom subagents
//   .agents/skills/phong-ads/SKILL.md      entry skill (manager) for Codex + Antigravity
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const AGENTS_DIR = path.join(ROOT, ".claude/agents")
const BUNDLE = "AGENTS.md"
const MANAGER = "ads-truong-phong"
const MCP_PREFIX = "mcp__ads-mcp__"
const CODEX_DOC_LIMIT = 32 * 1024 // Codex project_doc_max_bytes default
const GENERATED =
  "Tự sinh bởi scripts/build-agents.mjs — KHÔNG sửa tay, sửa .claude/agents/ads-*.md rồi chạy lại."

function parseAgent(file) {
  const raw = readFileSync(file, "utf8").replace(/\r\n/g, "\n")
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error(`${file}: thiếu frontmatter`)
  const meta = {}
  let listKey = null
  for (const line of m[1].split("\n")) {
    const item = line.match(/^\s+-\s+(.*)$/)
    if (item && listKey) {
      meta[listKey].push(item[1].trim())
      continue
    }
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (!kv) continue
    listKey = kv[2] === "" ? kv[1] : null
    meta[kv[1]] = kv[2] === "" ? [] : kv[2].trim()
  }
  if (!meta.name || !meta.description)
    throw new Error(`${file}: cần name + description`)
  return { meta, body: m[2].trim() }
}

// "Agent(a, b), Read, mcp__ads-mcp__x" → { delegates: [a, b], mcpTools: [x] }
function splitTools(tools = "") {
  const delegates = []
  const rest = tools.replace(/Agent\(([^)]*)\)/, (_, list) => {
    delegates.push(
      ...list
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    )
    return ""
  })
  const mcpTools = rest
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.startsWith(MCP_PREFIX))
    .map((s) => s.slice(MCP_PREFIX.length))
  return { delegates, mcpTools }
}

function toolNote({ mcpTools }) {
  if (!mcpTools.length) return ""
  return `\n\n## Tool MCP được dùng (server \`ads-mcp\` — Ads MCP Simple)\nChỉ gọi các tool sau, không gọi tool ghi nào khác: ${mcpTools.map((t) => `\`${t}\``).join(", ")}.`
}

// Other tools spawn subagents differently: replace the Claude-specific launch hint in the manager.
function portableBody(body) {
  return body.replace(
    /Chạy làm phiên chính bằng `claude --agent [^`]+`\.?/g,
    ""
  )
}

// Push agent headings one level down so they nest under "## Vai: …" (fenced code blocks untouched).
function demoteHeadings(body) {
  let inFence = false
  return body
    .split("\n")
    .map((line) => {
      if (line.startsWith("```")) inFence = !inFence
      return !inFence && /^#{1,5} /.test(line) ? `#${line}` : line
    })
    .join("\n")
}

function tomlString(s) {
  if (s.includes("'''"))
    throw new Error("Nội dung agent chứa ''' — không đưa được vào TOML")
  return `'''\n${s}\n'''`
}

function buildAll() {
  // The department = the manager + exactly the subagents it may delegate to (other .claude/agents
  // files, e.g. the repo's dev reviewers, are not part of it).
  const manager = parseAgent(path.join(AGENTS_DIR, `${MANAGER}.md`))
  const staff = splitTools(manager.meta.tools)
    .delegates.sort()
    .map((name) => {
      const file = path.join(AGENTS_DIR, `${name}.md`)
      if (!existsSync(file))
        throw new Error(
          `Trưởng phòng giao việc cho ${name} nhưng không có ${name}.md`
        )
      return parseAgent(file)
    })
  const agents = [manager, ...staff]
  for (const a of agents)
    a.meta.description = portableBody(a.meta.description).trim()
  const out = new Map()

  // 1) One-file department.
  const sections = [
    `# Phòng Performance Ads — toàn bộ agent trong 1 file\n\n> ${GENERATED}\n> Dùng cho Codex, Antigravity và mọi công cụ đọc AGENTS.md. Mọi đường dẫn tính từ **thư mục gốc của gói** (thư mục chứa file này).\n> MCP: server tên \`ads-mcp\` trỏ tới link MCP của Ads MCP Simple (xem README.md).`,
    `## Cách làm việc\nBạn là **${MANAGER}** (Trưởng phòng). Các vai bên dưới là nhân sự của bạn. Nếu công cụ hỗ trợ agent con (subagent), giao việc cho agent con cùng tên; nếu không, tự đóng lần lượt từng vai, làm đúng hướng dẫn và chỉ dùng tool của vai đó.\nLuật chung: đọc \`nguong-an-toan.md\` và \`muc-tieu-kpi.md\` trước mọi việc.`,
    ...[manager, ...staff].map(
      (a) =>
        `## Vai: ${a.meta.name}\n_${a.meta.description}_\n\n${demoteHeadings(portableBody(a.body))}${toolNote(splitTools(a.meta.tools)).replace("\n## ", "\n### ")}`
    ),
  ]
  const bundle = sections.join("\n\n---\n\n") + "\n"
  out.set(BUNDLE, bundle)

  // 2) Codex subagents (.codex/agents/*.toml). MCP comes from the parent session's config.
  for (const a of agents) {
    const instr = `${portableBody(a.body)}${toolNote(splitTools(a.meta.tools))}`
    out.set(
      `.codex/agents/${a.meta.name}.toml`,
      `# ${GENERATED}\nname = ${JSON.stringify(a.meta.name)}\ndescription = ${JSON.stringify(a.meta.description)}\ndeveloper_instructions = ${tomlString(instr)}\n`
    )
  }

  // 3) Antigravity subagents (.agents/agents/*.md). No `tools` list: Antigravity tool names differ
  //    and a misspelled name can hang the subagent — the allowed list lives in the instructions.
  for (const a of agents) {
    const fm = [
      `name: ${a.meta.name}`,
      `description: ${JSON.stringify(a.meta.description)}`,
      "model: inherit",
    ]
    if (a === manager) fm.push("subagent: false")
    else fm.push("mainAgent: false")
    out.set(
      `.agents/agents/${a.meta.name}.md`,
      `---\n${fm.join("\n")}\n---\n\n<!-- ${GENERATED} -->\n\n${portableBody(a.body)}${toolNote(splitTools(a.meta.tools))}\n`
    )
  }

  // 4) Entry skill for Codex ($phong-ads) and Antigravity (/phong-ads).
  const { delegates } = splitTools(manager.meta.tools)
  out.set(
    ".agents/skills/phong-ads/SKILL.md",
    `---\nname: phong-ads\ndescription: Làm Trưởng phòng Performance Ads (Ads MCP Simple — Meta, TikTok, Google Ads, OpenAI Ads) - điều phối các agent con ads-*, chạy quy trình báo cáo / tối ưu theo ngưỡng an toàn. Dùng khi người dùng nói "phòng ads", "trưởng phòng", "chạy quy trình bao-cao-sang / tuan-tra / bao-cao-cuoi-ngay / bao-cao-tuan" hoặc "duyệt DX-…".\n---\n\n<!-- ${GENERATED} -->\n\nĐóng vai **${MANAGER}**. Hướng dẫn đầy đủ của cả phòng: \`${BUNDLE}\` ở gốc thư mục (đọc phần "Vai: ${MANAGER}" trước).\n\nGiao việc bằng agent con (spawn / delegate subagent) đúng tên: ${delegates.map((d) => `\`${d}\``).join(", ")}. Việc độc lập thì giao song song. Agent con không thấy cuộc trò chuyện: đưa đủ ngữ cảnh khi giao.\n\n${portableBody(manager.body)}\n`
  )
  return out
}

const check = process.argv.includes("--check")
const outputs = buildAll()
let stale = 0
for (const [rel, content] of outputs) {
  const abs = path.join(ROOT, rel)
  const current = existsSync(abs)
    ? readFileSync(abs, "utf8").replace(/\r\n/g, "\n")
    : null
  if (current === content) continue
  stale++
  if (check) {
    console.error(`Cũ: ${rel}`)
    continue
  }
  mkdirSync(path.dirname(abs), { recursive: true })
  writeFileSync(abs, content, "utf8")
  console.log(`Đã ghi ${rel}`)
}
const bundleBytes = Buffer.byteLength(outputs.get(BUNDLE), "utf8")
console.log(`AGENTS.md: ${(bundleBytes / 1024).toFixed(1)} KiB`)
// Codex auto-loads AGENTS.md as project instructions, capped by project_doc_max_bytes (32 KiB default).
if (bundleBytes > CODEX_DOC_LIMIT)
  console.log(
    `Lưu ý: AGENTS.md lớn hơn ${CODEX_DOC_LIMIT / 1024} KiB — Codex sẽ không nạp hết. Đặt project_doc_max_bytes = 65536 trong ~/.codex/config.toml (đã có sẵn trong mcp/codex-config.example.toml).`
  )
if (check && stale) {
  console.error(`${stale} file cũ — chạy lại không có --check.`)
  process.exit(1)
}
if (!stale) console.log("Không có gì thay đổi.")
