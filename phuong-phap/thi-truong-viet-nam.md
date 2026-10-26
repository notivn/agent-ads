# Bối cảnh doanh nghiệp Việt Nam

> Phương pháp tham khảo skill `meta-ads-analyzer-mod-by-noti-v2` (noti.vn), mở rộng cho 4 nền tảng.

## 1. Đơn hàng thường chốt ở đâu

Các luồng phổ biến:

1. Quảng cáo → **Messenger / TikTok DM** → chat xác nhận → chuyển **Zalo** → chốt → chuyển khoản hoặc COD.
2. Quảng cáo → landing page → **form** → sale gọi điện → chốt qua điện thoại / Zalo.
3. Quảng cáo → **biểu mẫu tức thì** (Meta / TikTok) → sale gọi → chốt ngoài nền tảng.
4. Thấy quảng cáo → sau đó tự tìm trên **Shopee / Lazada / TikTok Shop** → mua ở sàn.
5. Quảng cáo hiện **số điện thoại** → khách gọi thẳng.
6. Quảng cáo → **Zalo OA** → chat → chốt.

Trong tất cả các luồng trên, **đơn mua thật nằm ngoài đo lường của nền tảng**: tài khoản quảng cáo không có sự kiện Mua hoặc có nhưng sai. Doanh nghiệp VN thường ghi đơn ở Google Sheet / Excel, phần mềm QLBH (KiotViet, Sapo, Haravan, Pancake, Nhanh.vn…), CRM, hoặc gắn thẻ hội thoại trong công cụ inbox. Hiệu quả thật nằm ở đó: **ROAS tổng hợp = tổng doanh thu ÷ tổng chi quảng cáo**; tốt hơn nữa là theo từng chiến dịch (gắn UTM / tên chiến dịch vào đơn).

## 2. Chỉ số nào dùng để làm gì

| Tầng                             | Chỉ số                                                                                                                                                 | Dùng                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đo tin cậy — **chẩn đoán**       | CPM, CPC, CTR, nhấp liên kết, Reach, Frequency, xếp hạng chất lượng / tương tác                                                                        | Giải thích _vì sao_ chi phí đổi (áp lực đấu giá, sức mạnh creative, bão hoà). **Không bao giờ** là căn cứ duy nhất để tăng / tắt: CTR cao có thể là giật tít không ai mua |
| **Quyết định** ở VN              | Chi phí / tin nhắn, chi phí / lead (dữ liệu Cao), CPA quy đổi (÷ tỷ lệ chốt), đơn & doanh thu theo chiến dịch do chủ tài khoản báo, đơn sàn so với chi | Tăng / tắt, so với CPA hòa vốn. Không có tỷ lệ chốt → chỉ so tương đối giữa các đơn vị giữ ngân sách và nói rõ chưa đánh giá được lãi lỗ                                  |
| Chỉ khi dữ liệu lượt mua **Cao** | ROAS lượt mua, chi phí / lượt mua, giá trị lượt mua                                                                                                    | Quyết định chỉ khi tracking đã kiểm chứng                                                                                                                                 |

## 3. Bẫy ROAS — lỗi gây hại nhất

- Chi rất ít, có 1–2 lượt mua → ROAS khổng lồ: **ảo do mẫu nhỏ**, không phải "con gà đẻ trứng vàng".
- Chiến dịch tin nhắn chi lớn, ROAS "—" hoặc 0 → có thể đang tạo hàng trăm cuộc trò chuyện chốt trên Zalo.
- **Tăng cái thứ nhất và tắt cái thứ hai = cắt nguồn doanh thu chính của doanh nghiệp.** Bộ agent tồn tại để chặn đúng lỗi này.

## 4. Landing page lệch giá trị

Landing page có 3 combo giá khác nhau, form bắn sự kiện với một giá trị cố định / trung bình, sale xác nhận qua điện thoại → doanh thu thật khác giá trị đo. Dấu hiệu: mọi lượt mua cùng giá trị → giá trị lượt mua và ROAS: **Thấp**.

## 5. Conversions API ở VN

Nhiều SME chưa cài CAPI / Events API (agency hay bỏ qua vì khách bán qua inbox). Người bán inbox vẫn có thể gửi sự kiện qua **Conversions API cho nhắn tin doanh nghiệp** (đánh dấu mua / lead trong hội thoại Messenger / Instagram / WhatsApp) hoặc gửi sự kiện mua offline từ CRM / QLBH. Có làm và số khớp đơn thật → nâng độ tin cậy lượt mua.

## 6. Mùa vụ & ngày cao điểm (CPM thường tăng)

| Thời điểm                                                                                                                    | Ghi chú                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tết Nguyên Đán**: ~3 tuần trước Tết → mùng 6 (ngày dương lịch ghi trong `muc-tieu-kpi.md`; mùng 1: 06/02/2027, 26/01/2028) | CPM tăng mạnh trước Tết; sau mùng 1 nhu cầu nhiều ngành chững; nhiều doanh nghiệp nghỉ chốt đơn (tin nhắn không được trả lời → "kết quả" vẫn có nhưng không ra đơn) |
| Ngày đôi **9.9, 10.10, 11.11, 12.12** (±2 ngày)                                                                              | Sàn TMĐT đẩy mạnh → CPM tăng, khách bị kéo về sàn                                                                                                                   |
| Ngày đôi hằng tháng **1.1 … 8.8**, sale **giữa tháng (15)** và **ngày lương (25)** của Shopee / Lazada / TikTok Shop         | Mức nhẹ hơn ngày đôi lớn; quan trọng với người bán có kênh sàn                                                                                                      |
| **Black Friday** (thứ Sáu cuối tháng 11), **14/2, 8/3, 20/10, 20/11**                                                        | Ngành quà tặng, mỹ phẩm, hoa, giáo dục cạnh tranh mạnh                                                                                                              |
| **Ngày lương** (cuối tháng → đầu tháng; một số nơi 15)                                                                       | Chuyển đổi thường tốt hơn, không phải chi phí                                                                                                                       |
| Mùa tựu trường (tháng 8–9), Trung thu, mùa cưới (tháng 9 – tháng 1 âm lịch)                                                  | Theo ngành                                                                                                                                                          |

Trong cửa sổ cao điểm: so sánh với cùng kỳ năm trước hoặc ghi chú mùa vụ; quy tắc **CL2** (đắt kéo dài) và **TT1** (tăng tốc) chuyển sang **chờ duyệt** (`nguong-an-toan.md`). Chủ tài khoản bổ sung ngày khuyến mãi riêng trong `muc-tieu-kpi.md`.

## 7. Lỗi hay gặp cần tránh

1. Đề xuất tắt vì ROAS = 0 mà không kiểm tra tin nhắn, Zalo, điện thoại.
2. Đề xuất tăng vì ROAS > 10 mà không xem cỡ mẫu (thường 1–2 lượt mua).
3. Lấy CTR / CPC làm bằng chứng duy nhất "chiến dịch hiệu quả".
4. Bỏ qua chiến dịch trùng lặp — gom lại so sánh, kiểm tra chồng lấn.
5. Lời khuyên chung chung ("A/B test creative") thay vì nói test gì, vì sao, đo thế nào.
6. Mặc định khách thanh toán online — luôn xác nhận mô hình bán trước.
7. Chuyển nhiều ngân sách vào cuối ngày khi đội sale đã nghỉ: tin nhắn tới ngoài giờ trả lời chốt kém — kiểm tra khung giờ trực inbox của doanh nghiệp (ghi trong `muc-tieu-kpi.md`).
