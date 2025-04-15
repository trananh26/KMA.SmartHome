using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using KMA.SmartHome.BL;
using KMA.SmartHome.Common;

namespace KMA.SmartHome.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        /// <summary>
        /// đăng nhập theo tài khoản/mật khẩu
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginParam param)
        {
            var Result = new ServiceResult();
            try
            {
                Result.Data = BLLogin.CheckLogin(param);

                if (Result.Data != null)
                {
                    Result.OnSuccess(Result.Data, "Thành công");
                }
                else
                {
                    Result.OnError("Sai tên đăng nhập hoặc mật khẩu. Vui lòng kiểm tra lại", "205");
                }
            }
            catch (Exception)
            {
                Result.OnError("Đăng nhập thất bại. vui lòng kiểm tra lại server!", "204");
            }

            return new JsonResult(Result);
        }

        /// <summary>
        /// Lấy danh sách nhân viên
        /// </summary>
        /// <returns></returns>
        [HttpGet("User")]
        public async Task<IActionResult> GetUser()
        {
            var Result = new ServiceResult();
            try
            {
                Result.Data = BLLogin.GetUser();

                if (Result.Data != null)
                {
                    Result.OnSuccess(Result.Data, "Thành công");
                }
                else
                {
                    Result.OnError("Không lấy được danh sách người dùng. Vui lòng kiểm tra lại", "205");
                }
            }
            catch (Exception)
            {
                Result.OnError("Lấy thông tin thất bại. vui lòng kiểm tra lại server!", "204");
            }

            return new JsonResult(Result);
        }

        /// <summary>
        /// Đăng ký
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        [HttpPost ("Register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var Result = new ServiceResult();
            try
            {
                user.AccountID = Guid.NewGuid().ToString(); // Generate a new GUID for AccountID
                if (BLLogin.Register(user))
                {
                    Result.OnSuccess(null, "Đăng ký thành công");
                }
                else
                {
                    Result.OnError("Tài khoản đã tồn tại. Vui lòng kiểm tra lại", "205");
                }
            }
            catch (Exception)
            {
                Result.OnError("Đăng ký thất bại. vui lòng kiểm tra lại server!", "204");
            }

            return new JsonResult(Result);
        }
    }
}
