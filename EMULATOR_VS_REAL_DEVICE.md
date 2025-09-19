# Emulator vs Real Device Handling

## 🎯 **Vấn Đề Đã Xác Định**

Bạn đã đúng! Lỗi "scheme does not have a registered handler" chủ yếu xảy ra trên:

### **🖥️ Desktop/Emulator:**
- ❌ Không có app iDrama → `idrama://` scheme không có handler
- ❌ Không có Google Play Store → `market://` scheme không có handler
- ❌ Browser không hỗ trợ mobile-specific schemes

### **📱 Thiết Bị Thật:**
- ✅ Có Google Play Store → `market://` sẽ hoạt động
- ✅ Nếu app iDrama đã cài → `idrama://` sẽ mở app
- ✅ Nếu app chưa cài → `market://` sẽ mở Play Store

## 🛠️ **Giải Pháp Đã Implement**

### **1. Platform Detection Cải Tiến**
```typescript
export interface PlatformInfo {
  isAndroid: boolean;
  isIOS: boolean;
  isDesktop: boolean;
  isEmulator: boolean;      // NEW: Detect emulator
  isRealDevice: boolean;    // NEW: Detect real device
  userAgent: string;
}
```

### **2. Logic Xử Lý Khác Nhau**

#### **Trên Thiết Bị Thật (Real Device):**
```typescript
if (platform.isRealDevice) {
  // Try deeplink first
  // Try market:// URL first
  // Fallback to intent URL
  // Final fallback to web URL
}
```

#### **Trên Emulator/Desktop:**
```typescript
else {
  // Skip deeplink (will fail anyway)
  // Skip market:// URL (will fail anyway)
  // Go directly to web URL
}
```

### **3. Flow Mới**

#### **Android Real Device:**
```
Click → Try idrama:// deeplink (2s) → Try market:// → Try intent:// → Web URL
```

#### **Android Emulator/Desktop:**
```
Click → Skip deeplink → Skip market:// → Go directly to Web URL
```

#### **iOS Real Device:**
```
Click → Try idrama:// deeplink (2s) → App Store URL
```

#### **iOS Emulator/Desktop:**
```
Click → Skip deeplink → App Store URL
```

## 🧪 **Cách Test**

### **Trên Desktop:**
- Mở browser console
- Click button
- Sẽ thấy log: "Running on emulator/desktop, skipping deeplink"
- Sẽ redirect trực tiếp đến Play Store/App Store

### **Trên Thiết Bị Thật:**
- Click button
- Nếu app đã cài: Mở app
- Nếu app chưa cài: Mở Play Store/App Store
- Không có lỗi "scheme does not have a registered handler"

## ✅ **Kết Quả Mong Đợi**

- **Desktop/Emulator**: Không còn lỗi, redirect trực tiếp đến app store
- **Thiết Bị Thật**: Hoạt động bình thường như trước
- **User Experience**: Mượt mà trên mọi môi trường

## 🔍 **Debug Information**

Để debug, check console logs:
- `"Running on emulator/desktop, skipping deeplink"` - Đang chạy trên emulator
- `"market:// URL failed, trying intent URL"` - Đang chạy trên thiết bị thật nhưng market:// fail
- `"intent URL failed, using web URL"` - Cả market:// và intent:// đều fail

Giải pháp này đảm bảo:
1. **Không có lỗi** trên desktop/emulator
2. **Hoạt động tối ưu** trên thiết bị thật
3. **Fallback an toàn** trong mọi trường hợp
