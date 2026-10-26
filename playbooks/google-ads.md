# Playbook Google Ads (gồm YouTube) — dùng qua Ads MCP Simple

## Tiền & ngày

- Đơn vị chính (server tự đổi sang micros). `account_id` 10 số, có/không gạch (`123-456-7890`).
- Dữ liệu trễ 1–3 giờ. Google có thể chi tới ~**2× ngân sách ngày** trong một ngày (trung bình tháng ≤ 30,4 × ngân sách ngày) — đừng tự tắt chỉ vì chi hôm nay vượt ngân sách.

## Loại chiến dịch

| Loại                                  | Xem                  | Bật/tắt, ngân sách                                              | Tạo mới                                 |
| ------------------------------------- | -------------------- | --------------------------------------------------------------- | --------------------------------------- |
| SEARCH                                | ✔ (cả cấp `keyword`) | ✔                                                               | `google_ads_create_search_campaign`     |
| DEMAND_GEN (YouTube, Discover, Gmail) | ✔                    | ✔ (tối thiểu 5 USD/ngày)                                        | `google_ads_create_demand_gen_campaign` |
| PERFORMANCE_MAX                       | ✔                    | ✔ status / budget                                               | —                                       |
| VIDEO (YouTube)                       | ✔                    | ✘ **chỉ đọc qua API** → chỉ đề xuất, người sửa trong Google Ads | ✘                                       |

- Lọc YouTube: `filters.channel_types: ["youtube"]` (= VIDEO + DEMAND_GEN). Lát YouTube của PMax: `filters.ad_network_types: ["YOUTUBE"]`.

## Tạo mới (luôn PAUSED)

- Search: không còn nhắm ngôn ngữ thủ công (Google bỏ từ 30/09/2026). Thêm quảng cáo `google_ads_create_rsa`, từ khoá / từ khoá phủ định `google_ads_add_keywords`.
- Chiến dịch thiếu khai báo quảng cáo chính trị EU → `google_ads_declare_eu_political`.
- Asset (sitelink, chú thích, cuộc gọi…): `google_ads_create_assets` tạo vào thư viện; **gắn** bằng `google_ads_link_assets` → luôn xác nhận → chờ người duyệt.
- Video YouTube cho quảng cáo: `ads_upload_media type=video` chỉ nhận link/ID YouTube.

## Đọc số & tối ưu

- Từ khoá: `ads_get_report level=keyword`; truy vấn tìm kiếm / chỉ số đặc thù: `google_ads_run_gaql` (chỉ SELECT).
- Quan sát gợi ý (không tự làm): từ khoá chi nhiều 0 chuyển đổi → đề xuất phủ định; điểm chất lượng thấp; chiến dịch "giới hạn bởi ngân sách" có ROAS tốt → đề xuất tăng.
- Targeting vị trí: xem `google_ads_get_campaign_targeting`; sửa `google_ads_update_campaign_targeting` luôn xác nhận → chờ người duyệt.
- Chiến lược giá thầu tự động (tCPA / tROAS) cần thời gian học ~1–2 tuần sau thay đổi lớn.

## Phân tích & quyết định (Google Ads)

- **Đơn vị giữ ngân sách**: **chiến dịch** (hoặc ngân sách dùng chung của nhiều chiến dịch). Nhóm quảng cáo, từ khoá, quảng cáo, tài sản PMax là phần của ngân sách.
- Quy tắc: CL2 / CL3 (tạm dừng chiến dịch) luôn **chờ duyệt**; CL1 ở từ khoá → chờ duyệt (đề xuất tạm dừng / thêm từ khoá phủ định qua `google_ads_add_keywords`). **TT1** tự động chỉ khi: chiến dịch chạy ≥ 14 ngày (`start_date_time`), đọc được lịch sử thay đổi 14 ngày bằng `google_ads_run_gaql` trên `change_event` (lọc `change_event.change_date_time` trong 14 ngày, tài nguyên `CAMPAIGN_BUDGET` / `CAMPAIGN`) và không có đổi ngân sách / chiến lược giá thầu, ngân sách **không** dùng chung (`campaign_budget.explicitly_shared = false`). Không đọc được → chờ duyệt.
- `conversions` gộp mọi hành động chuyển đổi **chính** (mua, form, gọi…): nhiều loại → tách bằng GAQL `segments.conversion_action`; không tách được → dữ liệu Trung bình (không tự động).
- **Giai đoạn học**: chiến lược giá thầu tự động học ~7 ngày sau tạo / đổi lớn (tCPA / tROAS tới 1–2 tuần) → "tự suy luận" theo ngày tạo / đổi.
- **Chất lượng dữ liệu mặc định**: chuyển đổi web bằng thẻ Google Trung bình · Enhanced Conversions / nhập chuyển đổi offline khớp đơn → Cao · cuộc gọi từ quảng cáo Cao · đơn chốt qua điện thoại / Zalo không nhập về → Thấp.
- **Ghi nhận**: chuyển đổi tính theo ngày nhấp và có thể về muộn nhiều ngày → 3 ngày gần nhất luôn thiếu.
- **Tốc độ chi**: 1 ngày tới ~2 × ngân sách ngày; tháng ≤ 30,4 × ngân sách ngày.
