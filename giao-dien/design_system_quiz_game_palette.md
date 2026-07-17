# DESIGN SYSTEM – INTERNAL QUIZ GAME

## 1. Tổng quan

Tài liệu này định nghĩa định hướng thiết kế giao diện cho **Internal Quiz Game** dựa trên bộ màu:

| Tên màu | Mã HEX | Vai trò chính |
|---|---:|---|
| Forest Green | `#386641` | Màu thương hiệu, điều hướng, tiêu đề, nút chính |
| Vivid Orange | `#F97A00` | Hành động nổi bật, trạng thái đang chơi, CTA |
| Warm Yellow | `#FED16A` | Điểm nhấn, bảng xếp hạng, cảnh báo nhẹ |
| Soft Cream | `#FFF4A4` | Nền phụ, vùng nội dung nhẹ, trạng thái chờ |

Phong cách tổng thể:

- Hiện đại.
- Tối giản.
- Chuyên nghiệp.
- Năng động nhưng không trẻ con.
- Tối ưu cho điện thoại, iPad, laptop và màn hình trình chiếu.
- Dễ đọc, dễ thao tác và phản hồi nhanh.

---

## 2. Triết lý thiết kế

### 2.1. Rõ ràng trước trang trí

Mỗi màn hình chỉ nên có một hành động chính:

- Nhập mã phòng.
- Nhập nickname.
- Chọn đáp án.
- Bắt đầu game.
- Chuyển câu hỏi.
- Thêm hoặc chỉnh sửa câu hỏi.

Không đặt quá nhiều nút có mức độ ưu tiên ngang nhau trên cùng một màn hình.

### 2.2. Tối ưu tốc độ thao tác

- Người chơi cần hiểu màn hình trong vòng 1–2 giây.
- Nút đáp án phải lớn và dễ chạm.
- Trạng thái đã chọn, đang tải, mất kết nối và hết thời gian phải rõ ràng.
- Hạn chế modal không cần thiết.
- Không sử dụng animation dài.

### 2.3. Chuyên nghiệp nhưng vẫn có năng lượng

- Forest Green tạo cảm giác tin cậy và chuyên nghiệp.
- Vivid Orange tạo năng lượng cho hành động chính.
- Warm Yellow dùng để nhấn mạnh điểm số, thành tích và khoảnh khắc chiến thắng.
- Soft Cream tạo không gian ấm áp, dễ chịu và giảm cảm giác khô cứng.

---

## 3. Color System

## 3.1. Màu thương hiệu chính

### Forest Green — `#386641`

Sử dụng cho:

- Logo hoặc vùng nhận diện.
- Header.
- Sidebar Admin.
- Tiêu đề lớn.
- Nút chính trong Admin.
- Thanh tiến trình.
- Khung điểm số.
- Nền màn hình Host khi cần độ tương phản cao.

Không nên dùng cho:

- Toàn bộ nền Player trong thời gian dài.
- Nội dung chữ nhỏ trên nền tối nếu độ tương phản không đủ.

### Vivid Orange — `#F97A00`

Sử dụng cho:

- Nút “Tham gia”.
- Nút “Bắt đầu trò chơi”.
- Nút “Câu tiếp theo”.
- Countdown ở những giây cuối.
- Trạng thái đang hoạt động.
- Điểm nhấn quan trọng.
- Hành động cần người dùng chú ý.

Không nên dùng cho:

- Văn bản dài.
- Background toàn trang.
- Quá nhiều nút trên cùng một màn hình.

### Warm Yellow — `#FED16A`

Sử dụng cho:

- Điểm số.
- Vị trí xếp hạng.
- Card Top 5.
- Trạng thái cảnh báo nhẹ.
- Badge.
- Highlight đáp án hoặc dữ liệu quan trọng.
- Nền phụ trong bảng xếp hạng.

### Soft Cream — `#FFF4A4`

Sử dụng cho:

- Nền card nhẹ.
- Empty state.
- Phòng chờ.
- Khu vực hướng dẫn.
- Background phụ trong Admin.
- Vùng chúc mừng.

Không sử dụng Soft Cream làm màu chữ chính.

---

## 3.2. Màu trung tính bổ sung

Để giao diện chuyên nghiệp và dễ đọc, sử dụng thêm nhóm màu trung tính:

