# Chất lượng dữ liệu, bối cảnh kinh doanh và độ đủ mẫu

> Phương pháp tham khảo skill `meta-ads-analyzer-mod-by-noti-v2` (noti.vn), mở rộng cho Meta, TikTok, Google Ads, OpenAI Ads.
> Chạy phần này **trước** mọi kết luận. Kết luận không qua được bước này thì chỉ là "Chưa đủ dữ liệu".

## 1. Bối cảnh kinh doanh (lấy từ `muc-tieu-kpi.md`)

| Trường                            | Dùng để                                                                   |
| --------------------------------- | ------------------------------------------------------------------------- |
| `mo_hinh_ban`                     | Biết đơn hàng chốt ở đâu → chất lượng dữ liệu (§2)                        |
| `loai_ket_qua`                    | Chọn đúng chỉ số "Kết quả" để đánh giá                                    |
| `tracking`                        | Pixel / Pixel + CAPI (Events API, Enhanced Conversions) / không           |
| `aov`, `bien_loi_nhuan`           | CPA hòa vốn = AOV × biên lợi nhuận gộp; ROAS hòa vốn = 1 ÷ biên lợi nhuận |
| `ty_le_chot` (+ số đơn làm cơ sở) | Từ kết quả (tin nhắn / khách tiềm năng) ra đơn hàng                       |
| `cpa_muc_tieu`                    | Chi phí tối đa chấp nhận cho **1 đơn hàng**                               |
| `muc_tieu_tren_ket_qua`           | Ghi đè trực tiếp (vd "25.000 ₫ / tin nhắn")                               |

**Mục tiêu trên mỗi kết quả** (dùng cho mọi quy tắc, so cùng đơn vị):

1. Có `muc_tieu_tren_ket_qua` → dùng luôn.
2. Không có → `cpa_muc_tieu` × `ty_le_chot` (kết quả là đơn hàng thì tỷ lệ = 100%).
3. Không có `cpa_muc_tieu` → CPA hòa vốn × `ty_le_chot` (ghi rõ "dựa trên điểm hòa vốn").
4. Không tính được → **không có mục tiêu**: chỉ so sánh tương đối giữa các đơn vị giữ ngân sách cùng loại kết quả, không áp quy tắc tự động, liệt kê câu hỏi cho chủ tài khoản.

**CPA quy đổi** = chi phí trên mỗi kết quả ÷ tỷ lệ chốt — ghi "tự tính — dựa trên tỷ lệ chốt bạn cung cấp".

Không bao giờ bịa số đầu vào. Thiếu thì ghi "chưa biết — cần hỏi chủ tài khoản". Có thể nêu điều kiện hòa vốn ("chiến dịch B chỉ ngang A nếu tỷ lệ chốt của B cao hơn ≥ 35%").

## 2. Đánh giá chất lượng dữ liệu (theo từng loại kết quả)

| Loại kết quả                                                                                      | Mặc định                                                                         | Nâng / hạ                                                                                                                      |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Tin nhắn bắt đầu **đo trên nền tảng** (Meta Messenger / Instagram / WhatsApp, TikTok DM)          | **Cao** — nền tảng đo trực tiếp                                                  | —                                                                                                                              |
| Khách tiềm năng biểu mẫu tức thì (Meta Instant Form, TikTok Lead Form)                            | **Cao** về số lượng; chất lượng lead chưa biết                                   | Hỏi tỷ lệ lead → đơn                                                                                                           |
| Tin nhắn / lượt mở **ứng dụng nhắn tin ngoài** (TikTok → Zalo, LINE, IM_URL, Messenger, WhatsApp) | **Trung bình** — nền tảng không thấy bên trong cuộc trò chuyện                   | Không áp TP1                                                                                                                   |
| Khách tiềm năng trên website                                                                      | **Trung bình** (chỉ Pixel / tag)                                                 | **Cao** khi có CAPI / Events API / Enhanced Conversions + chống trùng; **Thấp** khi có dấu hiệu đỏ                             |
| Lượt mua + giá trị trên website                                                                   | **Trung bình** (chỉ Pixel / tag)                                                 | **Cao** khi có CAPI, giá trị thay đổi hợp lý **và** số đơn khớp hệ thống (chủ tài khoản xác nhận); **Thấp** khi có dấu hiệu đỏ |
| Lượt mua / ROAS khi đơn chốt qua inbox, Zalo, điện thoại, sàn TMĐT                                | **Thấp**                                                                         | Trung bình/Cao chỉ khi đơn được gửi về qua Conversions API (offline / business messaging) và khớp đơn thật                     |
| Đơn TikTok Shop / GMV Max                                                                         | **Cao** (đo trên TikTok Shop)                                                    | Không cộng với báo cáo quảng cáo thường                                                                                        |
| Số do chủ tài khoản báo (đơn, tỷ lệ chốt, doanh thu CRM)                                          | Như được báo                                                                     | Ghi nguồn; báo khi mâu thuẫn                                                                                                   |
| CPM, CPC, CTR, Reach, Frequency                                                                   | **Cao** về đo lường — chỉ là **chỉ số chẩn đoán**, không phải kết quả kinh doanh | —                                                                                                                              |

