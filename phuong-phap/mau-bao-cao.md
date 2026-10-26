# Mẫu báo cáo, tên chỉ số và cách viết

> Phương pháp tham khảo skill `meta-ads-analyzer-mod-by-noti-v2` (noti.vn).

## 1. Cấu trúc báo cáo phân tích (đầy đủ)

Mục nào không có dữ liệu → 1 dòng nói vì sao.

0. **Trả lời ngắn** — quyết định trực tiếp cho câu hỏi, 1–4 dòng hoặc bảng nhỏ.
1. **Phạm vi** — tài khoản, cấp, khoảng ngày (trọn vẹn / chưa chốt / cũ, múi giờ), ghi nhận chuyển đổi, tiền tệ, nguồn (Ads MCP Simple).
2. **Chất lượng dữ liệu** — bảng `Loại kết quả | Độ tin cậy | Lý do` + giả định + độ đủ mẫu và trạng thái học từng đối tượng quyết định.
3. **Tổng quan** — bảng KPI so kỳ trước tương đương (hoặc tuần 1 vs tuần 2 trong cửa sổ, hoặc "không có").
4. **Phát hiện chính** (tối đa 5) — bằng chứng → cơ chế → độ tin cậy (Chắc chắn / Định hướng / Chưa đủ dữ liệu).
5. **Đề xuất** — hành động · đối tượng (tên + id) · lý do · **kiểm tra cổng** (a)(b)(c)(d)(e) · thiết kế kiểm chứng (thời gian, chỉ số thành công, điều kiện dừng) · phân loại (tự động / chờ duyệt).
6. **Thiếu dữ liệu / câu hỏi cho chủ tài khoản** — chỉ câu liên quan: đơn chốt ở đâu (tỷ lệ %), CPA mục tiêu hoặc AOV + biên lợi nhuận, tỷ lệ chốt, tracking, thay đổi lớn trong kỳ (creative, ngân sách, landing page, khuyến mãi, hết hàng).

## 2. Đề xuất tốt trông như thế nào

- Cụ thể cho tài khoản này (sản phẩm, ưu đãi, tệp, creative). Không viết "A/B test creative" chung chung.
- Bằng chứng + cơ chế của hệ thống phía sau.
- Giả thuyết kiểm chứng được: thời gian, chỉ số thành công, điều kiện dừng. Thử nghiệm giữa các phần của một ngân sách → dùng A/B test của nền tảng; còn lại → trước/sau (nói rõ điểm yếu: mùa vụ).
- Tắt / giảm → nói **tiền chuyển đi đâu** (đơn vị giữ ngân sách tốt nhất còn dư địa, hoặc giữ lại) và **khi nào nên thử lại**.

Ví dụ tốt:

> Chi phí trên mỗi lượt bắt đầu cuộc trò chuyện qua tin nhắn tăng từ 18.000 ₫ lên 31.000 ₫ trong 2 tuần, trong khi Tần suất theo tuần tăng từ 1,8 lên 3,4 và CTR (tỷ lệ nhấp vào liên kết) giảm 35% → nhiều khả năng mẫu quảng cáo bị nhàm (Định hướng). Giả thuyết: thêm 2 mẫu với hook khác sẽ đưa chi phí về dưới 22.000 ₫ trong 7 ngày.

> Chi phí / tin nhắn 20.000 ₫, tỷ lệ chốt bạn cung cấp 25% → CPA quy đổi ≈ 80.000 ₫ (tự tính), so với CPA hòa vốn 150.000 ₫ (AOV 500.000 ₫ × biên lợi nhuận 30%). Nhóm đã thoát giai đoạn học, 120 cuộc trò chuyện / 14 ngày (Chắc chắn). Đề xuất tăng 20% ngân sách ở cấp giữ ngân sách, kiểm tra lại CPA quy đổi sau 7 ngày. Điều kiện dừng: CPA quy đổi > 120.000 ₫.

## 3. Tên chỉ số (tiếng Việt, lần đầu kèm tên tiếng Anh trong ngoặc)

