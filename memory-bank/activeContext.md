# Active Context - KMA.SmartHome

## Trạng thái hiện tại
- Dự án đang trong giai đoạn khởi tạo
- Đang thiết lập cơ sở hạ tầng và kiến trúc cơ bản
- Memory Bank đang được xây dựng
- Đã chuyển đổi stack backend sang .NET Core

## Các quyết định gần đây
1. Lựa chọn stack công nghệ:
   - Frontend: React.js với TypeScript
   - Backend: .NET Core 7+ với ASP.NET Core
   - Database: MongoDB
   - IoT Protocol: MQTT

2. Kiến trúc hệ thống:
   - Clean Architecture
   - CQRS Pattern
   - Event-driven architecture
   - Message broker cho IoT communication

## Công việc đang thực hiện
1. Thiết lập môi trường phát triển .NET Core
2. Xây dựng cấu trúc dự án theo Clean Architecture
3. Tạo tài liệu kỹ thuật
4. Thiết lập CI/CD pipeline

## Các vấn đề đang xem xét
- Chiến lược triển khai IoT với .NET Core
- Quản lý phiên bản API
- Chiến lược testing với xUnit
- Monitoring và logging

## Kế hoạch tiếp theo
1. Thiết lập cơ sở dữ liệu
2. Xây dựng API cơ bản với ASP.NET Core
3. Phát triển giao diện người dùng
4. Tích hợp với thiết bị IoT

## Rủi ro và thách thức
- Bảo mật thiết bị IoT
- Khả năng mở rộng hệ thống
- Độ trễ trong giao tiếp real-time
- Tương thích với nhiều loại thiết bị

## Các cuộc họp sắp tới
- Planning meeting
- Technical review
- Architecture discussion
- Security review 