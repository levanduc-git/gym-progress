# Hướng Dẫn Chuyển Đổi & Build Ứng Dụng Mobile (React Native + Expo)

Ứng dụng **Gym Progress** được kiến trúc theo chuẩn **Clean Component Architecture** và **Offline-First Repository Pattern**, cho phép chuyển đổi 1-1 sang **React Native (Expo)** để build ứng dụng iOS & Android (.apk / .ipa).

---

## 1. Khởi tạo dự án Expo với React Native & TypeScript

Chạy lệnh sau tại thư mục cha:

```bash
npx create-expo-app GymProgressMobile --template blank-typescript
cd GymProgressMobile
```

### Cài đặt các thư viện Native tương đương:
```bash
npx expo install expo-haptics expo-av @react-native-async-storage/async-storage lucide-react-native react-native-svg react-native-reanimated react-native-gesture-handler @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
npm install victory-native canvas-confetti
```

---

## 2. Ánh Xạ Kiến Trúc (Architecture Mapping)

| Thành phần Web (Hiện tại) | React Native (Expo) tương ứng |
|---|---|
| **Storage**: `localStorage` trong `src/db/storage.ts` | `@react-native-async-storage/async-storage` hoặc `expo-sqlite` |
| **Icons**: `lucide-react` | `lucide-react-native` |
| **Audio Rest Timer**: `Web Audio API` | `expo-av` hoặc `react-native-sound` |
| **Rung (Haptics)**: `navigator.vibrate` | `expo-haptics` (`Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)`) |
| **Layout Containers**: `div`, `header`, `nav` | `View`, `SafeAreaView`, `ScrollView`, `FlatList` |
| **Navigation**: `activeTab` state | `@react-navigation/bottom-tabs` |
| **Charts**: SVG Responsive Chart | `victory-native` hoặc `react-native-chart-kit` |
| **Confetti PR**: `canvas-confetti` | `react-native-confetti-cannon` |

---

## 3. Cách chạy Local trong môi trường Mobile

### Chạy với Expo Go (Xem ngay trên điện thoại thật):
```bash
npx expo start
```
- Mở ứng dụng **Expo Go** trên iPhone (quét camera) hoặc Android (quét QR code trong Expo Go).

### Chạy trên Android Emulator:
```bash
npx expo start --android
```

### Chạy trên iOS Simulator (yêu cầu macOS & Xcode):
```bash
npx expo start --ios
```

---

## 4. Build File Cài Đặt (APK Android & IPA iOS)

Sử dụng dịch vụ **EAS Build (Expo Application Services)**:

### Bước 1: Cài đặt EAS CLI & Đăng nhập
```bash
npm install -g eas-cli
eas login
```

### Bước 2: Khởi tạo cấu hình EAS
```bash
eas build:configure
```

### Bước 3: Build APK Android (để test hoặc cài trực tiếp):
```bash
eas build -p android --profile preview
```
> File `.apk` sẽ được build trên cloud và cung cấp link tải/quét QR trực tiếp về máy Android.

### Bước 4: Build cho Google Play Store (AAB) & Apple App Store (IPA):
```bash
# Build Android Play Store
eas build -p android --profile production

# Build iOS App Store
eas build -p ios --profile production
```

---

## 5. Kết nối Backend Supabase

1. Tạo dự án trên [Supabase.com](https://supabase.com).
2. Vào **SQL Editor**, dán toàn bộ nội dung file [`supabase/schema.sql`](file:///c:/Users/leduc/Documents/Gymer/supabase/schema.sql) và nhấn **Run**.
3. Lấy `SUPABASE_URL` và `SUPABASE_ANON_KEY` trong mục **Project Settings > API**.
4. Cài đặt `@supabase/supabase-js` và khởi tạo client:
```typescript
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```
