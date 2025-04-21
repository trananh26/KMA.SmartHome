using KMA.SmartHome.Common;
using KMA.SmartHome.BL;
using System.Text;

namespace KMA.SmartHome.API.Middleware
{
    public class ResponseSizeMiddleware
    {
        private readonly RequestDelegate _next;

        public ResponseSizeMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Lưu stream gốc
            var originalBodyStream = context.Response.Body;

            // Tạo một memory stream mới để ghi response
            using (var memoryStream = new MemoryStream())
            {
                context.Response.Body = memoryStream;

                // Chuyển tiếp request
                await _next(context);

                // Lấy dung lượng response
                var responseSize = memoryStream.Length;

                // Lưu thông tin response size vào database
                BLResponseSize.InsertResponseSize(new ResponseSize
                {
                    Endpoint = context.Request.Path,
                    SizeInBytes = responseSize,
                    Timestamp = DateTime.Now
                });

                // Copy memory stream vào response body gốc
                memoryStream.Seek(0, SeekOrigin.Begin);
                await memoryStream.CopyToAsync(originalBodyStream);
            }
        }
    }
} 