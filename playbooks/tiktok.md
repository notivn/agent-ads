# Playbook TikTok Ads — dùng qua Ads MCP Simple

## Tiền & ngày

- Đơn vị chính của tiền tệ tài khoản (VND số nguyên). Ngày theo múi giờ tài khoản; lịch ad group gửi theo UTC (server lo phần đổi).
- Dữ liệu trễ **30 phút tới ≥ 2 giờ**, reach/frequency trễ ~16 giờ; dữ liệu **hôm qua chỉ chốt sau 12:00 UTC (19:00 giờ VN)** → quy trình buổi sáng dùng **hôm kia** làm ngày chốt gần nhất (D*), hôm qua coi là tạm tính. Server trả cảnh báo dữ liệu chưa chốt → ngày đó không phải ngày trọn vẹn.

## Ngân sách

- Ngân sách **ngày** của ad group đổi qua `ads_update_budget` có hiệu lực **00:00 hôm sau** (giờ tài khoản) — ghi rõ trong báo cáo. Không đổi trong khung **23:55–00:00**.
- Ngân sách trọn đời: hiệu lực ngay. Ngân sách mới phải ≥ 105% số đã chi.
- `BUDGET_MODE_DYNAMIC_DAILY_BUDGET` có thể chi tới **125%/ngày** — server so trần ngày với số tiền × 1,25.
- Smart+: ngân sách hiệu lực ngay, đọc `current_budget`.

## Tạo mới (luôn tắt — `DISABLE`)

- **Chiến dịch Manual qua `tiktok_create_campaign` ngừng hỗ trợ từ 31/12/2026.** Ưu tiên `tiktok_create_smart_plus` (Upgraded Smart+, cần TikTok bật allowlist cho tài khoản — lỗi `feature_not_enabled` → báo người).
- Manual: `tiktok_create_campaign` → `tiktok_create_adgroup` (cặp optimization_goal ↔ billing_event phải hợp lệ, location là ID số) → `tiktok_create_ads` (≤ 20 creative).
- Spark Ads: `identity_id` lấy từ `ads_lookup kind=identities`; bài đăng từ `ads_lookup kind=tiktok_posts`.
- Nội dung quảng cáo ≤ 100 ký tự, **không emoji**, 1 dòng.

## Quảng cáo nhắn tin

- Chiến dịch `LEAD_GENERATION`; ad group `messaging {destination: TIKTOK_DM | MESSENGER | WHATSAPP | ZALO | LINE | IM_URL …}`. Số điện thoại VN: không số 0 đầu, không kèm 84.
- DM cần lời chào: `tiktok_messaging_assets kind=welcome_messages` hoặc tạo bằng `tiktok_create_welcome_message`. Trường nhắn tin **không sửa được** sau khi tạo.

## Sửa

- `ads_update_object` level `ad` với `tiktok_creative` (đổi nội dung / video / ảnh / bài) → TikTok **duyệt lại** quảng cáo — cần người duyệt.
- `tiktok_update_targeting`: thay toàn bộ targeting — cần người duyệt.
- Quảng cáo Upgraded Smart+ / ACO: không sửa qua API, sửa trong TikTok Ads Manager.
- `ads_get_object` level ad/ad_group có `extra.review` (lý do từ chối + gợi ý) — dùng khi quảng cáo bị từ chối.

## GMV Max (TikTok Shop)

- Chỉ **xem**: `tiktok_gmv_max_shops`, `tiktok_gmv_max_campaigns`, `tiktok_gmv_max_report` (ROI gồm cả đơn tự nhiên, trễ ≤ 11 giờ). **Không cộng** với `ads_get_report`.
- Mọi thay đổi GMV Max luôn cần xác nhận 2 bước → **luôn chờ người duyệt**. Giữ mỗi mức ROI mục tiêu ≥ 3 ngày. GMV Max tạo ra **chạy ngay** (ngoại lệ duy nhất).

## Lỗi hay gặp

- 40100 / 40016 / 40133: giới hạn tốc độ → chờ `retry_after_seconds`.
- Hết hạn mức ngày: chờ tới 0h UTC.

## Phân tích & quyết định (TikTok)

- **Đơn vị giữ ngân sách**: chiến dịch khi bật tối ưu ngân sách chiến dịch (ngân sách ở chiến dịch, gồm Smart+ CBO); nếu không → ad group.
- **Giai đoạn học**: MCP không trả trạng thái → luôn "tự suy luận" (~50 chuyển đổi trong 7 ngày sau tạo / sửa lớn). Sửa lớn = đổi nhắm mục tiêu, creative, sự kiện tối ưu, giá thầu, ngân sách lớn.
- **Chất lượng dữ liệu mặc định**: tin nhắn (TikTok DM / ứng dụng nhắn tin) Cao · Lead Form TikTok Cao (số lượng) · sự kiện web chỉ Pixel Trung bình (Events API + khớp đơn → Cao) · đơn chốt qua inbox / Zalo Thấp · TikTok Shop / GMV Max Cao nhưng **tách riêng**, không cộng với `ads_get_report`, không áp quy tắc tự động.
- **Ghi nhận**: dữ liệu trễ 30 phút – vài giờ, reach / frequency ~16 giờ → hôm nay luôn "tạm tính".
- **Tốc độ chi**: ngân sách ngày linh hoạt chi tới 125% / ngày; ngân sách ngày ad group đổi có hiệu lực 00:00 hôm sau → khi tăng TT1, đánh giá lại sau ≥ 3 ngày tính từ ngày hiệu lực.
