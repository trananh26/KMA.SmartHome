# Technical Context - KMA.SmartHome

## Stack công nghệ

### Frontend
- React.js 18+
- TypeScript 5+
- Redux Toolkit
- Material-UI
- React Router
- Axios
- Socket.io-client

### Backend
- .NET Core 7+
- ASP.NET Core
- Entity Framework Core
- SignalR
- MongoDB.Driver
- StackExchange.Redis
- MQTTnet
- Confluent.Kafka

### DevOps
- Docker
- Kubernetes
- GitHub Actions
- Prometheus
- Grafana
- ELK Stack

### IoT
- MQTT Protocol
- ESP32/ESP8266
- Raspberry Pi
- Arduino

## Development Environment

### Yêu cầu hệ thống
- .NET SDK 7+
- MongoDB 6+
- Redis 7+
- Docker
- Git
- Visual Studio 2022 hoặc VS Code

### Công cụ phát triển
- Visual Studio 2022/VS Code
- Postman
- MongoDB Compass
- MQTT.fx
- Docker Desktop
- SQL Server Management Studio

## Dependencies chính

### Frontend
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@reduxjs/toolkit": "^1.9.0",
    "@mui/material": "^5.0.0",
    "axios": "^1.0.0",
    "socket.io-client": "^4.0.0"
  }
}
```

### Backend
```xml
<ItemGroup>
  <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="7.0.0" />
  <PackageReference Include="MongoDB.Driver" Version="2.19.0" />
  <PackageReference Include="StackExchange.Redis" Version="2.7.0" />
  <PackageReference Include="MQTTnet" Version="4.1.0" />
  <PackageReference Include="Confluent.Kafka" Version="2.1.0" />
  <PackageReference Include="Microsoft.EntityFrameworkCore" Version="7.0.0" />
  <PackageReference Include="Microsoft.AspNetCore.SignalR" Version="7.0.0" />
</ItemGroup>
```

## Cấu hình môi trường
- Development
- Staging
- Production

## API Documentation
- Swagger/OpenAPI
- Postman Collections
- API Reference

## Testing Tools
- xUnit
- Moq
- FluentAssertions
- Jest
- React Testing Library
- Cypress 