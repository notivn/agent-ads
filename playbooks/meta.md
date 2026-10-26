# Playbook Meta (Facebook / Instagram) — dùng qua Ads MCP Simple

## Tiền & ngày

- Tool nhận/trả **đơn vị chính** (VND: số nguyên, vd `500000`). Server tự quy đổi sang đơn vị của Meta — không tự nhân/chia.
- Ngày theo múi giờ tài khoản quảng cáo. Chỉ số **Trang** (không phải quảng cáo) theo giờ Los Angeles.

## Cấu trúc & ngân sách

- Campaign (mục tiêu `OUTCOME_*`) → Ad set (nhắm mục tiêu, tối ưu, ngân sách nếu ABO) → Ad (creative).
- **CBO** = chiến dịch **có** `daily_budget` / `lifetime_budget` (`ads_get_object` cấp campaign → `extra.budgetMode = CBO`): đổi ngân sách ở **campaign**. **ABO** = chiến dịch không có ngân sách (bắt buộc khai `is_adset_budget_sharing_enabled` từ API v24; bật → các nhóm chia sẻ một phần ngân sách cho nhau): đổi ở **ad set**.
- Giai đoạn học: ad set cần ~50 sự kiện tối ưu / 7 ngày. Thay đổi lớn (ngân sách > 20%, targeting, creative, giá thầu) có thể **đưa về giai đoạn học** → tránh sửa liên tục; mỗi đối tượng tối đa 1 lần đổi ngân sách / 72 giờ (`nguong-an-toan.md`).
- Ngân sách trọn đời: server kiểm tra trần theo lịch của các ad set khi **bật** — đặt `end_time` rõ ràng.

## Tạo mới (luôn tạm dừng)

1. `ads_list_accounts` → `ads_lookup kind=pages` (Trang chạy quảng cáo phải nằm trong danh sách này), `pixels`, `conversion_events`, `custom_audiences`, `locations`, `interests`.
2. `meta_create_campaign` (objective, CBO/ABO, `special_ad_categories` nếu nhà đất / việc làm / tín dụng / chính trị).
3. `meta_create_adset`: server tự chọn optimization_goal theo objective; luôn có `advantage_audience`. Vị trí: `facebook_positions` / `instagram_positions` theo enum mới (video_feeds, explore, explore_home đã bị bỏ).
4. `meta_create_ad`: creative `link` / `video` / `carousel` / bài có sẵn (`object_story_id` — giữ được tương tác cũ). Ảnh: `image_hash` (đã tải bằng `ads_upload_media`) > `image_url` > `image_drive_file`. Video không có ảnh bìa → Meta tự chọn khi video đã xử lý xong.
5. Báo lại id; người bật bằng `ads_set_status active` (chỉ khi người duyệt).

## Quảng cáo nhắn tin

- Campaign `OUTCOME_SALES` + ad set `CONVERSATIONS` (Messenger / WhatsApp / Instagram Direct, cần `page_id`) hoặc `MESSAGING_PURCHASE_CONVERSION` (chỉ Messenger, cần Trang đã gửi sự kiện mua qua Messenger — Meta từ chối thì dùng CONVERSATIONS).
- `meta_create_ad` trong nhóm đó tự dùng nút nhắn tin; `welcome_message` = lời chào (≤ 300 ký tự hoặc có tối đa 4 câu hỏi gợi ý).
- Đổi lời chào / creative của quảng cáo đang có (giữ id, số liệu): `meta_update_ad_creative` — **cần người duyệt** (quảng cáo sẽ bị duyệt lại, có thể vào lại giai đoạn học, đổi bài sẽ mất tương tác cũ).

## Đọc số

- Chỉ số chuẩn: `spend, impressions, reach, frequency, clicks, link_clicks, ctr, cpc, cpm, conversions, conversion_value, cpa, roas, purchases, leads, messages, video_views`. Chỉ số riêng ở `extra` (map `actions`, `action_values`, `cost_per_action_type`).
- Mỏi creative: chỉ kết luận theo `phuong-phap/chan-doan.md` §2 (nhiều tín hiệu cùng đi ≥ 2 tuần; ngưỡng Frequency tuần ~2,5–3 với tệp rộng, ~5–8 với retarget) → đề xuất làm mới.
- `ads_list_objects` không liệt kê được đối tượng đã xoá; dùng `ads_get_report` khi cần số của chúng.