| Token | Giá trị đề xuất | Mục đích |
|---|---:|---|
| White | `#FFFFFF` | Nền chính, card |
| Gray 50 | `#F8FAF8` | Nền ứng dụng |
| Gray 100 | `#EEF2EE` | Border nhẹ, vùng phân cách |
| Gray 300 | `#CBD5CB` | Border input |
| Gray 600 | `#526052` | Văn bản phụ |
| Gray 800 | `#273027` | Văn bản chính |
| Black | `#121612` | Tiêu đề có độ tương phản cao |

---

## 3.3. Màu trạng thái

| Trạng thái | Màu đề xuất |
|---|---:|
| Thành công | `#2E7D32` |
| Lỗi | `#D92D20` |
| Cảnh báo | `#F97A00` |
| Thông tin | `#386641` |
| Disabled background | `#E7ECE7` |
| Disabled text | `#8A958A` |

Màu không được là tín hiệu duy nhất. Luôn kết hợp với:

- Icon.
- Nội dung văn bản.
- Border.
- Nhãn trạng thái.

---

## 4. Quy tắc phối màu

### Tỷ lệ sử dụng đề xuất

- 60%: Trắng và xám rất nhạt.
- 20%: Forest Green.
- 10%: Soft Cream.
- 7%: Vivid Orange.
- 3%: Warm Yellow.

### Nguyên tắc

- Mỗi màn hình chỉ nên có một màu hành động chính.
- Orange chỉ dùng để thu hút sự chú ý vào CTA quan trọng.
- Green được dùng để tạo cấu trúc và cảm giác đáng tin cậy.
- Yellow dùng cho thành tích, điểm số và khoảnh khắc chúc mừng.
- Không sử dụng cả bốn màu với cường độ cao trong cùng một vùng nhỏ.

---

## 5. Design Tokens

```css
:root {
  --color-primary: #386641;
  --color-primary-hover: #2F5637;
  --color-primary-active: #26462D;

  --color-accent: #F97A00;
  --color-accent-hover: #DF6D00;
  --color-accent-active: #C86000;

  --color-highlight: #FED16A;
  --color-highlight-soft: #FFF4A4;

  --color-background: #F8FAF8;
  --color-surface: #FFFFFF;
  --color-surface-soft: #FFFBE8;

  --color-text-primary: #273027;
  --color-text-secondary: #526052;
  --color-border: #D8E0D8;

  --color-success: #2E7D32;
  --color-error: #D92D20;
  --color-warning: #F97A00;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-sm: 0 1px 2px rgba(20, 40, 24, 0.06);
  --shadow-md: 0 8px 24px rgba(20, 40, 24, 0.10);
  --shadow-lg: 0 16px 40px rgba(20, 40, 24, 0.14);
}
```

### Tailwind gợi ý

```js
colors: {
  brand: {
    green: "#386641",
    orange: "#F97A00",
    yellow: "#FED16A",
    cream: "#FFF4A4",
  }
}
```

---

## 6. Typography

### Font đề xuất

Ưu tiên:

1. `Be Vietnam Pro`
2. `Inter`
3. `Arial`
4. `sans-serif`

### Cỡ chữ

| Thành phần | Mobile | Desktop/Host |
|---|---:|---:|
| H1 | 30–36px | 44–60px |
| H2 | 24–28px | 32–40px |
| H3 | 20–24px | 24–30px |
| Body | 16px | 16–18px |
| Button | 16–18px | 17–20px |
| PIN phòng | 48–60px | 72–96px |
| Câu hỏi | 24–30px | 36–52px |
| Điểm số | 24–32px | 32–48px |

### Quy tắc typography

- Font weight tiêu đề: 600–700.
- Font weight nội dung: 400–500.
- Không dùng quá ba mức font weight trên một màn hình.
- Line-height nội dung: 1.5–1.7.
- Không dùng chữ in hoa cho đoạn dài.
- PIN và điểm số có thể dùng font weight 700–800.

---

## 7. Spacing và Layout

Sử dụng hệ thống khoảng cách theo bội số 4:

- `4px`
- `8px`
- `12px`
- `16px`
- `24px`
- `32px`
- `48px`
- `64px`

### Container

| Thiết bị | Chiều rộng nội dung |
|---|---:|
| Mobile | 100% trừ padding 16px |
| Tablet | Tối đa 720px |
| Admin desktop | Tối đa 1280px |
| Host projector | Tối đa 1440px |

### Border radius

- Input: 12px.
- Button: 12px.
- Card: 16px.
- Modal: 20px.
- Khu vực chúc mừng: 24px.

### Shadow

