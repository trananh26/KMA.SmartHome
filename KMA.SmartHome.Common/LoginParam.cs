namespace KMA.SmartHome.Common
{
    public class LoginParam
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class LoginResult
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

    }

    public class User
    {
        public string AccountID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string CreatedBy { get; set; }
    }


    public class UserDetail
    {
        public string AccountID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string CreatedBy { get; set; }
    }


}