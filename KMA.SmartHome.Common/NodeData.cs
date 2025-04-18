using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMA.SmartHome.Common
{
    public class NodeData
    {
        public string? ID { get; set; }
        public double? Temp { get; set; }
        public double? Hum { get; set; }
        public double? Gas { get; set; }
        public double? Net { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string? UpdateBy { get; set; }
    }

    public class LogDataParam
    {
        public string? ID { get; set; }
        public string? LogID { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string? UpdateBy { get; set; }
    }

    public class LogData
    {
        public string? ID { get; set; }
        public string? LogID { get; set; }
        public string? Message { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string? UpdateBy { get; set; }
    }

    public class Eqiupment
    {
        public string? EquipmentID { get; set; }
        public int? EquipmentState { get; set; }
    }
    public class DoorCheck
    {
        public string? Password { get; set; }
    }

    public class RealEqiupment
    {
        [JsonProperty("Door")]    //Điều hòa
        public int? Door { get; set; }
        [JsonProperty("Fan")]    //Điều hòa
        public int? Fan { get; set; }
        [JsonProperty("Alarm")]    //Điều hòa
        public int? Alarm { get; set; }
        [JsonProperty("Lamp")]    //Điều hòa
        public int? Lamp { get; set; }
    }
}
