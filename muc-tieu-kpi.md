# Hồ sơ kinh doanh & mục tiêu từng tài khoản quảng cáo

> Chủ doanh nghiệp / trưởng nhóm điền file này. Phòng Ads **chỉ tự động** trên tài khoản có hồ sơ ở đây, `tu_dong: co`, và có **mục tiêu trên mỗi kết quả (MT) đáng tin** cho đúng loại kết quả (`nguong-an-toan.md` §0).
> `account_id` lấy đúng như `ads_list_accounts` trả về (hỏi trưởng phòng: "liệt kê tài khoản quảng cáo"). Tiền ghi theo **đơn vị chính** của tiền tệ tài khoản.
> Số sai còn nguy hiểm hơn để trống. Không chắc → để trống, phòng sẽ hỏi lại và chỉ so sánh tương đối, không tự động.

## Cách phòng tính MT (theo từng loại kết quả)

1. Có `muc_tieu_tren_ket_qua.<loại>` → dùng luôn.
2. Không có → `cpa_muc_tieu` × `ty_le_chot.<loại>`.
3. Không có `cpa_muc_tieu` → (`aov` × `bien_loi_nhuan`) × `ty_le_chot.<loại>` = điểm **hòa vốn** (chưa có lãi — nên đặt `cpa_muc_tieu` thấp hơn).
4. Loại `purchases` → tỷ lệ chốt = 100%.

Ví dụ: bán qua inbox, AOV 450.000 ₫, biên lợi nhuận 35%, CPA mục tiêu 120.000 ₫, tỷ lệ chốt tin nhắn 20% → MT tin nhắn = 120.000 × 20% = **24.000 ₫ / tin nhắn**. Cùng tài khoản chạy thêm biểu mẫu tức thì, tỷ lệ lead → đơn 12% → MT lead = 14.400 ₫ … phải ghi riêng, phòng **không** dùng MT tin nhắn cho nhóm biểu mẫu.

Nhóm tối ưu cho loại kết quả **không có MT** trong hồ sơ (hoặc tối ưu hiển thị / tiếp cận / ThruPlay / tương tác / lượt nhấp) → phòng chỉ báo cáo, không áp quy tắc.

## Giá trị hợp lệ

| Trường                               | Giá trị                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `platform`                           | `meta` · `tiktok` · `google_ads` · `openai_ads`                                                                                                                                                                                                                                                                                                            |
| `mo_hinh_ban`                        | `website` (thanh toán trên web) · `inbox` (Messenger / TikTok DM → Zalo / điện thoại) · `form_web` (form landing page → sale gọi) · `form_tuc_thi` (biểu mẫu trên nền tảng → sale gọi) · `goi_dien` · `san_tmdt` (Shopee / Lazada / TikTok Shop — **không tự động**: quyết định theo đơn sàn / UTM, phòng chỉ báo cáo) · `hon_hop` (ghi tỷ lệ % từng kênh) |
| `loai_ket_qua`                       | Danh sách loại có MT: `messages` (tin nhắn bắt đầu — Meta, TikTok) · `leads` (khách tiềm năng — Meta, TikTok) · `purchases` (lượt mua — Meta, TikTok) · `conversions` (chuyển đổi theo sự kiện tối ưu — bắt buộc dùng cho Google Ads, OpenAI Ads)                                                                                                          |
| `chi_so_quyet_dinh`                  | `cpa` (mặc định: chi phí / kết quả so MT) · `roas` (chỉ khi `loai_ket_qua: purchases`, tracking `pixel_capi`, `doi_soat_don: co`, và có `roas_muc_tieu`)                                                                                                                                                                                                   |
| `tracking`                           | `pixel` · `pixel_capi` (Pixel + Conversions API / Events API / Enhanced Conversions, có chống trùng) · `capi_messaging` (gửi đơn từ hội thoại / CRM về nền tảng) · `khong`                                                                                                                                                                                 |
| `ty_le_chot.<loại>`                  | % kết quả thành đơn **và** số đơn làm cơ sở + khoảng ngày, vd `messages: 20% (120 đơn, 01–30/09/2026)`. Dưới 15 đơn hoặc cũ hơn 90 ngày → MT "tạm", không tự động                                                                                                                                                                                          |
| `doi_soat_don`                       | `co` = lượt mua trên nền tảng lệch đơn thật ≤ 30% (bạn đã kiểm) · `khong` · `chua_kiem`                                                                                                                                                                                                                                                                    |
| `tran_ngan_sach_ngay_moi_doi_tuong`  | Trần ngân sách ngày cho **một** chiến dịch / nhóm (khớp trần của MCP)                                                                                                                                                                                                                                                                                      |
| `tran_tong_ngan_sach_ngay_tai_khoan` | Trần **tổng** ngân sách ngày của mọi đối tượng đang chạy trong tài khoản. Bỏ trống → phòng không tự tăng ngân sách                                                                                                                                                                                                                                         |
| `tu_dong`                            | `co` (được tự ghi theo `nguong-an-toan.md` §4) · `khong` (chỉ báo cáo + đề xuất)                                                                                                                                                                                                                                                                           |

## Hồ sơ tài khoản

### meta · act_000000000000000 · Shop A – Facebook (VÍ DỤ — thay bằng số thật)

