using KMA.SmartHome.BL;
using KMA.SmartHome.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KMA.SmartHome.API.Middleware;

namespace KMA.SmartHome.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorController : ControllerBase
    {
        /// <summary>
        /// Điều khiển thiết bị
        /// Gửi lên Firebase
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        [HttpPost("Control")]
        public async Task<IActionResult> Control([FromBody] Eqiupment param)
        {
            var Result = new ServiceResult();
            try
            {
                BLEnvironment.Control(param);
                Result.OnSuccess(null, "Data inserted successfully");
            }
            catch (Exception)
            {
                Result.OnError("Failed to insert data. Please check the server!", "204");
            }

            return new JsonResult(Result);
        }

        /// <summary>
        /// kiểm tra mật khẩu
        /// Gửi lên Firebase
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        [HttpPost("CheckDoor")]
        public async Task<IActionResult> CheckDoor([FromBody] DoorCheck Password)
        {
            var Result = new ServiceResult();
            try
            {
                if (BLEnvironment.CheckDoor(Password))

                    Result.OnSuccess(null, "Wellcome");
                else
                    Result.OnError("Please again", "204");
            }
            catch (Exception)
            {
                Result.OnError("Failed to insert data. Please check the server!", "204");
            }

            return new JsonResult(Result);
        }


        /// <summary>
        /// Gửi giá trị môi trường
        /// Gửi lên firebase
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        [HttpPost("InsertEnvironmentData")]
        public async Task<IActionResult> InsertEnvironmentData([FromBody] NodeData param)
        {
            var Result = new ServiceResult();
            try
            {
                param.ID = Guid.NewGuid().ToString(); // Generate a new GUID for ID
                param.UpdateTime = DateTime.Now;
                BLEnvironment.InsertEnvironmentData(param);
                Result.OnSuccess(null, "Data inserted successfully");
            }
            catch (Exception)
            {
                Result.OnError("Failed to insert data. Please check the server!", "204");
            }

            return new JsonResult(Result);
        }

        /// <summary>
        /// Lấy giá trị môi trường
        /// Lấy từ firebase
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        [HttpGet("GetEnvironmentData")]
        public async Task<IActionResult> GetEnvironmentData()
        {
            var Result = new ServiceResult();
            try
            {
                Result.Data = BLEnvironment.GetEnvironmentData();

                if (Result.Data != null)
                {
                    Result.OnSuccess(Result.Data, "Success");
                }
                else
                {
                    Result.OnError("Failed to retrieve data. Please check the server!", "205");
                }
            }
            catch (Exception)
            {
                Result.OnError("Failed to retrieve data. Please check the server!", "204");
            }

            return new JsonResult(Result);
        }

        /// <summary>
        /// Log sth
        /// Gửi lên MySQL
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        [HttpPost("Log")]
        public async Task<IActionResult> InsertLog([FromBody] LogDataParam param)
        {
            var Result = new ServiceResult();
            try
            {
                param.ID = Guid.NewGuid().ToString(); // Generate a new GUID for ID
                param.UpdateTime = DateTime.Now;
                BLEnvironment.InsertLog(param);
                Result.OnSuccess(null, "Data inserted successfully");
            }
            catch (Exception)
            {
                Result.OnError("Failed to insert data. Please check the server!", "204");
            }
            return new JsonResult(Result);
        }

        [HttpPost("DoorClose")]
        public async Task<IActionResult> DoorClose([FromBody] DoorCheck Password)
        {
            var Result = new ServiceResult();
            try
            {
                BLEnvironment.DoorClose();
                Result.OnSuccess(Result.Data, "Success");
            }
            catch (Exception)
            {
                Result.OnError("Failed to retrieve data. Please check the server!", "204");
            }
            return new JsonResult(Result);
        }

        [HttpPost("AlarmStop") ]
        public async Task<IActionResult> AlarmStop([FromBody] RstAlarm Alarm)
        {
            var Result = new ServiceResult();
            try
            {
                BLEnvironment.AlarmStop();
                Result.OnSuccess(Result.Data, "Success");
            }
            catch (Exception)
            {
                Result.OnError("Failed to retrieve data. Please check the server!", "204");
            }
            return new JsonResult(Result);
        }

        /// <summary>
        /// Lấy sanh sách Alarm mới
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetNewAlarm")]
        public async Task<IActionResult> GetNewAlarm()
        {
            var Result = new ServiceResult();
            try
            {
                Result.Data = BLEnvironment.GetNewAlarm();
                if (Result.Data is null)
                {
                    Result.OnError("No alert!", "203");
                }
                else
                {
                    Result.OnSuccess(Result.Data, "Success");
                }

            }
            catch (Exception)
            {
                Result.OnError("Failed to retrieve data. Please check the server!", "204");
            }
            return new JsonResult(Result);
        }

        /// <summary>
        /// Lấy danh sách thông báo
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAlertHistory")]
        public async Task<IActionResult> GetAlertHistory()
        {
            var Result = new ServiceResult();
            try
            {
                Result.Data = BLEnvironment.GetAlertHistory();
                Result.OnSuccess(Result.Data, "Success");
            }
            catch (Exception)
            {
                Result.OnError("Failed to retrieve data. Please check the server!", "204");
            }
            return new JsonResult(Result);
        }

        /// <summary>
        /// Xóa alert khi người dùng đã xem
        /// </summary>
        /// <returns></returns>
        [HttpPost("AlertStop")]
        public async Task<IActionResult> AlertStop([FromBody] RstAlarm Alarm)
        {
            var Result = new ServiceResult();
            try
            {
                BLEnvironment.DeleteAlert();
                Result.OnSuccess(Result.Data, "Success");
            }
            catch (Exception)
            {
                Result.OnError("Failed to retrieve data. Please check the server!", "204");
            }
            return new JsonResult(Result);
        }

        [HttpGet("GetEqiupmentState")]
        public async Task<IActionResult> GetRealEqiupmentState()
        {
            var Result = new ServiceResult();
            try
            {
                Result.Data = BLEnvironment.GetRealEqiupmentState();
                Result.OnSuccess(Result.Data, "Success");
            }
            catch (Exception)
            {
                Result.OnError("Failed to retrieve data. Please check the server!", "204");
            }
            return new JsonResult(Result);
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePassword Password)
        {
            var Result = new ServiceResult();
            try
            {
                if (BLEnvironment.ChangePassword(Password))
                {
                    Result.OnSuccess(Result.Data, "Success");
                }
                else
                {
                    Result.OnError("Sai mật khẩu!", "203");
                }
            }
            catch (Exception)
            {
                Result.OnError("Failed to retrieve data. Please check the server!", "204");
            }
            return new JsonResult(Result);
        }

        /// <summary>
        /// Lấy thông tin dung lượng gói tin phản hồi
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetResponseSizes")]
        public async Task<IActionResult> GetResponseSizes()
        {
            var Result = new ServiceResult();
            try
            {
                Result.Data = BLResponseSize.GetResponseSizes();
                Result.OnSuccess(Result.Data, "Success");
            }
            catch (Exception)
            {
                Result.OnError("Failed to retrieve response sizes. Please check the server!", "204");
            }
            return new JsonResult(Result);
        }

        /// <summary>
        /// Lấy thống kê dung lượng gói tin trong 5 phút qua
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetResponseSizeStats")]
        public async Task<IActionResult> GetResponseSizeStats()
        {
            var Result = new ServiceResult();
            try
            {
                var (TotalSize, AverageSize) = BLEnvironment.GetResponseSizeStatsLast5Minutes();
                Result.Data = new
                {
                    TotalSize = TotalSize,
                    AverageSize = AverageSize,
                    TotalSizeMB = Math.Round(TotalSize / (1024.0 * 1024.0), 2),
                    AverageSizeKB = Math.Round(AverageSize / 1024.0, 2)
                };
                Result.OnSuccess(Result.Data, "Success");
            }
            catch (Exception)
            {
                Result.OnError("Failed to retrieve response size statistics. Please check the server!", "204");
            }
            return new JsonResult(Result);
        }
    }
}
