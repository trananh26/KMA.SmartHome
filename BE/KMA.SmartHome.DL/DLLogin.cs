using KMA.SmartHome.Common;
using MySql.Data.MySqlClient;

namespace KMA.SmartHome.DL
{
    public class DLLogin
    {
        private string connectionString = clsCommon.GetMySqlConnectionString();

        public List<LoginResult> Login(string userName, string password)
        {
            List<LoginResult> lst = new List<LoginResult>();

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT * FROM Account WHERE (UserName = @UserName OR PhoneNumber = @UserName) AND Password = @Password";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@UserName", userName);
                cmd.Parameters.AddWithValue("@Password", password);

                using MySqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    lst.Add(new LoginResult
                    {
                        UserName = reader["UserName"].ToString(),
                        FullName = reader["FullName"].ToString(),
                        Address = reader["Address"].ToString(),
                        Email = reader["Email"].ToString(),
                        PhoneNumber = reader["PhoneNumber"].ToString()
                    });
                }
            }

            return lst;
        }

        public List<UserDetail> GetAllUsers()
        {
            List<UserDetail> users = new List<UserDetail>();

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT * FROM Account";
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using MySqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    users.Add(new UserDetail
                    {
                        AccountID = reader["AccountID"].ToString(),
                        UserName = reader["Username"].ToString(),
                        FullName = reader["FullName"].ToString(),
                        PhoneNumber = reader["PhoneNumber"].ToString(),
                        DateOfBirth = (DateTime)reader["DateOfBirth"],
                        Address = reader["Address"].ToString(),
                        CreatedBy = reader["CreatedBy"].ToString()
                    });
                }
            }
            return users;
        }

        public void RegisterUser(User user)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                string query = @"INSERT INTO Account (AccountID, Username, Password, FullName, PhoneNumber, DateOfBirth, Address, ProfilePicture, Position, Role, CreatedBy) 
                                 VALUES (@AccountID, @Username, @Password, @FullName, @PhoneNumber, @DateOfBirth, @Address, @ProfilePicture, @Position, @Role, @CreatedBy)";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@AccountID", user.AccountID);
                cmd.Parameters.AddWithValue("@Username", user.UserName);
                cmd.Parameters.AddWithValue("@Password", user.Password); // Ensure password is hashed before storing
                cmd.Parameters.AddWithValue("@FullName", user.FullName);
                cmd.Parameters.AddWithValue("@PhoneNumber", user.PhoneNumber);
                cmd.Parameters.AddWithValue("@DateOfBirth", user.DateOfBirth);
                cmd.Parameters.AddWithValue("@Address", user.Address);
                cmd.Parameters.AddWithValue("@CreatedBy", user.CreatedBy);

                cmd.ExecuteNonQuery();
            }
        }

        public bool UserExists(string userName, string phoneNumber)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT COUNT(*) FROM Account WHERE Username = @Username OR PhoneNumber = @PhoneNumber";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Username", userName);
                cmd.Parameters.AddWithValue("@PhoneNumber", phoneNumber);

                return Convert.ToInt32(cmd.ExecuteScalar()) > 0;
            }
        }
        public void DeleteUser(string userName)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                string query = "DELETE FROM Account WHERE Username = @Username";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Username", userName);

                cmd.ExecuteNonQuery();
            }
        }
    }

}