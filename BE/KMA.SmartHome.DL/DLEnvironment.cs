using KMA.SmartHome.Common;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMA.SmartHome.DL
{
    public class DLEnvironment
    {
        private string connectionString = clsCommon.GetMySqlConnectionString();

        public bool CheckDoor(DoorCheck password)
        {
            DataTable dataTable = new DataTable();
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                try
                {
                    conn.Open();

                    using (MySqlCommand command = new MySqlCommand("Proc_CheckPassword", conn))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@p_password", password.Password);

                        using (MySqlDataAdapter adapter = new MySqlDataAdapter(command))
                        {
                            adapter.Fill(dataTable);
                        }
                    }

                    // Trả về true nếu có ít nhất 1 dòng khớp mật khẩu
                    return dataTable.Rows.Count > 0;
                }

                catch (Exception ex)
                {
                    // Log lỗi nếu cần
                    Console.WriteLine("Lỗi khi kiểm tra cửa: " + ex.Message);
                    return false;
                }
            }
        }

        public List<LogData> GetNewAlarm()
        {
            List<LogData> DataList = new List<LogData>();

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("Proc_GetAlert", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using MySqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    DataList.Add(new LogData
                    {
                        ID = (string)reader["ID"],
                        LogID = (string)reader["LogID"],
                        Message = (string)reader["Mesage"],
                        UpdateBy = (string)reader["UpdateBy"],
                        UpdateTime = (DateTime)reader["UpdateTime"]
                    });
                }
            }
            return DataList;
        }

        public List<NodeData> GetEnvironmentData()
        {
            List<NodeData> DataList = new List<NodeData>();

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("GetLatestNodeData", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using MySqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    DataList.Add(new NodeData
                    {
                        Temp = (double)reader["Temp"],
                        Hum = (double)reader["Hum"],
                        Gas = (double)reader["Gas"],
                        Net1 = (double)reader["Net1"],
                        Net2 = (double)reader["Net2"],
                        UpdateTime = (DateTime)reader["UpdateTime"]
                    });
                }
            }
            return DataList;
        }

        public void InsertEnvironmentData(NodeData param)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("InsertNodeData", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_ID", param.ID);
                cmd.Parameters.AddWithValue("@p_Temp", param.Temp);
                cmd.Parameters.AddWithValue("@p_Hum", param.Hum);
                cmd.Parameters.AddWithValue("@p_Gas", param.Gas);
                cmd.Parameters.AddWithValue("@p_Net1", param.Net1);
                cmd.Parameters.AddWithValue("@p_Net2", param.Net2);
                cmd.Parameters.AddWithValue("@p_UpdateTime", param.UpdateTime);
                cmd.Parameters.AddWithValue("@p_UpdateBy", param.UpdateBy);

                cmd.ExecuteNonQuery();
            }
        }

        public void InsertLog(LogDataParam param)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("InsertLogData", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_ID", param.ID);
                cmd.Parameters.AddWithValue("@p_LogID", param.LogID);
                cmd.Parameters.AddWithValue("@p_UpdateTime", param.UpdateTime);
                cmd.Parameters.AddWithValue("@p_UpdateBy", param.UpdateBy);

                cmd.ExecuteNonQuery();
            }
        }

        public List<LogData> GetAlertHistory()
        {

            List<LogData> DataList = new List<LogData>();

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("Proc_GetAlertHistory", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using MySqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    DataList.Add(new LogData
                    {
                        ID = (string)reader["ID"],
                        LogID = (string)reader["LogID"],
                        Message = (string)reader["Mesage"],
                        UpdateBy = (string)reader["UpdateBy"],
                        UpdateTime = (DateTime)reader["UpdateTime"]
                    });
                }
            }
            return DataList;
        }

        public void DeleteAlert()
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                using (MySqlCommand cmd = new MySqlCommand("Proc_DeleteAlert", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void ChangePassword(ChangePassword password)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                string updateQuery = "UPDATE PassWord SET Password = @NewPassword WHERE Password = @OldPassword";
                MySqlCommand updateCmd = new MySqlCommand(updateQuery, conn);
                updateCmd.Parameters.AddWithValue("@NewPassword", password.NewPassword);
                updateCmd.Parameters.AddWithValue("@OldPassword", password.OldPassword);

                int rowsAffected = updateCmd.ExecuteNonQuery();
                if (rowsAffected == 0)
                {
                    throw new Exception("Không thể cập nhật mật khẩu.");
                }
            }
        }

        public bool CheckPassword(string password)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "SELECT COUNT(*) FROM PassWord WHERE Password = @Password";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@Password", password);

                    return Convert.ToInt32(cmd.ExecuteScalar()) > 0;
                }
            }

            catch (Exception ex)
            {
                // Log lỗi nếu cần
                Console.WriteLine("Lỗi khi kiểm tra cửa: " + ex.Message);
                return false;
            }

        }

        public (long TotalSize, double AverageSize) GetResponseSizeStatsLast5Minutes()
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                string query = @"
                    SELECT 
                        SUM(SizeInBytes) as TotalSize,
                        AVG(SizeInBytes) as AverageSize
                    FROM ResponseSize 
                    WHERE Timestamp >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)";

                MySqlCommand cmd = new MySqlCommand(query, conn);
                using MySqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    long totalSize = reader["TotalSize"] == DBNull.Value ? 0 : Convert.ToInt64(reader["TotalSize"]);
                    double averageSize = reader["AverageSize"] == DBNull.Value ? 0 : Convert.ToDouble(reader["AverageSize"]);
                    return (totalSize, averageSize);
                }
            }

            return (0, 0);
        }
    }
}
