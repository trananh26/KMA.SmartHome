using KMA.SmartHome.BL;
using KMA.SmartHome.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> CheckDoor([FromBody] string Password)
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
        public async Task<IActionResult> InsertLog([FromBody] LogData param)
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


    }
}
