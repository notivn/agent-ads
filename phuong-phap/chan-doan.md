# Chẩn đoán: 0 kết quả, mỏi creative, phân phối, giá thầu, chồng lấn, biến động

> Phương pháp tham khảo skill `meta-ads-analyzer-mod-by-noti-v2` (noti.vn), mở rộng cho 4 nền tảng.
> Chẩn đoán trả lời "vì sao". Kết quả chẩn đoán là **đề xuất** (cần duyệt), trừ khi trùng một quy tắc tự động trong `nguong-an-toan.md`.

## 1. Chi tiền mà 0 (hoặc gần 0) kết quả — kiểm tra theo thứ tự, dừng ở nguyên nhân đầu tiên được xác nhận

1. **Có thật là 0? (đo lường)** — so với cái chủ tài khoản thấy (hộp thư Business Suite / TikTok, form / CRM, Zalo). Thấy tin nhắn / lead / đơn mà nền tảng không đếm → lỗi đo lường hoặc đích đến, không phải lỗi quảng cáo. Sự kiện tối ưu có đúng thứ chủ tài khoản muốn không (vd tối ưu "Xem trang đích" trong khi tưởng là lead)? Pixel / tag còn bắn ở trang cảm ơn không (đổi web, đổi tên miền, banner cookie)?
2. **Có phân phối không?** — quảng cáo bị từ chối, hạn chế, đang duyệt, lỗi thanh toán (làm đẹp, sức khoẻ, tài chính, ảnh trước/sau hay bị từ chối). Lượt hiển thị gần 0 → đối tượng quá hẹp, giá thầu / mục tiêu chi phí quá thấp, lịch chạy sai. Tạm dừng quảng cáo không phân phối không tiết kiệm được gì → báo nguyên nhân.
3. **Người xem có bước đầu không? (quảng cáo → nhấp)** — CTR liên kết rất thấp → creative / ưu đãi / đối tượng không khớp. CPM rất cao → đối tượng hẹp hoặc mức liên quan thấp.
4. **Đích đến có chuyển đổi không? (nhấp → kết quả)** — tin nhắn: đúng Trang / tài khoản, mẫu câu hỏi gợi ý, trả lời tự động không chặn, nút không đẩy sang Zalo / web (kết quả nằm ngoài nền tảng); form: đã xuất bản, không quá dài; web: tải nhanh trên di động, form / thanh toán chạy, giá khớp quảng cáo. **Nhiều nhấp liên kết mà 0 kết quả = lỗi đích đến, không phải lỗi creative.**
5. **Cấu trúc** — ngân sách ngày thấp hơn hẳn chi phí 1 kết quả; Học có giới hạn; sự kiện tối ưu quá hiếm so với ngân sách.

Chỉ đề xuất chạy lại sau khi đã tìm và sửa nguyên nhân; kèm điều kiện dừng theo CL1.

## 2. Mỏi creative / bão hoà đối tượng

Đánh giá **theo từng quảng cáo, theo tuần**: `ads_get_report` level `ad`, `granularity: "total"` cho **từng khoảng 7 ngày** (không có granularity tuần; không cộng / trung bình Frequency theo ngày). Mốc: tuần đầy đủ đầu tiên của quảng cáo trong cửa sổ.

Nghi mỏi khi **nhiều** tín hiệu cùng đi ≥ 2 tuần:

| Tín hiệu                               | Mẫu                                     |
| -------------------------------------- | --------------------------------------- |
| Frequency (tuần, theo quảng cáo)       | Tăng dần                                |
| CTR liên kết                           | Giảm ≥ 20% so tuần mốc                  |
| CPM                                    | Tăng khi đối tượng & giá thầu không đổi |
| Chi phí / kết quả                      | Tăng cùng nhịp CTR giảm                 |
| Xếp hạng chất lượng / tương tác (Meta) | Tụt một bậc                             |

Ngưỡng Frequency tuần tham khảo: đối tượng rộng ~2,5–3; retarget / tệp nhỏ ~5–8; doanh nghiệp địa phương / thị trường nhỏ bão hoà sớm hơn (Reach tuần ngừng tăng).

**Không phải mỏi** (loại trừ trước): mùa vụ / ngày sale làm CPM tăng chung; tăng ngân sách làm chi phí biên tăng; ngày gần đây đang về thêm chuyển đổi; nhóm vừa học lại sau khi sửa.

Đề xuất (giả thuyết có kiểm chứng): hook mới 3 giây đầu, góc mới cho cùng ưu đãi, đổi định dạng (video ↔ ảnh ↔ carousel) — nói rõ đổi gì dựa trên dữ liệu (vd "lượt xem 3 giây cao nhưng ThruPlay thấp → hook giữ được nhưng thân video mất người xem"). Thêm 1–2 quảng cáo mới vào **nhóm hiện có** trong một lần sửa (giữ lịch sử, ngân sách, đối tượng; nhóm mới phải học từ đầu và có thể chồng lấn). Reach chững → mở rộng đối tượng. Loại trừ người đã tương tác / đã mua khỏi tệp tìm khách mới.

## 3. Phân phối & tốc độ chi (pacing)