## Lỗi hay gặp

- Lỗi **31** (`action_required`): Meta nghi truy cập lạ, chặn tạo/sửa tới khi chủ tài khoản xác thực trong Trình quản lý quảng cáo → báo khẩn, dừng ghi trên tài khoản đó (quảng cáo đang chạy vẫn chạy).
- **368**: Meta nghi spam → dừng mọi lệnh ghi trên tài khoản, báo người.
- Lỗi quyền Trang (#10 / #200): Trang chưa cấp quyền đọc → báo người.

## Phân tích & quyết định (Meta)

- **Đơn vị giữ ngân sách**: luôn đọc `ads_get_object` cấp campaign (`ads_list_objects` không trả cờ chia sẻ ngân sách). Có ngân sách (CBO) → chiến dịch; không có → nhóm quảng cáo. ABO bật `is_adset_budget_sharing_enabled` → nhóm là nơi đổi ngân sách (TT1 được) nhưng CL2 / CL3 chỉ chờ duyệt.
- **Kết quả** (`conversions` của `ads_get_report`) = kết quả theo `optimization_goal` của nhóm. Đối chiếu: `CONVERSATIONS` → `messages` · `LEAD_GENERATION` (biểu mẫu tức thì) → `leads` (trên Facebook) · `OFFSITE_CONVERSIONS` + LEAD → lead website · `OFFSITE_CONVERSIONS` + PURCHASE → `purchases` website · `LINK_CLICKS` → `link_clicks` · `LANDING_PAGE_VIEWS` → `extra.actions.landing_page_view` · `THRUPLAY` / `REACH` → trường tương ứng. Không rõ → nêu các loại hành động thấy được và loại đã chọn. Kết quả của chiến dịch / tài khoản trộn nhiều sự kiện tối ưu → chỉ đánh giá theo nhóm.
- **Giai đoạn học**: `ads_get_object` level `ad_group` → `learning_stage_info.status` (`LEARNING` / `SUCCESS` / `FAIL` = Học có giới hạn), `last_sig_edit_ts` = mốc tính "chi kể từ khi chạy". Ngưỡng ~50 sự kiện tối ưu / 7 ngày sau sửa lớn (Meta đang thử ngưỡng thấp hơn ở một số tài khoản — trạng thái đọc được luôn thắng); quảng cáo Shops: 17 lượt mua web + 5 lượt mua trên Meta.
- **Chất lượng dữ liệu mặc định**: tin nhắn Cao · biểu mẫu tức thì Cao (số lượng) · lead / mua website chỉ Pixel Trung bình (CAPI + chống trùng + khớp đơn → Cao) · lượt mua khi chốt qua inbox / Zalo Thấp.
- **Ghi nhận**: theo cài đặt từng nhóm (mặc định 7 ngày nhấp + 1 ngày xem; `ads_get_report` khớp Trình quản lý quảng cáo). Meta bỏ 7 ngày xem / 28 ngày xem khỏi Insights API từ 12/01/2026.
- **Tốc độ chi**: 1 ngày có thể chi tới +75% ngân sách ngày, cả tuần (CN–T7) ≤ 7 × ngân sách ngày → chi vượt trong 1 ngày là bình thường.
- **Tin nhắn bắt đầu** chỉ đếm cuộc trò chuyện mới sau ≥ 7 ngày im lặng.
- **Cách viết**: người được tiếp cận là "tài khoản trong Trung tâm tài khoản" (lần đầu), sau đó "tài khoản" — không viết "người".
- **Xếp hạng mức liên quan** (chất lượng / tương tác / chuyển đổi): chỉ cấp quảng cáo, ≥ 500 lượt hiển thị (trong `extra` khi `metrics: "all"`).