- Card thường: shadow nhẹ.
- Modal: shadow trung bình.
- Top 1 hoặc card thành tích: shadow nổi bật hơn.
- Không dùng shadow quá đậm hoặc quá nhiều lớp.

---

## 8. Button System

## 8.1. Primary Button

Sử dụng cho hành động chính trong Admin hoặc điều hướng quan trọng.

- Background: `#386641`
- Text: `#FFFFFF`
- Hover: `#2F5637`
- Border radius: 12px
- Chiều cao: 48–56px

Ví dụ:

- Lưu bộ câu hỏi.
- Đăng nhập.
- Tạo bộ câu hỏi.

## 8.2. Accent Button

Sử dụng cho hành động trong game cần chú ý cao.

- Background: `#F97A00`
- Text: `#FFFFFF`
- Hover: `#DF6D00`
- Chiều cao: 52–60px

Ví dụ:

- Tham gia.
- Bắt đầu trò chơi.
- Câu tiếp theo.

## 8.3. Secondary Button

- Background: `#FFFFFF`
- Text: `#386641`
- Border: `1px solid #386641`

Ví dụ:

- Hủy.
- Quay lại.
- Xem trước.

## 8.4. Danger Button

- Background: `#FFFFFF`
- Text: `#D92D20`
- Border: `1px solid #D92D20`

Chỉ sử dụng cho:

- Xóa câu hỏi.
- Xóa bộ câu hỏi.
- Hủy phòng.

---

## 9. Input và Form

### Input mặc định

- Background: trắng.
- Border: `#CBD5CB`.
- Text: `#273027`.
- Border radius: 12px.
- Chiều cao tối thiểu: 48px.
- Focus border: `#386641`.
- Focus ring: green opacity 15%.

### Input mã PIN

- Font size: 28–36px.
- Text align: center.
- Letter spacing: 6–10px.
- Sử dụng bàn phím số trên mobile.
- Chỉ cho phép ký tự số.

### Validation

Lỗi hiển thị bằng:

- Border đỏ.
- Icon lỗi.
- Nội dung lỗi rõ ràng.
- Không chỉ thay đổi màu.

Ví dụ:

> Vui lòng nhập nội dung câu hỏi.

---

## 10. Card System

### Quiz Card

- Background: trắng.
- Border: xám nhạt.
- Top border hoặc badge màu `#386641`.
- Status active dùng green.
- Nút hành động chính dùng green hoặc orange tùy ngữ cảnh.

### Player Card

- Background: trắng.
- Avatar ký tự đầu có nền Soft Cream.
- Nickname màu `#273027`.
- Trạng thái online dùng icon xanh.

### Score Card

- Background: `#FFF4A4`.
- Điểm số màu `#386641`.
- Badge tăng hạng dùng `#F97A00`.

### Top 1 Card

- Background: gradient nhẹ từ `#FED16A` đến `#FFF4A4`.
- Border: `#F97A00`.
- Điểm số: `#386641`.
- Có biểu tượng huy chương.

Không dùng gradient mạnh cho các màn hình thông thường.

---

## 11. Player UI

## 11.1. Trang nhập mã phòng

### Bố cục

- Nền chính: `#F8FAF8`.
- Card trung tâm: trắng.
- Logo hoặc vùng nhận diện: Forest Green.
- Nút “Tham gia”: Orange.
- Helper text: Gray 600.

### Ưu tiên

- Chỉ một input và một CTA.
- Người dùng hiểu ngay thao tác.
- Không thêm menu hoặc nội dung không cần thiết.

## 11.2. Trang nhập nickname

- Input trắng.
- Nút “Vào phòng” màu Orange.
- Nút quay lại dạng secondary.
- Lỗi nickname trùng hiển thị trực tiếp dưới input.

## 11.3. Phòng chờ

- Background: Soft Cream với độ sáng nhẹ.
- Card trạng thái: trắng.
- Icon chờ: Orange.
- Mã PIN: Green.
- Player count: badge Yellow.

## 11.4. Màn hình câu hỏi

- Background: trắng hoặc xám rất nhạt.
- Header nhỏ màu Green.
- Countdown:
  - Bình thường: Green.
  - Còn dưới 5 giây: Orange.
  - Còn dưới 2 giây: Red.
- Nội dung câu hỏi: Gray 800.
- Các lựa chọn đáp án: card lớn, dễ bấm.

### Màu đáp án

Để giữ phong cách chuyên nghiệp, không dùng bốn màu neon.

Gợi ý:

