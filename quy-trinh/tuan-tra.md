# Quy trình: Tuần tra trong ngày (`tuan-tra`)

**Lịch mặc định:** 11:30 và 15:30 hằng ngày. **Được tự ghi:** chỉ **TP1** (tạm dừng quảng cáo / nhóm đã tiêu ≥ 3 × MT kể từ khi chạy — tính cả hôm nay — mà 0 kết quả, với loại kết quả đo gần thời gian thực).
Mục đích: chặn đốt tiền sớm, không chờ sáng mai. Nhẹ, nhanh, ít tin nhắn.

## Các bước

1. Đọc `nguong-an-toan.md`, `muc-tieu-kpi.md`, `nhat-ky/thao-tac.md` (đếm tạm dừng hôm nay). `ads_list_accounts`.
2. `ads-phan-tich` chỉ với tài khoản đủ điều kiện tự động có MT cho loại kết quả **gần thời gian thực** (tin nhắn đo trên nền tảng, biểu mẫu tức thì), và đã qua 11:00 **giờ tài khoản** (chưa tới → bỏ qua, ghi chú):
   - Chọn ứng viên: `ads_get_report` **hôm nay**, level `ad` và `ad_group`, `granularity: "total"`, `filters.min_spend` = `HE_SO_CL1` × MT ÷ 2 (lọc thô); giữ đối tượng **khớp loại kết quả** và 0 kết quả hôm nay (trường đúng loại, có giá trị).
   - Với ứng viên: **chi kể từ khi chạy** (từ mốc M tới hiện tại) và kết quả cùng kỳ bằng `filters.ids` (không `min_spend`) → áp **TP1**.
   - **Cầu dao đo lường** cho từng tài khoản trước khi đưa TP1 lên kiểm soát.
   - Cảnh báo (không thao tác): tài khoản chi hôm nay > 70% tổng ngân sách ngày trước 12:00; phân phối về gần 0 bất thường; quảng cáo bị từ chối mới.
3. Có đề xuất → `ads-kiem-soat` → `ads-media-buyer` thực thi dòng `TU_DONG`.
4. `ads-thu-ky`:
   - Ghi `thao-tac.md`, `de-xuat.md`, lưu `nhat-ky/bao-cao/<ngày>-tuan-tra-<HHmm>.md`.
   - **Chỉ gửi Telegram khi có thao tác, đề xuất mới hoặc cảnh báo.** Không có gì → không gửi.
5. Tóm tắt cuối 2–5 dòng.

Không áp CL2, CL3, TT1 trong quy trình này (dữ liệu hôm nay chưa chốt, chi theo ngày dao động do pacing).
