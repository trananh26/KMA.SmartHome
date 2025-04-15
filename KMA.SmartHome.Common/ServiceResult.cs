using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMA.SmartHome.Common
{
    public class ServiceResult
    {
        public ServiceResultType Status { get; set; } = ServiceResultType.Success;

        public object Data { get; set; }

        public string Message { get; set; }

        public string Code { get; set; }

        public string Errors { get; set; }

        public void OnSuccess(object data, string message = "")
        {
            this.Status = ServiceResultType.Success;
            this.Data = data;
            this.Message = message;
            this.Code = "200";
        }

        public void OnError(string message = "", string code = "")
        {
            this.Status = ServiceResultType.Fail;
            this.Message = !string.IsNullOrEmpty(message) ? message : "Có lỗi xảy ra. Lỗi không xác định";
            this.Code = code;
        }

        public void OnException(string message = "", string code = "")
        {
            this.Status = ServiceResultType.Error;
            this.Message = !string.IsNullOrEmpty(message) ? message : "Có lỗi xảy ra. Lỗi không xác định";
            this.Code = code;
        }
    }

    public enum ServiceResultType { Success = 1, Fail = 0, Error = -1 }
}
