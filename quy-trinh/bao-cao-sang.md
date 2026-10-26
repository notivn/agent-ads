# Quy trình: Báo cáo sáng (`bao-cao-sang`)

**Lịch mặc định:** 08:00 hằng ngày (giờ Việt Nam). **Được tự ghi:** CL1, CL2, CL3, TT1 — đúng điều kiện `nguong-an-toan.md` §4.
Dữ liệu: ngày trọn vẹn tới **ngày chốt gần nhất D\*** theo giờ từng tài khoản (Meta / Google / OpenAI: hôm qua; **TikTok lúc 08:00: hôm kia** — hôm qua chỉ chốt sau 19:00). Cửa sổ CL2 bỏ 3 ngày gần nhất; kết quả về trễ (web, Google, OpenAI) chỉ tính chi tới D\*−3 cho CL1 / CL3.

## Các bước (trưởng phòng điều phối)

1. Đọc `nguong-an-toan.md`, `muc-tieu-kpi.md`, `nhat-ky/de-xuat.md`, `nhat-ky/cau-hoi.md`. `ads_list_accounts` → tài khoản, tiền tệ, múi giờ, kết nối lỗi. Ghi chú nếu hôm nay / hôm qua nằm trong **mùa cao điểm**.
2. `ads-phan-tich` (song song theo nền tảng nếu nhiều tài khoản): toàn bộ quy trình của agent — phạm vi & D\*, MT theo loại kết quả, ĐVNS, sự kiện tối ưu, chất lượng dữ liệu, độ đủ mẫu, trạng thái học, **cầu dao đo lường**, so ngân sách với ảnh chụp; tổng quan hôm qua / 7 ngày / so 7 ngày trước; áp **CL1, CL2, CL3, TT1**; ≤ 5 phát hiện; bảng ngân sách hiện tại.
3. `ads-kiem-soat`: kiểm lại và phân loại bảng đề xuất.
4. Dòng `TU_DONG` (khi `CHE_DO_TU_DONG = bat`) → `ads-media-buyer` thực thi.
5. `ads-thu-ky`:
   - Ghi ảnh chụp ngân sách vào `nhat-ky/ngan-sach.md` (từ bảng ngân sách của phân tích, **trước** khi thực thi thao tác — thao tác hôm nay đã nằm trong `thao-tac.md`).
   - Ghi `nhat-ky/thao-tac.md`; ghi `CAN_DUYET` vào `nhat-ky/de-xuat.md` (mã DX mới); đề xuất > 3 ngày → `hết hạn`; câu hỏi mới vào `nhat-ky/cau-hoi.md`.
   - Lưu `nhat-ky/bao-cao/<ngày>-bao-cao-sang.md` theo `phuong-phap/mau-bao-cao.md` §1.
   - Gửi **1 tin** Telegram theo mẫu §5.
6. Trả tóm tắt cuối (5–10 dòng).

## Nội dung tin Telegram

- Chi hôm qua theo từng tiền tệ + % so trung bình 7 ngày.
- Chỉ số quyết định từng tài khoản so MT (✅ / ⚠️ / 🔴) — chỉ khi dữ liệu ≥ Trung bình; còn lại ghi "chưa đánh giá được (dữ liệu Thấp)".
- 1 dòng chất lượng dữ liệu.
- Đã tự làm: mã quy tắc + đối tượng + số chính.
- Chờ duyệt: mã DX + 1 dòng.
- Câu hỏi cho chủ tài khoản (nếu có, tối đa 2).
- Cảnh báo: **cầu dao đo lường** (khẩn — kèm 3 việc cần kiểm đầu tiên), kết nối lỗi, quảng cáo bị từ chối, tài khoản ngừng chi, Học có giới hạn mới, ngân sách bị sửa tay ngoài phòng.
