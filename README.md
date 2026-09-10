# Gym Progress — Workout Program & Strength Progression Tracker

> Ứng dụng quản lý chương trình tập gym và theo dõi tiến độ thể hình đỉnh cao, chuẩn Mobile-First, Dark Mode OLED, hoạt động Offline-First.

![Gym Progress App](https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80)

---

## ⚡ Tính Năng Nổi Bật

### 1. Onboarding Cá Nhân Hóa (Section 1)
- Thiết lập thông số thể chất: Giới tính, Tuổi, Chiều cao, Cân nặng, Đơn vị (kg/lb).
- Chọn mục tiêu: *Tăng cơ (Hypertrophy)*, *Tăng sức mạnh (Strength)*, *Giảm mỡ (Fat Loss)*, *Duy trì*.
- Trình độ (Beginner, Intermediate, Advanced) và số ngày tập/tuần (2 - 6 ngày).
- Hỗ trợ bỏ qua nhanh các bước không bắt buộc.

### 2. Dashboard Thông Minh (Section 2)
- **Today's Workout**: Tự động nhận diện buổi tập hôm nay dựa theo lịch trình với danh sách bài tập preview và nút bấm lớn `[ START WORKOUT ]`.
- Chuỗi ngày tập liên tiếp (**Streak 🔥**), Tổng số buổi tập, Tổng khối lượng tạ tích lũy (**Volume**).
- Khung Kỷ lục cá nhân (**PR Carousel**) và thanh theo dõi tần suất tuần (**Weekly Consistency**).

### 3. Giáo Án & Custom Program Builder (Section 3 & 4)
- Có sẵn 3 chương trình mẫu chuẩn thể hình:
  1. **Push / Pull / Legs (PPL)** — 6 ngày/tuần
  2. **Upper / Lower** — 4 ngày/tuần
  3. **Full Body** — 3 ngày/tuần
- **Custom Program Builder**: Tự tạo giáo án mới, nhân bản (duplicate), đổi tên, xóa, tùy chỉnh số hiệp (sets), rep range (ví dụ `8-12`), thời gian nghỉ (rest seconds), ghi chú kỹ thuật và sắp xếp thứ tự bài tập.

### 4. Thư Viện 55+ Bài Tập Chuẩn Khoa Học (Section 5 & 6 & 17)
- Phân loại rõ ràng: **Chest, Back, Shoulders, Legs, Biceps, Triceps, Core, Calves**.
- Hệ thống hình ảnh minh họa trừu tượng (**ExerciseImage Abstraction**) với Fallback SVG giải phẫu cơ bắp khi ngoại tuyến.
- Bộ lọc đa chiều: Theo nhóm cơ, dụng cụ (Barbell, Dumbbell, Cable, Machine, Bodyweight) và độ khó.
- Hướng dẫn kỹ thuật từng bước, mẹo cảm nhận cơ (**Pro Tips**), các lỗi sai cần tránh (**Common Mistakes**).
- Hỗ trợ tự tạo bài tập riêng (**User Custom Exercises**).

### 5. Ghi Chép Buổi Tập Tốc Độ Cao (Quick Logging — Section 7 & 8)
- Giao diện tối ưu thao tác 1 tay trong phòng gym.
- Nút tăng giảm `+` / `-` bước nhảy tiện lợi (0.5kg, 2.5kg, 1 rep).
- Hiển thị **Ghost Previous Data** (kết quả buổi trước) để so sánh trực quan ngay tại hiệp tập.
- Bộ chọn **RPE** (Rate of Perceived Exertion từ 6 đến 10) để đo lường độ gắng sức.
- Phân loại hiệp: *Hiệp chính (Regular)*, *Khởi động (Warmup)*, *Drop Set*, *Tới hạn (Failure)*.
- Tự động kích hoạt **Rest Timer** ngay khi bấm hoàn thành hiệp.

### 6. Đồng Hồ Nghỉ Thông Minh & Âm Thanh Web Audio (Section 7)
- Thanh Rest Timer nổi với nút tăng `+30s`, `+60s`, hoặc bỏ qua.
- Bộ phát âm thanh tổng hợp **Web Audio API** đếm ngược 3-2-1 beep và chuông hoàn thành gong (không cần tải file mp3).
- Rung phản hồi (**Haptic Vibration**).

