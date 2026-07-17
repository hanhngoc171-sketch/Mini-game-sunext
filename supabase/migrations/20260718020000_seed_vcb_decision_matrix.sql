-- Seed: Vietcombank Data Decision Matrix (24 questions from VCB Excel)
create or replace function public.seed_vcb_decision_matrix()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  sid uuid;
  qid uuid;
begin
  -- avoid duplicates by name
  select id into sid from quiz_sets where name = 'Vietcombank Data Decision Matrix' limit 1;
  if sid is not null then
    return sid;
  end if;

  insert into quiz_sets (name, description, status)
  values (
    'Vietcombank Data Decision Matrix',
    'Bộ trắc nghiệm phân loại cấp dữ liệu VCB (24 tình huống). Import từ file Bo_trac_nghiem_VCB_tich_hop_dap_an.xlsx',
    'active'
  )
  returning id into sid;


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_05] Trích một văn bản nội bộ chi nhánh: "Điều 5.1 — Giám đốc Chi nhánh được phán quyết các khoản vay có tài sản bảo đảm hợp lệ đầy đủ theo Điều 4 và tổng giá trị cấp tín dụng dưới 10 tỷ đồng."

Tình huống trên thuộc cấp dữ liệu nào?', 1, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_17] Trích một báo cáo: "LN-0891-2025-0417 | Công ty TNHH Long An Alpha | Dư nợ hiện tại: 4.850.000.000đ | Phân loại nợ: NHOM_2."

Tình huống trên thuộc cấp dữ liệu nào?', 2, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_22] Đồng nghiệp gửi cho bạn qua nhóm chat nội bộ trên điện thoại cá nhân 1 ảnh chụp màn hình máy tính. Trong ảnh có thể đọc rõ: STK: 0071000123456 — Nguyễn Văn A — Số dư: 235.400.000đ — Trạng thái: Đang xử lý phong tỏa do yêu cầu của Cơ quan điều tra. Đồng nghiệp nhắn: "Mày xem thử cái này có đúng với yêu cầu của anh Giám đốc sáng nay không?"

Tình huống trên thuộc cấp dữ liệu nào?', 3, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_07] Trích một công văn nội bộ: "Áp dụng thống nhất thứ tự cột và tên trường theo đúng MASTER_REFERENCE.xlsx và data_dictionary.xlsx..., bắt đầu từ kỳ báo cáo tuần 13/07/2026 - 19/07/2026."

Tình huống trên thuộc cấp dữ liệu nào?', 4, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', true);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_24] Khách hàng gọi điện đến quầy giao dịch và nói: "Tôi yêu cầu ngân hàng cung cấp cho tôi danh sách toàn bộ thông tin cá nhân mà ngân hàng đang lưu trữ về tôi, bao gồm lịch sử giao dịch và hồ sơ tín dụng. Và tôi yêu cầu xóa toàn bộ các thông tin đó ngay hôm nay theo quy định pháp luật về bảo vệ dữ liệu cá nhân."

Tình huống trên thuộc cấp dữ liệu nào?', 5, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_04] Một dòng trong bảng lập kế hoạch nguồn tra cứu: STT 2 | Cục Thống kê tỉnh Long An | Cơ quan Nhà nước địa phương | Số liệu KT-XH cấp tỉnh | URL: [MẪU — điền khi tác nghiệp] | Ngày truy cập: [MẪU]

Tình huống trên thuộc cấp dữ liệu nào?', 6, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_06] Một biên bản họp điền dở dang, chưa hoàn chỉnh: - Thời gian: 08h00, thứ Hai, 14/07/2026 - Địa điểm: Phòng họp Chi nhánh CN0891 - Thành phần tham dự: Giám đốc Chi nhánh, Trưởng phòng QHKH Doanh nghiệp, đại diện Công ty TNHH Long An Alpha (Ông Nguyễn Văn C - Giám đốc) - Kết luận / Quyết định: ______________________

Tình huống trên thuộc cấp dữ liệu nào?', 7, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_16] Trích một hồ sơ định danh khách hàng: "CCCD số 079089012345 — Trần Thị B — cấp ngày 12/05/2021 tại Cục Cảnh sát QLHC về TTXH."

Tình huống trên thuộc cấp dữ liệu nào?', 8, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_14] Trích một danh sách: "NV-0891-027 | Lê Hoàng Phúc | Ngày sinh: 12/02/1994 | Chuyên viên QHKH Doanh nghiệp | CN0891-KHDN."

Tình huống trên thuộc cấp dữ liệu nào?', 9, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_10] Trích một danh sách: "NV-0891-005 | Giao dịch viên | CN0891-PGDA. NV-0891-011 | Giao dịch viên | CN0891-PGDB. NV-0891-016 | Chuyên viên Quản lý nợ | CN0891-QLN."

Tình huống trên thuộc cấp dữ liệu nào?', 10, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_01] Trích trang "Biểu phí dịch vụ" trên website vcb.com.vn: "Phí chuyển tiền trong nước qua VCB Digibank: 0,02% số tiền giao dịch, tối thiểu 11.000đ, tối đa 2.000.000đ/giao dịch. Biểu phí áp dụng từ 01/01/2026."

Tình huống trên thuộc cấp dữ liệu nào?', 11, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_21] Anh Phúc (CV QHKH Doanh nghiệp) vừa gửi cho bạn qua Zalo cá nhân kèm tin nhắn: "Em ơi xem giúp anh file này có thiếu gì không, anh cần gấp trước 17h." File đính kèm tên: Ho_So_Tin_Dung_Long_An_Alpha_Final.pdf.