| Trường `ads_get_report` | Tên tiếng Việt                                                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `spend`                 | Số tiền đã chi tiêu (Amount spent)                                                                                            |
| `impressions`           | Lượt hiển thị (Impressions)                                                                                                   |
| `reach`                 | Người tiếp cận (Reach)                                                                                                        |
| `frequency`             | Tần suất (Frequency)                                                                                                          |
| `clicks`                | Lượt nhấp (tất cả) (Clicks (all))                                                                                             |
| `link_clicks`           | Lượt nhấp vào liên kết (Link clicks)                                                                                          |
| `ctr`                   | CTR (tỷ lệ nhấp vào liên kết) — Meta: `ctr` chuẩn hoá là CTR tất cả, CTR liên kết tự tính = `link_clicks ÷ impressions × 100` |
| `cpc`                   | CPC (chi phí trên mỗi lượt nhấp)                                                                                              |
| `cpm`                   | CPM (chi phí trên 1.000 lượt hiển thị)                                                                                        |
| `conversions`           | Kết quả (Results) — theo sự kiện tối ưu                                                                                       |
| `cpa`                   | Chi phí trên mỗi kết quả (Cost per result)                                                                                    |
| `messages`              | Lượt bắt đầu cuộc trò chuyện qua tin nhắn                                                                                     |
| `leads`                 | Khách hàng tiềm năng (Leads)                                                                                                  |
| `purchases`             | Lượt mua (Purchases)                                                                                                          |
| `conversion_value`      | Giá trị chuyển đổi từ lượt mua                                                                                                |
| `roas`                  | ROAS (lợi tức trên chi tiêu quảng cáo)                                                                                        |
| `video_views`           | Lượt xem video                                                                                                                |
| tự tính                 | CPA quy đổi, CPA hòa vốn, ROAS hòa vốn, ROAS tổng hợp, chi phí biên, tỷ lệ chuyển đổi (= kết quả ÷ nhấp liên kết × 100)       |

Nhãn: chất lượng dữ liệu **Cao / Trung bình / Thấp**; độ tin cậy **Chắc chắn / Định hướng / Chưa đủ dữ liệu**; số tự tính ghi **"tự tính"**; trạng thái học **Đang học / Học có giới hạn / Đã thoát học** (+ "tự suy luận" / "chưa rõ").

## 4. Cách viết

- **Không bao giờ viết "click" trơn**: luôn "lượt nhấp (tất cả)" hoặc "lượt nhấp vào liên kết".
- Meta: người được tiếp cận là **"tài khoản trong Trung tâm tài khoản"** (lần đầu), sau đó "tài khoản" — không viết "người". Người mua trong luồng bán hàng (inbox, Zalo, cửa hàng) là "khách hàng". Tên nhắm mục tiêu / tên cột trích nguyên văn.
- Không đặt "Tổng / Trung bình" trước tên chỉ số như thể đó là một chỉ số; viết "Trên toàn tài khoản, Lượt hiển thị đạt…". "Chi phí bình quân và chi phí biên" thì được.
- Số theo kiểu Việt Nam: `18.000 ₫`, `1,25%`, `42,50 USD`. Mỗi số tiền kèm đơn vị tiền tệ.
- "Tắt" = **tạm dừng**, không bao giờ là xoá / lưu trữ.

## 5. Tin Telegram (bản rút gọn)

```
📊 <Quy trình> · <dd/MM HH:mm>
Chi hôm qua: 12.400.000 ₫ (▲8% so TB 7 ngày) · 310,00 USD
Chi phí/tin nhắn Meta 21.500 ₫ ✅ (mục tiêu 25.000 ₫) · CPA TikTok 168.000 ₫ ⚠️
Dữ liệu: tin nhắn Cao · lượt mua web Trung bình (chỉ Pixel)
✅ Đã tự làm (2): CL1 tạm dừng QC "Video 3" (chi 92.000 ₫, 0 tin nhắn) · TT1 +20% NS "Nhóm Nữ 25-40" (hiệu lực ngay)
🕒 Chờ duyệt (2): DX-20261026-01 tắt chiến dịch CBO "Sale 11.11" (CL2) · DX-20261026-02 làm mới creative nhóm "Retarget"
❓ Cần bạn trả lời: tỷ lệ chốt inbox tháng này? (để tính CPA quy đổi)
⚠️ Kết nối TikTok cần xác thực lại
```

✅ đạt mục tiêu · ⚠️ lệch > 20% · 🔴 lệch > 50% · chỉ đánh giá khi dữ liệu ≥ Trung bình.