- Chi theo ngày dao động **có chủ đích**: ngày đấu giá đắt chi ít, ngày rẻ chi nhiều. Đánh giá theo kỳ ≥ 7 ngày, không theo 1 ngày.
- Meta: một ngày có thể chi tới **+75%** ngân sách ngày, nhưng cả tuần (CN–T7) không quá **7 × ngân sách ngày**.
- Google: một ngày có thể chi tới ~**2×** ngân sách ngày, trung bình tháng ≤ 30,4 × ngân sách ngày.
- TikTok ngân sách ngày linh hoạt: tới 125%/ngày.
- "Hôm qua chi ít" → thường do pacing, mục tiêu chi phí / giá thầu khó đạt, chồng lấn đấu giá, hoặc lỗi phân phối (bị từ chối, thanh toán) — kiểm tra theo thứ tự đó.

## 4. Chiến lược giá thầu

| Loại                                                                       | Đọc dữ liệu                                                                                                                                                                                                       |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Theo chi tiêu (chi phí thấp nhất / giá trị cao nhất, Maximize conversions) | Chi hết ngân sách; tăng ngân sách → chi phí / kết quả thường tăng (bình thường)                                                                                                                                   |
| Theo mục tiêu (cost cap, mục tiêu CPA, mục tiêu ROAS / tROAS)              | Chi không hết là bình thường khi mục tiêu khó; chi chưa hết mà chi phí đạt mục tiêu = đang chạy đúng → đòn bẩy là nới mục tiêu, không phải lỗi phân phối. Mục tiêu ROAS chỉ có nghĩa khi dữ liệu lượt mua **Cao** |
| Thủ công (bid cap, CPC thủ công)                                           | Phân phối thấp / thất thường khi giá thầu thấp hơn đấu giá cần                                                                                                                                                    |

Không so chi phí / kết quả giữa các nhóm khác chiến lược giá thầu mà không nói rõ.

## 5. Chồng lấn đấu giá (quảng cáo của mình tự cạnh tranh nhau)

Tín hiệu: nhiều nhóm nhắm / creative / tên giống nhau, cùng chi không hết; nhiều nhóm cùng Học có giới hạn; Frequency tăng trên các nhóm cùng tệp; tổng Reach các dòng lớn hơn nhiều Reach đã khử trùng.
Cách xử lý (theo thứ tự): **gộp** nhóm trùng (hoặc gom vào một chiến dịch CBO) → **tách biệt** tệp (loại trừ lẫn nhau, loại khách cũ khỏi tìm khách mới) → **tắt bớt một nhóm** (chỉ nhóm có ngân sách riêng, chọn nhóm có chi phí / kết quả sau học ≥ 7 ngày ở mức ≥ Định hướng tệ hơn rõ; dạng thử nghiệm: thành công = chi phí nhóm còn lại 7 ngày sau ≤ chi phí gộp hiện tại). Trong CBO không tắt nhóm vì chi phí — gộp, tách, hoặc A/B test.

## 6. Biến động bình thường vs đáng lo

Bình thường (đối tượng ≥ ~10 kết quả/ngày; ít hơn thì so trung bình trượt 7 ngày): chi phí / kết quả dao động ±20–30% theo ngày, khác nhau ngày thường / cuối tuần, thay đổi từ từ qua nhiều tuần.
Đáng lo: chi phí / kết quả trượt 7 ngày tăng > ~50% và giữ nguyên; phân phối gần 0 mà không đổi ngân sách / lịch; chi tăng trong khi kết quả giảm; CTR giảm tuần qua tuần trong khi Frequency tăng.
So sánh cùng cơ cấu ngày trong tuần, cùng cài đặt ghi nhận, không có sửa lớn trong cửa sổ.

## 7. Chẩn đoán mức liên quan (Meta — quảng cáo ≥ 500 lượt hiển thị)

`quality_ranking`, `engagement_rate_ranking`, `conversion_rate_ranking` (trong `extra` của `ads_get_report` level `ad` nếu có): Trên trung bình · Trung bình · Dưới trung bình (35% / 20% / 10% thấp nhất).

| Mẫu                                                                                                          | Nguyên nhân thường gặp                                                    | Sửa ở                              |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- | ---------------------------------- |
| Chất lượng thấp                                                                                              | Creative bị coi là kém / giật tít, phản hồi xấu, trải nghiệm sau nhấp kém | Creative, trang đích               |
| Tương tác thấp                                                                                               | Creative không hấp dẫn tệp này                                            | Hook, hình, định dạng, độ khớp tệp |
| Chuyển đổi thấp (tracking tin cậy)                                                                           | Ưu đãi / trang đích không chuyển đổi                                      | Ưu đãi, giá, trang đích, form      |
| Tương tác cao, chuyển đổi thấp                                                                               | Quảng cáo hứa điều trang / ưu đãi không đáp ứng                           | Khớp thông điệp với ưu đãi         |
| Cả ba thấp                                                                                                   | Sai tệp cho creative này                                                  | Chiến lược tệp / creative          |
| Xếp hạng chuyển đổi chỉ tin được khi dữ liệu sự kiện tối ưu ≥ Trung bình. Thiếu xếp hạng không chặn đề xuất. |