Tình huống trên thuộc cấp dữ liệu nào?', 12, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_15] Trích một ghi chú giao dịch: "STK 0071000123456 — chủ tài khoản Nguyễn Văn A — số dư hiện tại 235.400.000đ."

Tình huống trên thuộc cấp dữ liệu nào?', 13, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_08] Lịch họp nội bộ tuần: "08h00, thứ Hai, Phòng họp Chi nhánh. Thành phần: Giám đốc Chi nhánh (chủ trì), Trưởng phòng Giao dịch, Trưởng phòng Quản lý nợ, Kế toán trưởng, CV Hành chính – Nhân sự (thư ký), CV QHKH Doanh nghiệp. Nội dung chính: Rà soát tình hình nợ có nguy cơ quá hạn trong tuần, trong đó trọng tâm là khoản vay của Công ty TNHH Long An Alpha và đánh giá khả năng thu hồi nợ trước ngày 31/07/2026."

Tình huống trên thuộc cấp dữ liệu nào?', 14, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_18] Trích một biên bản họp: "Thành viên Lê Quang Huy (15% vốn góp) không có mặt, không ký biên bản, không có văn bản ủy quyền kèm theo — thông qua chủ trương vay vốn với tỷ lệ biểu quyết 85%."

Tình huống trên thuộc cấp dữ liệu nào?', 15, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_23] Báo cáo phân tích nợ xấu tuần đã được xử lý ẩn danh: "Chi nhánh CN0891 ghi nhận 01 khoản vay có phân loại nợ Nhóm 2, dư nợ: 4.850.000.000đ. Ngành nghề: sản xuất nhôm nhựa. Thời hạn vay còn lại: 8 tháng. (Đã xóa tên doanh nghiệp và mã khoản vay theo yêu cầu ẩn danh hóa.)"

Tình huống trên thuộc cấp dữ liệu nào?', 16, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_20] Trích một tờ trình: "Đề xuất cấp tín dụng: Công ty TNHH Long An Alpha, số tiền 6.000.000.000đ, thời hạn 12 tháng, tài sản bảo đảm TSBD-0891-LAA-01 và TSBD-0891-LAA-02, tổng giá trị định giá 8.700.000.000đ."

Tình huống trên thuộc cấp dữ liệu nào?', 17, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_03] Trích một bài báo kinh tế: "Khu công nghiệp Long Hậu (Long An) tiếp tục thu hút thêm 3 dự án FDI trong quý II/2026, tập trung vào lĩnh vực điện tử và bao bì công nghiệp..."

Tình huống trên thuộc cấp dữ liệu nào?', 18, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_19] Trích một trao đổi nội bộ: "Anh Phúc: dư nợ của khách hàng theo ghi nhận làm việc trực tiếp là khoảng 4.950.000.000đ, đề nghị đối chiếu lại với Phòng Quản lý nợ trước kỳ báo cáo tuần."

Tình huống trên thuộc cấp dữ liệu nào?', 19, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_12] Bảng tổng hợp: "CN0891-PGDA: 62 giao dịch, tổng giá trị 1,4 tỷ đồng. CN0891-PGDB: 55 giao dịch, tổng giá trị 1,1 tỷ đồng."

Tình huống trên thuộc cấp dữ liệu nào?', 20, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_09] Một dòng số liệu tổng hợp: "SP-TGTK-01 (Tiết kiệm): tổng giá trị giao dịch tuần = 245.000.000đ, 12 giao dịch. SP-VLD-01 (Vay lưu động): tổng giá trị = 55.000.000đ, 2 giao dịch."

Tình huống trên thuộc cấp dữ liệu nào?', 21, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', true);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_13] Trích Điều 3.2, Quy trình QT-02 (Quy trình Vận hành Phòng Giao dịch) — văn bản nội bộ chi nhánh: "Phòng Giao dịch có trách nhiệm lập và gửi Báo cáo Giao dịch Tuần (theo mẫu BM-01) về Phòng Hành chính – Nhân sự chậm nhất vào 08h00 thứ Hai của tuần liền sau tuần báo cáo. Trường hợp thứ Hai là ngày nghỉ lễ, thời hạn nộp được lùi sang ngày làm việc đầu tiên ngay sau đó."

Tình huống trên thuộc cấp dữ liệu nào?', 22, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', true);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_02] Trích Điều 8, Thông tư 39/2016/TT-NHNN của Ngân hàng Nhà nước Việt Nam (văn bản đã ban hành, đăng trên Cổng thông tin Chính phủ): "Tổ chức tín dụng xem xét, quyết định cho vay khi khách hàng có đủ các điều kiện theo quy định..."

Tình huống trên thuộc cấp dữ liệu nào?', 23, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', true);


  insert into questions (body, "order", quiz_set_id, time_limit, base_score)
  values ('[The_11] Trích một biên bản: "CV QHKH Doanh nghiệp báo cáo nhanh tình hình một khách hàng doanh nghiệp có khoản vay LN-0891-2025-0417 — quan hệ tín dụng ổn định, chưa phát sinh nợ quá hạn."

Tình huống trên thuộc cấp dữ liệu nào?', 24, sid, 20, 100)
  returning id into qid;
  insert into choices (question_id, body, is_correct) values (qid, 'Cấp 1 (Công khai)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 3 (Nội bộ hạn chế)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 2 (Nội bộ phổ biến)', false);
insert into choices (question_id, body, is_correct) values (qid, 'Cấp 4 (Bí mật)', true);


  return sid;
end;
$$;

grant execute on function public.seed_vcb_decision_matrix() to anon, authenticated;

select public.seed_vcb_decision_matrix() as quiz_set_id;