### 2.1. Loại kết quả → trường dữ liệu (`ads_get_report`)

| Loại          | Meta                                                                                                                                                                       | TikTok                                                  | Google Ads                                                                                                   | OpenAI Ads                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `messages`    | `messages`                                                                                                                                                                 | `messages` (DM + ứng dụng nhắn tin — tách đích, xem §2) | **N/A**                                                                                                      | **N/A**                      |
| `leads`       | `leads` (biểu mẫu tức thì và web gộp — tách bằng `extra.actions` khi cần)                                                                                                  | `leads`                                                 | **N/A** → dùng `conversions`                                                                                 | **N/A** → dùng `conversions` |
| `purchases`   | `purchases`                                                                                                                                                                | `purchases`                                             | **N/A** → dùng `conversions`                                                                                 | **N/A** → dùng `conversions` |
| `conversions` | Kết quả theo sự kiện tối ưu của nhóm — **đối chiếu** với trường đúng loại ở trên; lệch → không tự động (khi thiếu trường `results`, Meta có thể trả `conversions` = 0 giả) | Kết quả theo sự kiện tối ưu                             | Mọi hành động chuyển đổi **chính** gộp lại — tách theo `segments.conversion_action` (GAQL) khi có nhiều loại | Chuyển đổi                   |

- Trường ghi **N/A** là null theo thiết kế (nền tảng không có) → **không bao giờ** coi là 0, không áp quy tắc.
- Trường có trên nền tảng mà trống ở đối tượng có chi > 0 → 0 (theo `quy-tac-phan-tich.md` §2).
- Không có trường cho cuộc gọi: lượt bấm gọi không phải cuộc gọi đã kết nối → không dùng làm loại kết quả.

**Dùng ở cổng quyết định:**

- **Cao** → được làm căn cứ tạm dừng / tăng ngân sách.
- **Trung bình** → chỉ khi có tín hiệu độc lập thứ hai (đối soát đơn thật, chẩn đoán nhất quán); kết luận tối đa "Định hướng"; **không tự động**, chỉ đề xuất.
- **Thấp** → không bao giờ là căn cứ. Riêng quy tắc cắt lỗ CL1/CL3 được dùng ở dạng có điều kiện ("tạm dừng, trừ khi bạn xác nhận có đơn từ chiến dịch này ngoài nền tảng") → luôn chờ duyệt.

**Dấu hiệu đỏ** (hạ loại kết quả đó xuống Thấp, trừ dòng ROAS chỉ áp cho 1 đối tượng):

- Mọi lượt mua cùng một giá trị (vd luôn 500.000 ₫) → giá trị gắn cứng / trung bình.
- Có lượt mua nhưng không có thêm vào giỏ / bắt đầu thanh toán.
- Chi hàng triệu chỉ 1–2 lượt mua trong khi chủ tài khoản báo nhiều đơn.
- **ROAS > 10 với < 5 lượt mua** (1 đối tượng) → ảo do mẫu nhỏ: "Chưa đủ dữ liệu", không bao giờ là căn cứ tăng ngân sách.
- Số lượt mua lệch đơn thật > ~30%; số lead nền tảng cao hơn hẳn lead trong CRM (bắn trùng / spam).
- Dữ liệu bất thường: CPM/CTR giống hệt mọi dòng, kết quả đều tăm tắp, CTR > 20% trên feed, Reach > Impressions.