- tien_te: VND
- mo_hinh_ban: inbox
- loai_ket_qua: messages, leads
- chi_so_quyet_dinh: cpa
- tracking: pixel
- aov: 450000
- bien_loi_nhuan: 35%
- cpa_muc_tieu: 120000
- ty_le_chot: messages 20% (120 đơn, 01–30/09/2026); leads 12% (40 đơn, 09/2026)
- muc_tieu_tren_ket_qua: (bỏ trống = tự tính; hoặc vd `messages 24000`)
- roas_muc_tieu:
- doi_soat_don: chua_kiem
- tran_ngan_sach_ngay_moi_doi_tuong: 2000000
- tran_tong_ngan_sach_ngay_tai_khoan: 5000000
- gio_truc_inbox: 08:00–22:00
- tu_dong: khong
- ghi_chu: Ví dụ

### tiktok · 7000000000000000000 · Shop A – TikTok (VÍ DỤ)

- tien_te: VND
- mo_hinh_ban: form_tuc_thi
- loai_ket_qua: leads
- chi_so_quyet_dinh: cpa
- tracking: khong
- aov: 900000
- bien_loi_nhuan: 40%
- cpa_muc_tieu: 250000
- ty_le_chot: leads 15% (60 đơn, 09/2026)
- muc_tieu_tren_ket_qua:
- roas_muc_tieu:
- doi_soat_don: chua_kiem
- tran_ngan_sach_ngay_moi_doi_tuong: 1500000
- tran_tong_ngan_sach_ngay_tai_khoan: 3000000
- gio_truc_inbox: 08:00–21:00
- tu_dong: khong
- ghi_chu: Ví dụ

### google_ads · 123-456-7890 · Shop A – Google (VÍ DỤ)

- tien_te: VND
- mo_hinh_ban: website
- loai_ket_qua: conversions
- chi_so_quyet_dinh: cpa
- tracking: pixel_capi
- aov: 600000
- bien_loi_nhuan: 30%
- cpa_muc_tieu: 150000
- ty_le_chot: conversions 100% (chuyển đổi chính duy nhất là "Mua hàng")
- muc_tieu_tren_ket_qua:
- roas_muc_tieu:
- doi_soat_don: co
- tran_ngan_sach_ngay_moi_doi_tuong: 1000000
- tran_tong_ngan_sach_ngay_tai_khoan: 2000000
- tu_dong: khong
- ghi_chu: Ví dụ — Enhanced Conversions đã bật

### openai_ads · acct_xxx · Shop A – ChatGPT (VÍ DỤ)

- tien_te: USD
- mo_hinh_ban: website
- loai_ket_qua: conversions
- chi_so_quyet_dinh: cpa
- tracking: pixel
- aov: 40
- bien_loi_nhuan: 35%
- cpa_muc_tieu: 8
- ty_le_chot: conversions 100%
- muc_tieu_tren_ket_qua:
- roas_muc_tieu:
- doi_soat_don: chua_kiem
- tran_ngan_sach_ngay_moi_doi_tuong: 30
- tran_tong_ngan_sach_ngay_tai_khoan: 50
- tu_dong: khong
- ghi_chu: Kênh mới — phòng không tự động cho tới khi đối soát đơn + ≥ 14 ngày dữ liệu

## Ghi đè ngưỡng cho từng tài khoản (tuỳ chọn)

Chỉ ghi khi muốn khác mặc định ở `nguong-an-toan.md` §0, ví dụ:

```
act_000000000000000: MUC_TANG_NGAN_SACH_TOI_DA=15%, KHOANG_CACH_CHINH_NGAN_SACH=96 giờ, HE_SO_CL1=4
```

## Mùa cao điểm, ngày nghỉ, hết hàng (theo **dương lịch**, ghi rõ năm)

Trong các khoảng này CL2 và TT1 chỉ đề xuất. Phòng không tự đổi âm lịch → dương lịch: Tết phải ghi ở đây.

- Tết Nguyên Đán 2027 (mùng 1 = 06/02/2027): cao điểm 16/01–05/02/2027; shop nghỉ chốt đơn (vd) 03/02–10/02/2027
- Tết Nguyên Đán 2028 (mùng 1 = 26/01/2028): (điền khi tới gần)
- (vd) 25/11–02/12/2026: Black Friday + sinh nhật shop
- (vd) Hết hàng sản phẩm X: 05/11–10/11/2026 (chi phí / kết quả tăng do hết hàng, không phải do quảng cáo)
- (vd) Ngày nghỉ của đội sale / không trực inbox:

## Bối cảnh kinh doanh (giúp phòng viết đề xuất cụ thể)

- Sản phẩm / dịch vụ chính, giá, combo:
- Khách hàng mục tiêu:
- Ưu đãi đang chạy:
- Đơn ghi ở đâu (Google Sheet / KiotViet / Sapo / Haravan / Pancake / Nhanh.vn / CRM…), có gắn tên chiến dịch / UTM không:
- Quảng cáo có để số điện thoại / Zalo / link ngoài trong nội dung không (khi có, phòng không tự tắt vì "0 tin nhắn"):
- Đối thủ chính (tên Trang, shop, website — dùng cho nghiên cứu Apify):
- Giọng văn quảng cáo / điều cấm nói (chính sách ngành, cam kết không được hứa):
