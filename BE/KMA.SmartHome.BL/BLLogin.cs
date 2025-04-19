using System.Collections.Generic;
using KMA.SmartHome.Common;
using KMA.SmartHome.DL;

namespace KMA.SmartHome.BL
{
    public class BLLogin
    {
        private static DLLogin oDL = new DLLogin();

        public static object CheckLogin(LoginParam param)
        {
            var lstLoginResult = oDL.Login(param.UserName, param.Password);
            if (lstLoginResult.Count > 0)
            {
                return lstLoginResult;
            }
            else
            {
                return null;
            }
        }

        public static object GetUser()
        {
            var users = oDL.GetAllUsers();
            if (users.Count > 0)
            {
                return users;
            }
            else
            {
                return null;
            }
        }

        public static bool Register(User user)
        {
            try
            {
                if (oDL.UserExists(user.UserName, user.PhoneNumber))
                {
                    return false;
                }

                oDL.RegisterUser(user);
                return true;
            }
            catch (Exception)
            {

                return false; 
            }
            
        }
        public static void DeleteUser(string userName)
        {
            oDL.DeleteUser(userName);
        }

        public static object InsertEnvironment(NodeData param)
        {
            throw new NotImplementedException();
        }
    }

}