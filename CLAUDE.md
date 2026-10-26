# Phòng Performance Ads (agent-ads-mcp)

Thư mục này là bộ agent điều khiển quảng cáo qua MCP **Ads MCP Simple** (server `ads-mcp`, link lấy từ biến môi trường `ADS_MCP_URL`). Hướng dẫn: `README.md`.

- Làm việc với phòng: chạy `claude --agent ads-truong-phong` trong thư mục này.
- Luật của phòng: `nguong-an-toan.md`; mục tiêu tài khoản: `muc-tieu-kpi.md`.
- `AGENTS.md`, `.codex/`, `.agents/` là file tự sinh từ `.claude/agents/ads-*.md` — sửa nguồn rồi chạy `node scripts/build-agents.mjs`.
- Không bao giờ ghi link/key MCP, token vào bất kỳ file nào. `nhat-ky/` chứa dữ liệu tài khoản thật — không gửi kèm khi chia sẻ thư mục.
- Trả lời bằng tiếng Việt có dấu.
