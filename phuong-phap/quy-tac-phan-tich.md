# Quy tắc phân tích: đơn vị giữ ngân sách, cộng gộp, chi phí biên, giai đoạn học

> Phương pháp tham khảo skill `meta-ads-analyzer-mod-by-noti-v2` (noti.vn), mở rộng cho 4 nền tảng.

## 1. Hai câu hỏi — hai cấp

- **"Tiền có được phân bổ đúng không?"** (hiệu quả ngân sách) → **chỉ** đánh giá ở **đơn vị giữ ngân sách**.
- **"Vì sao?"** (chẩn đoán) → đi xuống nhóm / quảng cáo / creative / vị trí / độ tuổi / từ khoá.

### Đơn vị giữ ngân sách theo nền tảng

| Nền tảng   | Đơn vị giữ ngân sách                                                                                                                                                                                                                                                                                                                  | "Phần của ngân sách" (không đánh giá bằng chi phí trung bình)      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Meta       | Đọc `ads_get_object` cấp **campaign**: có ngân sách (CBO / Advantage+ campaign budget, `extra.budgetMode = CBO`) → **chiến dịch**; không có → **nhóm quảng cáo**. Chiến dịch ABO bật `is_adset_budget_sharing_enabled` (nhóm được chia sẻ một phần ngân sách cho nhau) → nhóm vẫn là nơi đổi ngân sách, nhưng CL2 / CL3 chỉ chờ duyệt | Nhóm trong CBO; quảng cáo trong nhóm; độ tuổi / giới tính / vị trí |
| TikTok     | Chiến dịch nếu bật tối ưu ngân sách chiến dịch (ngân sách ở chiến dịch, Smart+ CBO); nếu không thì **ad group**                                                                                                                                                                                                                       | Ad group trong chiến dịch CBO; quảng cáo trong ad group            |
| Google Ads | **Chiến dịch** (hoặc ngân sách dùng chung nếu nhiều chiến dịch chung 1 ngân sách)                                                                                                                                                                                                                                                     | Nhóm quảng cáo, từ khoá, quảng cáo, tài sản PMax                   |
| OpenAI Ads | **Chiến dịch** (ngân sách chỉ ở chiến dịch)                                                                                                                                                                                                                                                                                           | Ad group, quảng cáo                                                |

Xác định bằng `ads_list_objects` / `ads_get_object` (ngân sách nằm ở cấp nào). Không xác định được → coi là phần của ngân sách (an toàn hơn).

### Hiệu ứng phân bổ (Breakdown Effect) — lỗi hay gặp nhất

Hệ thống phân phối tối ưu theo **chi phí biên** (giá của kết quả _tiếp theo_), không theo chi phí trung bình. Phần "rẻ" bị dùng hết kết quả rẻ trước, nên hệ thống chuyển tiền sang phần có trung bình cao hơn nhưng kết quả tiếp theo rẻ hơn. **Cắt phần "đắt" thường làm cả ngân sách đắt lên.**

- **Không bao giờ** tạm dừng hay cắt một phần của ngân sách chỉ vì chi phí trung bình cao hơn. Ngoại lệ duy nhất: cắt lỗ **CL1** (0 kết quả).
- Ngoại lệ hợp lệ khi kết quả **khác giá trị** (dữ liệu chủ tài khoản cho thấy lead nhóm B chốt bằng nửa nhóm A) → so **CPA quy đổi**, và vẫn phải kiểm chứng trước khi cắt.
- Nghi lãng phí trong một ngân sách → đề xuất **thử nghiệm A/B** của nền tảng (Meta Experiments, TikTok Split Test, Google Experiments), không nhân bản nhóm chạy song song (tự cạnh tranh đấu giá + bản sao phải học lại).

## 2. Cộng gộp chỉ số