**Doanh thu ngoài nền tảng**: bán cả Zalo / điện thoại / sàn / cửa hàng → ROAS trên tài khoản quảng cáo **đánh giá thấp** hiệu quả thật. Khuyên dùng **ROAS tổng hợp** = tổng doanh thu (CRM / QLBH / Google Sheet) ÷ tổng chi quảng cáo. Không đoán tỷ lệ doanh thu ngoài nền tảng.

Báo cáo luôn có bảng: `Loại kết quả | Độ tin cậy | Lý do`.

## 3. Độ đủ mẫu (theo từng chỉ số, từng đối tượng)

Cửa sổ mặc định: **14–30 ngày trọn vẹn** gần nhất (không gồm hôm nay); đối tượng trẻ hơn cửa sổ → cả vòng đời. Ghi rõ cửa sổ.

| Chỉ số                        | Định hướng                                       | Chắc chắn                                    |
| ----------------------------- | ------------------------------------------------ | -------------------------------------------- |
| CPM                           | ≥ 1.000 lượt hiển thị                            | ≥ 10.000 lượt hiển thị                       |
| CTR (nhấp vào liên kết)       | ≥ 2.000 lượt hiển thị và ≥ 20 lượt nhấp liên kết | ≥ 100 lượt nhấp liên kết                     |
| CPC (trên lượt nhấp liên kết) | ≥ 30 lượt nhấp liên kết                          | ≥ 100 lượt nhấp liên kết                     |
| Chi phí trên mỗi kết quả      | ≥ 15 kết quả                                     | ≥ 50 kết quả                                 |
| CPA quy đổi                   | ≥ 15 kết quả **và** tỷ lệ chốt dựa trên ≥ 15 đơn | ≥ 50 kết quả và tỷ lệ chốt dựa trên ≥ 50 đơn |
| ROAS lượt mua                 | ≥ 20 lượt mua có giá trị                         | ≥ 50 lượt mua                                |

- Nhãn kết luận: **Chắc chắn / Định hướng / Chưa đủ dữ liệu**. Độ đủ mẫu và chất lượng dữ liệu là hai kiểm tra riêng.
- **Chi thấp**: chi < 5% trung vị chi của các đối tượng cùng cấp, cùng loại kết quả → "không đại diện".
- "Chưa đủ dữ liệu" **không** huỷ quy tắc cắt lỗ CL1, CL3.
- "Thu thập thêm dữ liệu" phải cụ thể: cần thêm bao nhiêu tiền / bao nhiêu ngày, và kết quả nào sẽ dẫn tới hành động nào. Đối tượng không bao giờ đủ mẫu (đối tượng quá hẹp, sai sự kiện tối ưu) → đề xuất đổi cấu trúc.

## 4. Thời gian và ghi nhận chuyển đổi

- Ngày theo **múi giờ tài khoản**. Hôm nay = chưa chốt.
- **Ghi nhận trễ**: chuyển đổi tiếp tục về tới ~7 ngày sau lượt hiển thị (đa số trong 1–3 ngày). 3 ngày gần nhất "đang về thêm" → không dùng để kết luận xu hướng xấu. TikTok trễ thêm vài giờ, Google 1–3 giờ (chuyển đổi tính theo ngày nhấp có thể về muộn hơn).
- Dữ liệu kết thúc > 7 ngày trước hôm nay → báo "dữ liệu cũ".
- Meta đã bỏ cửa sổ 7 ngày xem / 28 ngày xem khỏi Insights API từ 12/01/2026 — so sánh với kỳ cũ dùng cửa sổ đó là không hợp lệ.
- Đổi cài đặt ghi nhận giữa hai kỳ → không so sánh.
- **Tin nhắn bắt đầu** (Meta) chỉ tính cuộc trò chuyện mới sau ≥ 7 ngày im lặng — khách cũ nhắn lại không được đếm.
