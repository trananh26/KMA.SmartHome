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
        public double? TVOC { get; set; }
        public double? CO2 { get; set; }
        public double? AQI { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string? UpdateBy { get; set; }
    }

    public class LogData
    {
        public string? ID { get; set; }
        public string? Message { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string? UpdateBy { get; set; }
    }

    public class Eqiupment
    {
        public string? EquipmentID { get; set; }
        public int? EquipmentState { get; set; }
    }
}
