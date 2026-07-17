# PRD – INTERNAL QUIZ GAME

## 1. Thông tin chung

- **Tên tạm thời:** Company Quiz Game
- **Nền tảng:** Web app
- **Mã nguồn ban đầu:** `supabase-community/kahoot-alternative`
- **Đối tượng sử dụng:** Nhân viên nội bộ công ty
- **Số người chơi mục tiêu:** Tối đa 60 người trong một phòng
- **Thiết bị hỗ trợ:** Điện thoại, iPad/tablet, laptop và máy tính để bàn

## 2. Mô tả sản phẩm

Company Quiz Game là web app trò chơi hỏi đáp trực tiếp dành cho các chương trình nội bộ công ty.

Ứng dụng gồm ba khu vực:

1. Player App dành cho người chơi.
2. Host Console dành cho người tổ chức.
3. Admin Portal dành cho người quản lý bộ câu hỏi.

Người chơi không cần tạo tài khoản hoặc cài ứng dụng. Họ chỉ cần mở trình duyệt, nhập mã phòng và tên người chơi để tham gia.

Sau câu hỏi cuối cùng, hệ thống chọn năm người có tổng điểm cao nhất và hiển thị màn hình chúc mừng Top 5.

## 3. Mục tiêu

- Tổ chức trò chơi hỏi đáp nội bộ đơn giản.
- Hỗ trợ tối đa 60 người trong một phòng.
- Người chơi có thể tham gia trên điện thoại, iPad và laptop.
- Admin có thể tự thêm, sửa và xóa câu hỏi.
- Host có thể chọn bộ câu hỏi và điều khiển trò chơi.
- Hệ thống tính điểm dựa trên độ chính xác và tốc độ.
- Kết thúc trò chơi bằng màn hình chúc mừng Top 5.
- Giao diện tiếng Việt, dễ hiểu và dễ sử dụng.

## 4. Phạm vi MVP

### Có trong phiên bản đầu tiên

- Admin đăng nhập bằng email và mật khẩu.
- Admin quản lý bộ câu hỏi.
- Admin thêm, sửa và xóa câu hỏi.
- Một câu hỏi có từ hai đến bốn đáp án.
- Mỗi câu hỏi chỉ có một đáp án đúng.
- Host chọn bộ câu hỏi.
- Host tạo phòng chơi.
- Hệ thống tạo mã PIN.
- Player tham gia bằng PIN và nickname.
- Tối đa 60 Player trong một phòng.
- Phòng chờ cập nhật người chơi theo thời gian thực.
- Host bắt đầu và chuyển câu hỏi.
- Player trả lời trên thiết bị cá nhân.
- Hệ thống tính điểm.
- Bảng xếp hạng sau mỗi câu.
- Màn hình Top 5 sau câu cuối.
- Responsive trên điện thoại, tablet và laptop.

### Chưa cần trong MVP

- Đăng nhập cho Player.
- Nhiều cấp phân quyền.
- SSO công ty.
- Import Excel.
- Upload ảnh cho câu hỏi.
- Câu hỏi nhiều đáp án đúng.
- Câu hỏi tự luận.
- Báo cáo nâng cao.
- Xuất Excel hoặc CSV.
- AI tạo câu hỏi.
- Huy hiệu, đổi quà hoặc giải đấu.
- Ứng dụng mobile riêng.

## 5. Nhóm người dùng

### Admin

Admin chịu trách nhiệm quản lý nội dung.

Admin có thể:

- Đăng nhập vào hệ thống.
- Xem danh sách bộ câu hỏi.
- Tạo bộ câu hỏi mới.
- Chỉnh sửa tên và mô tả bộ câu hỏi.
- Bật hoặc tắt bộ câu hỏi.
- Xóa bộ câu hỏi chưa được sử dụng.
- Thêm câu hỏi.
- Sửa câu hỏi.
- Xóa câu hỏi.
- Thay đổi thứ tự câu hỏi.
- Chọn đáp án đúng.
- Đặt thời gian trả lời.
- Đặt số điểm.
- Xem trước bộ câu hỏi.

### Host

Host là người tổ chức và điều khiển trò chơi.

Host có thể:

- Mở trang Host.
- Chọn bộ câu hỏi đang hoạt động.
- Tạo phòng chơi.
- Xem mã PIN.
- Xem danh sách người tham gia.
- Bắt đầu trò chơi.
- Chuyển sang câu hỏi tiếp theo.
- Xem số người đã trả lời.
- Xem bảng xếp hạng.
- Kết thúc trò chơi.
- Xem màn hình Top 5.

### Player

Player là người tham gia trò chơi.

Player có thể:

- Mở web app trên điện thoại, iPad hoặc laptop.
- Nhập mã phòng.
- Nhập nickname.
- Tham gia phòng chờ.
- Xem câu hỏi.
- Chọn đáp án.
- Xem trạng thái đã gửi câu trả lời.
- Xem điểm và thứ hạng.
- Xem Top 5 khi trò chơi kết thúc.

## 6. Các đường dẫn chính

- Player App: `/`
- Host Console: `/host`
- Admin Login: `/admin/login`
- Admin Portal: `/admin`
- Tạo bộ câu hỏi: `/admin/quizzes/new`
- Chỉnh sửa bộ câu hỏi: `/admin/quizzes/[id]`

## 7. Luồng Admin

1. Admin mở `/admin/login`.
2. Admin nhập email và mật khẩu.
3. Sau khi đăng nhập, Admin được chuyển đến `/admin`.
4. Admin chọn “Tạo bộ câu hỏi”.
5. Admin nhập tên và mô tả.
6. Admin thêm các câu hỏi.
7. Admin nhập từ hai đến bốn đáp án cho mỗi câu.
8. Admin chọn một đáp án đúng.
9. Admin chọn thời gian trả lời.
10. Admin đặt điểm cơ bản.
11. Admin lưu bộ câu hỏi.
12. Admin bật trạng thái cho phép Host sử dụng.

## 8. Luồng Host

1. Host mở `/host`.
2. Host chọn một bộ câu hỏi đang hoạt động.
3. Host nhấn “Tạo phòng”.
4. Hệ thống tạo mã PIN.
5. Host chiếu mã PIN lên màn hình.
6. Người chơi tham gia phòng.
7. Host xem danh sách người tham gia.
8. Host nhấn “Bắt đầu trò chơi”.
9. Hệ thống hiển thị lần lượt từng câu hỏi.
10. Host chuyển sang câu hỏi tiếp theo.
11. Sau câu cuối, hệ thống hiển thị Top 5.

## 9. Luồng Player

1. Player mở website.
2. Player nhập mã PIN.
3. Player nhập nickname.
4. Player tham gia phòng chờ.
5. Player đợi Host bắt đầu.
6. Player xem câu hỏi.
7. Player chọn một đáp án.
8. Hệ thống khóa các đáp án sau khi gửi.
9. Player xem số điểm nhận được.
10. Player tiếp tục với câu hỏi tiếp theo.
11. Player xem kết quả cuối cùng.

## 10. Quản lý bộ câu hỏi

Mỗi bộ câu hỏi gồm:

- Tên bộ câu hỏi.
- Mô tả ngắn.
- Trạng thái hoạt động.
- Danh sách câu hỏi.
- Ngày tạo.
- Ngày cập nhật.

Các trạng thái:

- Đang soạn.
- Đang hoạt động.
- Đã tắt.

Host chỉ được sử dụng bộ câu hỏi đang hoạt động.

## 11. Cấu trúc câu hỏi

Mỗi câu hỏi gồm:

- Nội dung câu hỏi.
- Từ hai đến bốn đáp án.
- Một đáp án đúng.
- Thời gian trả lời.
- Điểm cơ bản.
- Thứ tự hiển thị.

Các mức thời gian:

- 10 giây.
- 15 giây.
- 20 giây.
- 30 giây.

Điểm cơ bản đề xuất:

- 1.000 điểm.

## 12. Quy định tham gia phòng

- Mỗi phòng hỗ trợ tối đa 60 người chơi.
- Người chơi thứ 60 được phép tham gia.
- Người chơi thứ 61 bị từ chối.
- Không nhận thêm người chơi sau khi game đã bắt đầu.
- Nickname không được để trống.
- Nickname tối đa 30 ký tự.
- Khoảng trắng đầu và cuối nickname phải được xóa.
- Không cho phép nickname trùng trong cùng một phòng.

Thông báo khi phòng đầy:

> Phòng chơi đã đủ 60 người. Vui lòng liên hệ người tổ chức.

Thông báo khi nickname trùng:

> Tên người chơi này đã được sử dụng. Vui lòng chọn tên khác.

## 13. Quy định trả lời

- Mỗi Player chỉ được trả lời một lần cho mỗi câu.
- Không cho phép thay đổi đáp án sau khi đã gửi.
- Không nhận đáp án sau khi hết thời gian.
- Sau khi chọn đáp án, các nút phải bị khóa.
- Không cho phép gửi nhiều lần khi chạm liên tục.
- Không hiển thị đáp án đúng trước khi câu hỏi kết thúc.
- Điểm không được lấy trực tiếp từ dữ liệu do client gửi lên.

## 14. Cách tính điểm

