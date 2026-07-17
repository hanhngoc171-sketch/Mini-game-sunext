# DESIGN BRIEF – INTERNAL QUIZ GAME

## 1. Mục tiêu thiết kế

Thiết kế một web app trò chơi hỏi đáp nội bộ có cảm giác vui vẻ, hiện đại và dễ sử dụng.

Ứng dụng cần giúp người dùng hiểu ngay họ phải làm gì mà không cần đọc hướng dẫn dài.

Ba giao diện cần có phong cách thống nhất nhưng ưu tiên sử dụng khác nhau:

- Player: đơn giản, nút lớn, dùng tốt trên điện thoại.
- Host: rõ ràng, chữ lớn, phù hợp để trình chiếu.
- Admin: gọn gàng, dễ quản lý và chỉnh sửa câu hỏi.

## 2. Tính cách thương hiệu

Phong cách mong muốn:

- Trẻ trung.
- Năng động.
- Thân thiện.
- Chuyên nghiệp.
- Vui nhưng không trẻ con.
- Dễ sử dụng trong môi trường công ty.

Tránh:

- Quá nhiều hiệu ứng.
- Quá nhiều màu sắc cùng lúc.
- Giao diện giống game dành cho trẻ em.
- Font chữ khó đọc.
- Animation dài làm chậm trò chơi.
- Bố cục chứa quá nhiều thông tin.

## 3. Nguyên tắc thiết kế

### Đơn giản

Mỗi màn hình chỉ tập trung vào một hành động chính.

Ví dụ:

- Nhập PIN.
- Nhập nickname.
- Chọn đáp án.
- Bắt đầu game.
- Chuyển câu hỏi.
- Thêm câu hỏi.

### Dễ nhìn

- Dùng font sans-serif.
- Nội dung chính tối thiểu 16px.
- Tiêu đề câu hỏi lớn và rõ.
- Độ tương phản cao.
- Tránh chữ trên nền quá phức tạp.

### Dễ thao tác

- Nút đáp án cao tối thiểu 56px.
- Khoảng cách giữa các nút đủ lớn.
- Không phụ thuộc vào hover.
- Mọi nút đều dùng được bằng cảm ứng.
- Trạng thái đang tải và lỗi phải rõ ràng.

### Responsive

- Mobile-first cho Player.
- Tablet-friendly cho Player và Admin.
- Desktop-first cho Host.
- Không có thanh cuộn ngang.
- Hỗ trợ xoay dọc và xoay ngang trên iPad.

## 4. Hệ thống màu sắc

Sử dụng màu thương hiệu công ty nếu đã có.

Trong trường hợp chưa có màu chính thức, dùng cấu trúc:

- Primary: màu thương hiệu chính.
- Secondary: màu phụ.
- Background: trắng hoặc xám rất nhạt.
- Text: đen hoặc xám đậm.
- Success: xanh lá.
- Error: đỏ.
- Warning: vàng hoặc cam.

Bốn đáp án có thể dùng bốn màu riêng biệt, nhưng màu phải đủ tương phản và không quá chói.

Không sử dụng màu là tín hiệu duy nhất. Mỗi đáp án cần có thêm số, ký hiệu hoặc hình dạng.

## 5. Typography

Font đề xuất:

- Inter.
- Be Vietnam Pro.
- Arial hoặc sans-serif hệ thống làm fallback.

Kích thước đề xuất:

### Player

- Câu hỏi: 24–32px.
- Đáp án: 18–22px.
- Điểm: 20–28px.
- Thông báo: 16–18px.

### Host

- Tiêu đề màn hình: 36–56px.
- Câu hỏi: 32–48px.
- Mã PIN: 48–72px.
- Bảng xếp hạng: 24–36px.

### Admin

- Tiêu đề trang: 28–36px.
- Tiêu đề khu vực: 20–24px.
- Nội dung form: 16px.
- Nội dung bảng: 14–16px.

## 6. Giao diện Player

### Màn hình 1: Nhập mã phòng

Thành phần:

- Logo công ty.
- Tên trò chơi.
- Ô nhập mã PIN.
- Nút “Tham gia trò chơi”.
- Thông báo lỗi.

Yêu cầu:

- PIN dùng bàn phím số trên điện thoại.
- Nút tham gia nằm rõ ràng.
- Không có nội dung thừa.

### Màn hình 2: Nhập nickname

Thành phần:

- Tiêu đề “Nhập tên người chơi”.
- Ô nickname.
- Giới hạn 30 ký tự.
- Nút “Vào phòng”.
- Thông báo nickname trùng.

### Màn hình 3: Phòng chờ

Thành phần:

- Nickname của Player.
- Mã phòng.
- Trạng thái “Đang chờ người tổ chức”.
- Animation nhẹ.
- Số người đã tham gia nếu cần.

### Màn hình 4: Câu hỏi

Thành phần:

- Tiến độ câu hỏi, ví dụ “Câu 3/10”.
- Đồng hồ đếm ngược.
- Nội dung câu hỏi.
- Hai đến bốn nút đáp án.
- Trạng thái đã chọn.

Bố cục:

- Điện thoại: một cột.
- Tablet và laptop: hai cột khi có bốn đáp án.