1. Green: `#386641`
2. Orange: `#F97A00`
3. Yellow: `#FED16A`, text tối
4. Cream: `#FFF4A4`, border Green, text tối

Mỗi đáp án phải có thêm nhãn:

- A
- B
- C
- D

## 11.5. Trạng thái đã gửi

- Icon xác nhận màu Green.
- Dòng chính: “Đã ghi nhận câu trả lời”.
- Background card: Soft Cream.
- Không hiển thị đáp án đúng khi chưa hết thời gian.

## 11.6. Kết quả câu hỏi

### Đúng

- Icon success Green.
- Điểm thưởng Orange.
- Card nền trắng.
- Accent Yellow.

### Sai

- Icon lỗi Red.
- Đáp án đúng hiển thị trong card Soft Cream.
- Không dùng nền đỏ toàn màn hình.

---

## 12. Host UI

## 12.1. Màn hình chọn bộ câu hỏi

- Header Forest Green.
- Quiz cards nền trắng.
- Nút chọn dùng Green.
- Nút tạo phòng dùng Orange.
- Status badge dùng Yellow hoặc Green.

## 12.2. Lobby

- Background Forest Green.
- PIN màu White hoặc Yellow.
- QR code trên card trắng.
- Player count dùng Orange.
- Nickname hiển thị trong pill Soft Cream.
- Nút “Bắt đầu trò chơi” màu Orange.

Mục tiêu là PIN có thể nhìn rõ từ xa.

## 12.3. Màn hình câu hỏi

- Background trắng.
- Header Green.
- Countdown lớn.
- Đáp án có màu rõ nhưng không chói.
- Số người đã trả lời nằm trong badge Yellow.

## 12.4. Kết quả câu hỏi

- Đáp án đúng được nhấn bằng Green.
- Biểu đồ dùng Green, Orange, Yellow và xám.
- Top 5 tạm thời đặt trong card trắng.
- CTA “Câu tiếp theo” dùng Orange.

---

## 13. Admin UI

## 13.1. Sidebar

- Background: `#386641`.
- Text: trắng.
- Active item: `#FFF4A4`.
- Active text: `#273027`.
- Hover: green sáng hơn.

## 13.2. Header

- Background: trắng.
- Border bottom: xám nhạt.
- Tên trang: Gray 800.
- Nút “Tạo bộ câu hỏi”: Green.

## 13.3. Dashboard

- Background: `#F8FAF8`.
- Card: trắng.
- Status active: Green.
- Status draft: Yellow.
- Status inactive: Gray.

## 13.4. Question Editor

- Form được chia thành các section rõ ràng.
- Dùng card trắng.
- Đáp án đúng có border Green.
- Nút thêm đáp án dùng secondary.
- Nút lưu dùng Green.
- Nút xóa dùng danger outline.
- Không đặt quá nhiều control trong một hàng trên mobile.

---

## 14. Top 5 Final Screen

Đây là màn hình quan trọng nhất của trải nghiệm.

### Màu sắc

- Background chính: Forest Green.
- Tiêu đề: White.
- Accent: Orange.
- Card hạng 1: Warm Yellow.
- Card hạng 2–5: White hoặc Soft Cream.
- Điểm số: Green hoặc Orange tùy nền.

### Bố cục Host

- Hạng 1 ở trung tâm và cao nhất.
- Hạng 2 và 3 ở hai bên.
- Hạng 4 và 5 phía dưới.
- Tên người chơi lớn và dễ đọc từ xa.
- Confetti nhẹ, dùng Green, Orange và Yellow.
- Không che nội dung bằng hiệu ứng.

### Bố cục Player

- Danh sách dọc.
- Hạng 1 nổi bật.
- Hiển thị kết quả cá nhân bên dưới.
- Nút “Về trang chủ” màu Orange.

### Nội dung

> Chúc mừng những người chơi xuất sắc nhất!

> Cảm ơn tất cả mọi người đã tham gia!

---

## 15. Responsive Rules

### Mobile — từ 360px

- Padding ngang: 16px.
- Đáp án một cột.
- Nút cao tối thiểu 56px.
- Không có horizontal scroll.
- Font nội dung tối thiểu 16px.
- Bottom CTA có thể sticky nếu cần.

### Tablet — từ 768px

- Đáp án có thể hiển thị hai cột.
- Form Admin có thể chia hai cột.
- Hỗ trợ xoay dọc và ngang.
- Không cố định chiều cao gây cắt nội dung.

### Laptop — từ 1024px

