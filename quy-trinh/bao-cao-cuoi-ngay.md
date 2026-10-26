# Quy trình: Báo cáo cuối ngày (`bao-cao-cuoi-ngay`)

**Lịch mặc định:** 21:00 hằng ngày. **Được tự ghi:** chỉ **TP1**.

## Các bước

1. Đọc `nguong-an-toan.md`, `muc-tieu-kpi.md`, `nhat-ky/thao-tac.md` (thao tác hôm nay), `nhat-ky/de-xuat.md`. `ads_list_accounts`.
2. `ads-phan-tich`:
   - Số **hôm nay (tạm tính, chưa chốt)** so cùng giờ hôm qua không có → so trung bình 7 ngày, ghi rõ "tạm tính"; theo nền tảng / tài khoản, chỉ ở ĐVNS.
   - Top 3 ĐVNS tốt nhất và tệ nhất theo chỉ số quyết định (chỉ những ĐVNS có mẫu ≥ Định hướng trong 7 ngày).
   - Áp TP1 (như `tuan-tra` bước 2, gồm cầu dao đo lường).
3. **Hậu kiểm thao tác tự động** của 7 ngày qua (từ `nhat-ky/thao-tac.md`): sau mỗi CL / TT1, chỉ số ĐVNS liên quan đi đúng hướng chưa (TT1: chi phí / kết quả sau tăng còn ≤ MT? CL: tiền chuyển đi có tạo kết quả rẻ hơn?). Thao tác cần ≥ 3 ngày mới đánh giá được → ghi "chưa đủ ngày".
4. Có đề xuất TP1 → `ads-kiem-soat` → `ads-media-buyer`.
5. `ads-thu-ky`: ghi sổ, lưu `nhat-ky/bao-cao/<ngày>-bao-cao-cuoi-ngay.md`, gửi **1 tin** Telegram:
   - Chi hôm nay (tạm tính) theo tiền tệ, chỉ số quyết định, so trung bình 7 ngày.
   - Thao tác tự động hôm nay: số lượng theo mã + hậu kiểm.
   - Đề xuất còn chờ duyệt (mã DX) — nhắc duyệt trước 08:00 mai.
   - Nhắc giờ trực inbox nếu tin nhắn tới nhiều ngoài `gio_truc_inbox` (tin nhắn không được trả lời → không ra đơn).