### Màn hình 5: Đã gửi đáp án

Thành phần:

- Thông báo “Đã ghi nhận câu trả lời”.
- Không hiển thị đáp án đúng trước khi Host kết thúc câu.
- Khóa tất cả nút đáp án.
- Hiển thị trạng thái chờ.

### Màn hình 6: Kết quả câu hỏi

Thành phần:

- Đúng hoặc chưa chính xác.
- Điểm nhận được.
- Tổng điểm.
- Thứ hạng hiện tại.

### Màn hình 7: Top 5

Thành phần:

- Tiêu đề chúc mừng.
- Danh sách Top 5.
- Người hạng nhất nổi bật.
- Nickname và tổng điểm.
- Nội dung cảm ơn.
- Nút chơi lại.
- Nút về trang chủ.

## 7. Giao diện Host

### Màn hình chọn bộ câu hỏi

Thành phần:

- Danh sách bộ câu hỏi đang hoạt động.
- Tên bộ câu hỏi.
- Số lượng câu.
- Nút “Chọn”.
- Nút “Tạo phòng”.

### Màn hình phòng chờ

Thành phần:

- Logo.
- Mã PIN thật lớn.
- Hướng dẫn truy cập website.
- Danh sách nickname.
- Số người đã tham gia, ví dụ “42/60”.
- Nút “Bắt đầu trò chơi”.

### Màn hình câu hỏi

Thành phần:

- Số thứ tự câu hỏi.
- Nội dung câu hỏi.
- Các đáp án.
- Đồng hồ.
- Số người đã trả lời.
- Nút điều khiển.

### Màn hình kết quả câu hỏi

Thành phần:

- Đáp án đúng.
- Số lượng hoặc tỷ lệ chọn từng đáp án.
- Top 5 tạm thời.
- Nút “Câu tiếp theo”.

### Màn hình Top 5

Bố cục đề xuất:

- Hạng 1 ở trung tâm và lớn nhất.
- Hạng 2 và 3 ở hai bên.
- Hạng 4 và 5 ở hàng phía dưới.
- Có hiệu ứng confetti nhẹ.
- Không sử dụng animation quá dài.
- Hiển thị rõ nickname và điểm.

## 8. Giao diện Admin

### Trang đăng nhập

Thành phần:

- Logo.
- Email.
- Mật khẩu.
- Nút đăng nhập.
- Thông báo lỗi.

### Dashboard

Thành phần:

- Tiêu đề “Quản lý bộ câu hỏi”.
- Nút “Tạo bộ câu hỏi”.
- Danh sách các bộ câu hỏi.
- Trạng thái hoạt động.
- Số lượng câu hỏi.
- Nút sửa, nhân bản và tắt.

### Trang chỉnh sửa bộ câu hỏi

Bố cục:

- Phần thông tin bộ câu hỏi.
- Danh sách câu hỏi bên dưới.
- Nút thêm câu hỏi.
- Nút lưu.
- Nút xem trước.

### Form câu hỏi

Thành phần:

- Nội dung câu hỏi.
- Danh sách từ hai đến bốn đáp án.
- Radio button chọn đáp án đúng.
- Dropdown chọn thời gian.
- Ô nhập điểm.
- Nút lưu.
- Nút hủy.
- Nút xóa.

### Responsive Admin

- Laptop: hiển thị form rộng, danh sách rõ ràng.
- iPad: giao diện một hoặc hai cột tùy chiều màn hình.
- Điện thoại: hiển thị một cột, có thể chỉnh sửa nhưng không phải thiết bị ưu tiên.

## 9. Component cần thiết

- Button.
- Input.
- Select.
- Modal.
- Confirmation Dialog.
- Toast Notification.
- Loading Spinner.
- Empty State.
- Error State.
- Quiz Card.
- Question Editor.
- Answer Option.
- Game PIN.
- Player List.
- Countdown Timer.
- Leaderboard.
- Final Top Five.
- Connection Status.

## 10. Trạng thái giao diện

Mỗi trang cần có:

- Loading.
- Empty.
- Success.
- Error.
- Disabled.
- Offline.
- Reconnecting.

Ví dụ:

- “Đang tải bộ câu hỏi…”
- “Chưa có bộ câu hỏi nào.”
- “Đã lưu câu hỏi.”
- “Không thể kết nối. Vui lòng thử lại.”
- “Đang kết nối lại…”

## 11. Kích thước kiểm thử

Kiểm tra tối thiểu tại:

- 360 × 800.
- 390 × 844.
- 768 × 1024.
- 1024 × 768.
- 1366 × 768.
- 1920 × 1080.

## 12. Tiêu chí hoàn thành thiết kế

- Không có thanh cuộn ngang.
- Player trả lời được bằng cảm ứng.
- Giao diện hoạt động khi iPad xoay màn hình.
- Nút đáp án đủ lớn.
- Host đọc được nội dung trên màn hình trình chiếu.
- Admin thêm câu hỏi mà không cần hướng dẫn.
- Hạng nhất nổi bật rõ trong Top 5.
- Thông báo lỗi dễ hiểu.
- Giao diện không sử dụng quá nhiều hiệu ứng.
