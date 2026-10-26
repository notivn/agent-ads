# Playbook OpenAI Ads (quảng cáo trong ChatGPT) — dùng qua Ads MCP Simple

## Bối cảnh

- Quảng cáo hiện cho người dùng ChatGPT Free / Go; mở cho Việt Nam từ 23/09/2026. Định dạng chính: **chat card** (tiêu đề + mô tả + ảnh + link).
- Mỗi kết nối = 1 tài khoản. Tiền: đơn vị chính (server đổi micros). Kênh mới → dữ liệu ít, cần thận trọng với quy tắc tự động: nên để `tu_dong: khong` cho tới khi có ≥ 2 tuần dữ liệu.

## Cấu trúc

- Campaign (ngân sách ở **cấp campaign**, `bidding_type` không đổi được sau khi tạo) → Ad group (`context_hints` = ngữ cảnh hội thoại muốn xuất hiện, `bidding_config`) → Ad (`chat_card`).
- Đổi ngân sách: `ads_update_budget` ở cấp **campaign**.

## Tạo mới (luôn tạm dừng)

1. Ảnh: `ads_upload_media` (JPEG/PNG/WebP ≤ 20 MB, nên ≥ 640×640) → `file_id`. Không hỗ trợ video.
2. `openai_ads_create_campaign` → `openai_ads_create_ad_group` (context_hints rõ, sát nhu cầu: "so sánh máy lọc nước cho gia đình", không chung chung) → `openai_ads_create_ad` (`chat_card`: title 3–50 ký tự, body ≤ 100 ký tự, cần `file_id`).
3. Sửa context_hints / bidding: `openai_ads_update_ad_group` — đối tượng đang chạy thì cần người duyệt.

## Đọc số

- `ads_get_report` (conversions, conversion_value, roas từ `order_created_*`).
- Chuyển đổi chi tiết: `openai_ads_get_conversions`. Cửa sổ ghi nhận mặc định 30 ngày (thay đổi 30/09/2026) — số chuyển đổi những ngày gần có thể còn tăng.
- Có giới hạn chi tiêu ngày ở cấp tài khoản (đặt trong OpenAI Ads) — nếu chiến dịch ngừng chi đột ngột, kiểm tra giới hạn này trước.

## Phân tích & quyết định (OpenAI Ads)

- **Đơn vị giữ ngân sách**: **chiến dịch**. Ad group, quảng cáo là phần của ngân sách.
- **Giai đoạn học**: không có trạng thái → "chưa rõ" → hạ độ tin cậy một bậc.
- **Chất lượng dữ liệu mặc định**: chuyển đổi Trung bình (kênh mới, pixel / CAPI chưa đối soát). **Không quy tắc nào tự động** cho tới khi `doi_soat_don: co` và ≥ 14 ngày dữ liệu; sau đó chỉ CL1 (luật ở `nguong-an-toan.md` §4 "Giới hạn theo nền tảng").
- **Ghi nhận**: cửa sổ mặc định 30 ngày (từ 30/09/2026) → số chuyển đổi các ngày gần còn tăng nhiều; so sánh kỳ trước 30/09/2026 không cùng cài đặt.