- Host sử dụng layout rộng.
- Admin có sidebar.
- Nội dung chính giới hạn chiều rộng hợp lý.
- Không kéo card quá rộng.

### Desktop/Projector — từ 1440px

- PIN từ 72px trở lên.
- Câu hỏi từ 40px trở lên.
- Leaderboard đủ lớn để đọc từ xa.
- Khoảng trắng rộng hơn nhưng vẫn giữ nội dung tập trung.

---

## 16. Motion và Micro-interaction

### Cho phép

- Fade 150–250ms.
- Scale nhẹ khi chọn đáp án.
- Progress bar mượt.
- Confetti ngắn ở màn hình Top 5.
- Toast xuất hiện 2–4 giây.

### Không nên dùng

- Bounce liên tục.
- Animation quá 500ms cho thao tác thường xuyên.
- Chuyển cảnh 3D.
- Background chuyển động mạnh.
- Hiệu ứng âm thanh tự động nếu chưa được bật.

---

## 17. Accessibility

- Contrast chữ và nền tối thiểu theo WCAG AA.
- Không dùng màu là dấu hiệu duy nhất.
- Nút có focus state rõ ràng.
- Vùng chạm tối thiểu 44 × 44px.
- Nút đáp án ưu tiên cao tối thiểu 56px.
- Form có label rõ ràng.
- Icon quan trọng phải có text hoặc aria-label.
- Hỗ trợ điều hướng bằng bàn phím trên laptop.
- Countdown không được là thông tin duy nhất về thời gian; có cả số và thanh tiến trình.

---

## 18. Trạng thái hệ thống

### Loading

- Dùng skeleton hoặc spinner Green.
- Nội dung: “Đang tải…”

### Empty

- Background Soft Cream.
- Icon Green.
- CTA Orange hoặc Green.

### Error

- Icon Red.
- Message cụ thể.
- Nút thử lại dạng secondary hoặc primary.

### Offline

Banner trên cùng:

- Background: Orange.
- Text: White.
- Nội dung: “Mất kết nối. Đang thử kết nối lại…”

### Reconnected

Toast:

- Background: Green.
- Text: White.
- Nội dung: “Đã kết nối lại.”

---

## 19. Kích thước kiểm thử

- 360 × 800.
- 390 × 844.
- 768 × 1024.
- 1024 × 768.
- 1366 × 768.
- 1440 × 900.
- 1920 × 1080.

---

## 20. Tiêu chí hoàn thành thiết kế

Thiết kế đạt yêu cầu khi:

1. Toàn bộ giao diện sử dụng nhất quán bộ màu.
2. Orange chỉ được dùng để nhấn mạnh hành động quan trọng.
3. Green tạo cấu trúc và nhận diện chính.
4. Yellow và Cream hỗ trợ thành tích, trạng thái chờ và vùng nhấn.
5. Không có thanh cuộn ngang trên mobile.
6. Nút đáp án dễ sử dụng bằng cảm ứng.
7. Màn hình Host đọc được từ xa.
8. Admin dễ thêm và chỉnh sửa câu hỏi.
9. Hạng 1 nổi bật rõ ràng.
10. Giao diện hiện đại nhưng không quá nhiều hiệu ứng.
11. Toàn bộ trạng thái loading, error, empty và offline đều được thiết kế.
12. Player sử dụng tốt trên điện thoại, iPad và laptop.
13. Host sử dụng tốt trên laptop và màn hình trình chiếu.
14. Admin sử dụng tốt trên laptop và iPad.

---

## 21. Prompt ngắn dùng cho công cụ tạo UI

```text
Design a modern, optimized and professional responsive internal quiz web app using this exact color palette:

- Forest Green: #386641
- Vivid Orange: #F97A00
- Warm Yellow: #FED16A
- Soft Cream: #FFF4A4

Use Forest Green as the main brand and navigation color, Orange for important calls to action, Yellow for scores and achievements, and Cream for soft backgrounds and waiting states.

The visual style must be clean, minimal, energetic and suitable for a professional company event. Avoid childish graphics, heavy gradients, excessive colors and crowded layouts.

Create responsive UI for:
1. Player App on mobile, iPad and laptop.
2. Host Console on laptop and projector.
3. Admin Portal on laptop and iPad.
4. Final Top 5 celebration screen.

Use large touch-friendly buttons, rounded cards, subtle shadows, high contrast typography, Vietnamese content and consistent spacing. Rank 1 should be visually dominant on the final Top 5 screen.
```