- **Cộng được**: chi, lượt hiển thị, lượt nhấp (tất cả), lượt nhấp liên kết, kết quả **cùng loại**, tin nhắn, khách tiềm năng, lượt mua, giá trị lượt mua.
- **Tính lại, không lấy trung bình**: CTR = nhấp liên kết ÷ hiển thị × 100; CPM = chi ÷ hiển thị × 1.000; CPC = chi ÷ nhấp liên kết; chi phí / kết quả = chi ÷ kết quả; ROAS = giá trị ÷ chi.
- **Không cộng, không lấy trung bình** Reach, Frequency, chỉ số "duy nhất" giữa các dòng (đối tượng chồng lấn) — dùng dòng tổng hoặc kéo ở cấp cao hơn. (Tổng Reach các dòng − Reach đã khử trùng = _tín hiệu chồng lấn_, ghi rõ nhãn.)
- Kết quả và chi phí / kết quả chỉ cộng giữa các dòng **cùng loại kết quả** (cùng sự kiện tối ưu); khác loại → "Không áp dụng".
- Không cộng các loại hành động chồng nhau (Meta: `purchase` / `omni_purchase` / `offsite_conversion.fb_pixel_purchase`; `lead` / `offsite_conversion.fb_pixel_lead` / `onsite_conversion.lead_grouped`). `ads_get_report` đã chọn một loại cho `purchases`, `leads`, `messages`; `conversions` = **kết quả theo sự kiện tối ưu** của nhóm.
- **Không cộng chéo tiền tệ.** Không cộng `tiktok_gmv_max_report` với `ads_get_report`.
- **Null và số 0**: chỉ số đếm (kết quả, mua, lead, tin nhắn) của đối tượng có chi > 0 mà trống → **0** — **chỉ khi nền tảng có trường đó** (`chat-luong-du-lieu.md` §2.1); nền tảng không có trường → **N/A**. Chỉ số tỷ lệ (chi phí / kết quả, ROAS, CTR, CPC) trống → **N/A** (không bao giờ là 0).
- Số tự tính chỉ từ số tool trả về hoặc chủ tài khoản cung cấp; ghi "tự tính" và công thức một lần.
- Gom các chiến dịch tên gần giống nhau (người Việt hay chạy nhiều chiến dịch na ná): đoán lý do (A/B test, chạy lại, đối tượng khác), kiểm tra chồng lấn đấu giá.

## 3. Chi phí biên (ước tính, nền tảng không báo)

- **Đơn vị giữ ngân sách**: so hai kỳ bằng nhau (≥ 7 ngày trọn vẹn) có chi/ngày khác nhau rõ (≥ 20%); bỏ các ngày đang học sau khi đổi ngân sách. Kỳ 2 = kỳ chi cao hơn:
  `Chi phí biên / kết quả ≈ (chi/ngày₂ − chi/ngày₁) ÷ (kết quả/ngày₂ − kết quả/ngày₁)` — chỉ hợp lệ khi kết quả/ngày tăng và cả hai kỳ ≥ Định hướng.
- **Phần của ngân sách**: không dùng công thức; dùng **tín hiệu phân bổ**: phần có tỷ trọng chi tăng trong khi chi phí / kết quả của cả ngân sách đi ngang (±10%) hoặc giảm → đang được mua có lý do, **không cắt**.
- Không ước tính được → ghi "Chi phí biên: không ước tính được từ dữ liệu hiện có", hạ độ tin cậy kết luận một bậc.
- Tăng ngân sách → chi phí / kết quả thường tăng (mua kết quả biên đắt hơn). Đó là bình thường, không phải lỗi.

## 4. Giai đoạn học (thuộc tính của nhóm quảng cáo / ad group)

| Nền tảng   | Cách đọc                                                                                                                                                                                     | Không có thì                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Meta       | `ads_get_object` level `ad_group` → `learning_stage_info.status`: `LEARNING` = Đang học · `SUCCESS` = Đã thoát học · `FAIL` = **Học có giới hạn**; `last_sig_edit_ts` = mốc sửa lớn gần nhất | Suy luận (dưới)                                    |
| TikTok     | Không có trường trạng thái qua MCP                                                                                                                                                           | Suy luận (TikTok cũng cần ~50 chuyển đổi / 7 ngày) |
| Google Ads | Chiến lược giá thầu tự động học ~7 ngày sau tạo / đổi lớn (tới 1–2 tuần với tCPA/tROAS)                                                                                                      | Suy luận theo ngày tạo / đổi                       |
| OpenAI Ads | Không có                                                                                                                                                                                     | "chưa rõ"                                          |