- Trả lời sai: 0 điểm.
- Trả lời đúng: từ 500 đến 1.000 điểm.
- Người trả lời nhanh hơn nhận nhiều điểm hơn.
- Tổng điểm là tổng điểm của tất cả câu hỏi.

Công thức đơn giản:

`Điểm = 500 + điểm thưởng tốc độ`

Trong đó:

- Điểm thưởng tốc độ từ 0 đến 500 điểm.
- Trả lời ngay đầu thời gian có thể nhận gần 1.000 điểm.
- Trả lời gần hết thời gian có thể nhận gần 500 điểm.

## 15. Bảng xếp hạng

Sau mỗi câu hỏi:

- Sắp xếp người chơi theo tổng điểm giảm dần.
- Hiển thị tối đa năm người đang dẫn đầu.
- Hiển thị nickname và tổng điểm.
- Player có thể xem điểm và thứ hạng cá nhân.

Nếu hai Player bằng điểm:

- Người có tổng thời gian trả lời đúng thấp hơn đứng trên.
- Nếu vẫn bằng nhau, ưu tiên người gửi đáp án cuối cùng sớm hơn.

## 16. Kết quả Top 5

Sau câu hỏi cuối:

1. Hệ thống chuyển trạng thái game thành `finished`.
2. Lấy toàn bộ Player trong phòng.
3. Sắp xếp theo tổng điểm giảm dần.
4. Áp dụng tiêu chí phụ nếu bằng điểm.
5. Lấy tối đa năm Player đầu tiên.
6. Hiển thị kết quả trên màn hình Host và Player.

Nếu game có dưới năm Player, hiển thị tất cả Player.

Nội dung màn hình:

> Chúc mừng những người chơi xuất sắc nhất!

- 🥇 Hạng 1
- 🥈 Hạng 2
- 🥉 Hạng 3
- 🏅 Hạng 4
- 🏅 Hạng 5

Mỗi vị trí hiển thị:

- Thứ hạng.
- Nickname.
- Tổng điểm.

Dòng kết thúc:

> Cảm ơn tất cả mọi người đã tham gia!

Các nút:

- Chơi lại.
- Về trang chủ.

## 17. Yêu cầu thiết bị

### Điện thoại

- Hỗ trợ màn hình từ 360px.
- Đáp án hiển thị một cột.
- Nút bấm cao tối thiểu 56px.
- Không có thanh cuộn ngang.
- Nội dung câu hỏi tự xuống dòng.
- Có thể thao tác bằng một tay.

### iPad và tablet

- Hỗ trợ chiều dọc và chiều ngang.
- Đáp án có thể hiển thị hai cột.
- Giao diện tự điều chỉnh khi xoay màn hình.

### Laptop và desktop

- Nội dung được căn giữa.
- Không kéo giãn nội dung quá rộng.
- Hỗ trợ thao tác bằng chuột.
- Giao diện Host phù hợp để trình chiếu.

## 18. Trình duyệt hỗ trợ

- Google Chrome.
- Safari.
- Microsoft Edge.
- Trình duyệt mặc định trên Android.
- Trình duyệt mặc định trên iPhone và iPad.

## 19. Yêu cầu quản lý kết nối

- Khi mất mạng, hiển thị thông báo mất kết nối.
- Khi kết nối lại, tải trạng thái game mới nhất.
- Không gửi lại đáp án nếu đáp án đã được ghi nhận.
- Không tạo Player mới khi người chơi tải lại trang.
- Host không được vô tình kết thúc game nhiều lần.

## 20. Tiêu chí nghiệm thu

Sản phẩm được xem là hoàn thành khi:

1. Admin đăng nhập được.
2. Người chưa đăng nhập không vào được `/admin`.
3. Admin tạo được bộ câu hỏi.
4. Admin thêm, sửa và xóa được câu hỏi.
5. Admin thay đổi được thứ tự câu hỏi.
6. Host chọn được bộ câu hỏi.
7. Host tạo được phòng.
8. Player tham gia được bằng PIN và nickname.
9. Người chơi thứ 60 tham gia được.
10. Người chơi thứ 61 bị từ chối.
11. Không cho phép nickname trùng.
12. Không cho phép trả lời hai lần.
13. Không nhận đáp án sau khi hết giờ.
14. Điểm được tính chính xác.
15. Bảng xếp hạng được sắp xếp chính xác.
16. Top 5 hiển thị đúng.
17. Game dưới năm người vẫn hiển thị đúng kết quả.
18. Player sử dụng được trên điện thoại, iPad và laptop.
19. Host sử dụng được trên laptop và màn hình trình chiếu.
20. `npm run lint` thành công.
21. `npm run build` thành công.
