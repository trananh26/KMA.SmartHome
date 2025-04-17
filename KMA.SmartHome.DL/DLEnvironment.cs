using KMA.SmartHome.Common;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMA.SmartHome.DL
{
    public class DLEnvironment
    {
        private string connectionString = clsCommon.GetMySqlConnectionString();
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
                        Hum= (double)reader["Hum"],
                        Gas = (double)reader["Gas"],
                        Net = (double)reader["Net"],
                        UpdateTime = (DateTime)reader["_UpdateTime"]
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
                cmd.Parameters.AddWithValue("@p_Net", param.Net);
                cmd.Parameters.AddWithValue("@p_UpdateTime", param.UpdateTime);
                cmd.Parameters.AddWithValue("@p_UpdateBy", param.UpdateBy);

                cmd.ExecuteNonQuery();
            }
        }

        public void InsertLog(LogData param)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("InsertLogData", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_ID", param.ID);
                cmd.Parameters.AddWithValue("@p_Message", param.Message);
                cmd.Parameters.AddWithValue("@p_UpdateTime", param.UpdateTime);
                cmd.Parameters.AddWithValue("@p_UpdateBy", param.UpdateBy);

                cmd.ExecuteNonQuery();
            }
        }
    }
}