**Suy luận** (ghi "tự suy luận"):

- Tạo hoặc sửa lớn trong 7 ngày qua, < ~50 sự kiện tối ưu từ đó → **có thể đang học**.
- Chạy > 7 ngày kể từ tạo / sửa lớn, sự kiện tối ưu 7 ngày gần nhất ít hơn hẳn 50 → **có thể Học có giới hạn**.
- Còn lại → **có thể đã thoát học**.
- Không có ngày tạo / sửa → "chưa rõ" → hạ độ tin cậy một bậc.
- Thời gian học ≈ 50 ÷ số sự kiện tối ưu / ngày (10 tin nhắn/ngày → ~5 ngày). > 7 ngày → nhiều khả năng sẽ Học có giới hạn.

**Sửa lớn (làm học lại)**: đổi nhắm mục tiêu, thêm/sửa quảng cáo, đổi sự kiện tối ưu, đổi chiến lược giá thầu, đổi ngân sách lớn (> 20–30%), tạm dừng ≥ 7 ngày.

- **Đang học** → không ổn định, chi phí cao hơn là bình thường; không sửa, không kết luận thất bại (trừ CL1/CL3).
- **Học có giới hạn** → vấn đề **cấu trúc**, chờ không tự hết. Cách sửa (dạng giả thuyết có kiểm chứng, đều cần duyệt): gộp nhóm trùng đối tượng/creative; tăng ngân sách tới ~50 × chi phí / kết quả / tuần (chỉ khi chi phí ≤ mục tiêu); tối ưu sự kiện nhiều hơn (Mua → Thêm giỏ; Lead → Tin nhắn); mở rộng đối tượng; giảm số quảng cáo / nhóm.
- Gộp các thay đổi cần làm vào **một lần sửa**.

## 5. Tăng ngân sách an toàn

- Đổi ở **đơn vị giữ ngân sách**.
- Mỗi bước ≤ 20% (kinh nghiệm thực tế: ≤ 20–30% không làm học lại), cách nhau ≥ 72 giờ.
- Người dùng muốn tăng mạnh hơn → nói rõ có thể học lại, đề xuất phương án tăng theo bậc bên cạnh.
- Chỉ tăng khi đối tượng đang chi gần hết ngân sách (≥ 80% ngân sách ngày trung bình 7 ngày). Chi chưa hết mà tăng ngân sách không giúp gì — kiểm tra giá thầu / mục tiêu chi phí / chồng lấn / phân phối trước.

## 6. Kéo số đúng cách (tránh dữ liệu lệch)

- `filters.min_spend` lọc **từng dòng** — với `granularity: "day"` nó bỏ mất các ngày chi ít của đối tượng → chi phí / kết quả sai. Cách đúng:
  1. `granularity: "total"` + `min_spend` (+ `sort_by: "spend"`) để **chọn** đối tượng.
  2. Kéo theo ngày bằng `filters.ids` của các đối tượng đã chọn, **không** kèm `min_spend`.
- Chế độ lọc / sắp xếp chỉ gom tối đa 2.000 dòng rồi báo cảnh báo "Chỉ lọc/sắp xếp trong 2000 dòng đầu tiên" → thấy cảnh báo này là dữ liệu **chưa đủ**: thu hẹp (theo chiến dịch, khoảng ngày) rồi kéo lại; không kết luận trên dữ liệu bị cắt.
- `ads_get_report` chỉ có `granularity: "day" | "total"`. Số **theo tuần** (Frequency tuần, CTR tuần) = gọi `granularity: "total"` cho từng khoảng 7 ngày. Không cộng / trung bình Frequency theo ngày.
- Còn `next_cursor` → đọc tiếp tới hết. Mọi `warnings` của tool ghi vào mục "Phạm vi" của báo cáo; cảnh báo dữ liệu chưa chốt → ngày đó không phải ngày trọn vẹn.
- Cửa sổ "trọn vẹn" kết thúc ở **ngày chốt gần nhất** D* (`nguong-an-toan.md` §2; TikTok trước 19:00 giờ VN là hôm kia).