### 7. Tự Động Phát Hiện Kỷ Lục Cá Nhân (PR Engine — Section 10)
- Tự động tính toán **Estimated 1RM** theo công thức Brzycki & Epley:
  $$\text{e1RM} = \text{Weight} \times \left(1 + \frac{\text{Reps}}{30}\right)$$
- Phát hiện tức thì khi người dùng phá kỷ lục: Mức tạ cao nhất, Số reps cao nhất, hoặc e1RM mới.
- Bắn pháo hoa Confetti 🏆 và bảng vinh danh kỷ lục.

### 8. Đề Xuất Tăng Tiến Khối Lượng (Progressive Overload — Section 11)
- Phân tích hiệu suất buổi tập hôm nay so với quá khứ.
- Đưa ra đề xuất cụ thể: *"Tăng tạ lên +2.5kg buổi tới"* hoặc *"Duy trì mức tạ và cố gắng thêm 1-2 reps"*.
- Chỉ gợi ý thông minh, **KHÔNG tự ý can thiệp** giáo án nếu chưa có sự xác nhận của người dùng.

### 9. Biểu Đồ Tiến Bộ & Bảng Vàng (Progress Tracking — Section 9 & 13)
- Biểu đồ biến thiên tương tác: **Total Volume**, **Body Weight**, và **Exercise 1RM** (Bench Press, Squat, Deadlift...).
- Khung thời gian linh hoạt: `7 Days`, `30 Days`, `90 Days`, `6 Months`, `1 Year`, `All Time`.
- Bảng vàng Kỷ lục cá nhân (PR Wall of Fame).

### 10. Số Đo Cơ Thể & Album Ảnh Lột Xác (Body Measurements — Section 14)
- Ghi chép cân nặng, % mỡ, số đo vòng Ngực, Eo, Bắp tay, Đùi theo ngày.
- Kho lưu trữ ảnh tiến độ (**Progress Photo Vault**) theo 3 góc chụp: *Front*, *Side*, *Back*.

### 11. Lịch Trình & Ngày Nghỉ Phục Hồi (Calendar — Section 15 & 16)
- Lịch tháng với 4 trạng thái trực quan: Đã tập (✓ Xanh), Nghỉ ngơi (○ Xanh dương), Dự kiến (⏳ Vàng), Bỏ lỡ (✕ Đỏ).

### 12. Offline-First & Crash Recovery (Section 19 & 26)
- Lưu trữ cục bộ an toàn, tự động lưu sau mỗi thao tác (Autosave).
- **Crash Protection**: Nếu vô tình tắt trình duyệt hoặc tải lại trang giữa buổi tập, trạng thái buổi tập và đồng hồ thời gian sẽ được khôi phục 100%.
- Hỗ trợ Xuất/Nhập file sao lưu toàn diện định dạng JSON.
- Đầy đủ file schema PostgreSQL / Supabase Migration tại `supabase/schema.sql`.

---

## 🚀 Hướng Dẫn Chạy Cục Bộ (Local Dev)

1. Mở terminal tại thư mục dự án:
```bash
npm install
```

2. Khởi chạy development server:
```bash
npm run dev
```
Trình duyệt sẽ mở tại địa chỉ `http://localhost:5173`.

3. Kiểm tra bản build production:
```bash
npm run build
npm run preview
```

---

## 📱 Chuyển Đổi Sang React Native / Mobile App
Xem hướng dẫn chi tiết từng bước tạo dự án Expo, build file `.apk` Android và `.ipa` iOS tại file [`MOBILE_SETUP.md`](file:///c:/Users/leduc/Documents/Gymer/MOBILE_SETUP.md).

---

## 🗄️ Cấu Trúc Cơ Sở Dữ Liệu (Database Schema)
Schema chuẩn PostgreSQL với đầy đủ Row-Level Security (RLS) policies được cung cấp tại [`supabase/schema.sql`](file:///c:/Users/leduc/Documents/Gymer/supabase/schema.sql).
