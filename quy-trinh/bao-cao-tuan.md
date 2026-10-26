# Quy trình: Báo cáo tuần + nghiên cứu (`bao-cao-tuan`)

**Lịch mặc định:** Thứ Hai 09:00. **Được tự ghi:** không thao tác quảng cáo; chỉ GC1 (ghi chép) và NC1 (Apify trong hạn mức).

## Các bước

1. Đọc `nguong-an-toan.md`, `muc-tieu-kpi.md` (gồm "Bối cảnh kinh doanh", ngày khuyến mãi), `nhat-ky/thao-tac.md` (7 ngày), `nhat-ky/cau-hoi.md`.
2. **Song song:**
   - `ads-phan-tich`: báo cáo đầy đủ (mục 0–6) — 7 ngày trọn vẹn vs 7 ngày trước, xu hướng theo ngày ở ĐVNS, chi phí biên khi đủ điều kiện, tín hiệu phân bổ, trạng thái học (Học có giới hạn → đề xuất cấu trúc), chồng lấn đấu giá giữa các nhóm / chiến dịch trùng; TikTok Shop GMV Max riêng nếu có. ROAS tổng hợp nếu chủ tài khoản đã đưa doanh thu.
   - `ads-creative`: chẩn đoán mỏi creative theo tuần + xếp hạng mức liên quan (Meta); 3 phương án làm mới cho mỗi ĐVNS quan trọng.
   - `ads-nghien-cuu`: đối thủ trong "Bối cảnh kinh doanh" — tối đa `APIFY_TU_DONG_TOI_DA_LAN_MOI_NGAY` lần, mỗi lần ≤ `APIFY_TU_DONG_TOI_DA_USD_MOI_LAN`; bài Trang tương tác cao 7 ngày; mùa vụ 2 tuần tới.
3. Trưởng phòng tổng hợp **kế hoạch tuần**: 3–7 việc cụ thể, mỗi việc là một giả thuyết kiểm chứng (thời gian, chỉ số thành công, điều kiện dừng) và là một đề xuất → `ads-kiem-soat` phân loại (đa số `CAN_DUYET`).
4. **Đánh giá luật**: số thao tác theo mã CL1 / CL2 / CL3 / TT1 / TP1 tuần qua, bao nhiêu đúng hướng (từ hậu kiểm cuối ngày) → gợi ý chỉnh hệ số trong `nguong-an-toan.md` §0 (chỉ gợi ý, không tự sửa file luật).
5. Nhắc các câu hỏi còn mở trong `nhat-ky/cau-hoi.md` (tỷ lệ chốt, CPA mục tiêu, tracking) — thiếu chúng thì phòng không tự động được.
6. `ads-thu-ky`: ghi đề xuất, lưu `nhat-ky/bao-cao/<ngày>-bao-cao-tuan.md`, gửi Telegram bản tóm tắt (≤ 3.500 ký tự).
