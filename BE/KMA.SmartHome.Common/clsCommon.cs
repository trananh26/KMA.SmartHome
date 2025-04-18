using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMA.SmartHome.Common
{
    public class clsCommon
    {
        public static string GetMySqlConnectionString()
        {
            string server = "14.225.29.45";
            string database = "KMA_SmartHome";
            string user = "root";
            string password = "abc@123ASd";

            return $"Server={server};Database={database};User={user};Password={password};";
        }
    }
}
