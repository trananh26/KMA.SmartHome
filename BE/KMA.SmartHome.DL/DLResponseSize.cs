using KMA.SmartHome.Common;
using MySql.Data.MySqlClient;

namespace KMA.SmartHome.DL
{
    public class DLResponseSize
    {
        private string connectionString = clsCommon.GetMySqlConnectionString();

        public void InsertResponseSize(ResponseSize responseSize)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                string query = "INSERT INTO ResponseSize (Endpoint, SizeInBytes, Timestamp) VALUES (@Endpoint, @SizeInBytes, @Timestamp)";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Endpoint", responseSize.Endpoint);
                cmd.Parameters.AddWithValue("@SizeInBytes", responseSize.SizeInBytes);
                cmd.Parameters.AddWithValue("@Timestamp", responseSize.Timestamp);
                cmd.ExecuteNonQuery();
            }
        }

        public List<ResponseSize> GetResponseSizes()
        {
            List<ResponseSize> responseSizes = new List<ResponseSize>();

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT * FROM ResponseSize ORDER BY Timestamp DESC";
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using MySqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    responseSizes.Add(new ResponseSize
                    {
                        Endpoint = reader["Endpoint"].ToString(),
                        SizeInBytes = Convert.ToInt64(reader["SizeInBytes"]),
                        Timestamp = Convert.ToDateTime(reader["Timestamp"])
                    });
                }
            }

            return responseSizes;
        }
    }
} 