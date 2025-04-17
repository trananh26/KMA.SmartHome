using KMA.SmartHome.Common;
using KMA.SmartHome.DL;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KMA.SmartHome.BL
{
    public class BLEnvironment
    {
        private static DLEnvironment oDL = new DLEnvironment();
        private static DLControl oDC = new DLControl();
        public static bool CheckDoor(string password)
        {
            return true;
        }

        /// <summary>
        /// Còi, cửa, quạt
        /// </summary>
        /// <param name="param"></param>
        public static void Control(Eqiupment param)
        {
            RealEqiupment _eq = new RealEqiupment();
            _eq = GetRealEqiupmentState();

            if (param.EquipmentID == "Door")
                _eq.Door = param.EquipmentState;

            if (param.EquipmentID == "Fan")
                _eq.Fan = param.EquipmentState;

            if (param.EquipmentID == "Lamp")
                _eq.Lamp = param.EquipmentState;

            if (param.EquipmentID == "Alarm")
                _eq.Alarm = param.EquipmentState;

            oDC.Control(_eq);
        }

        private static RealEqiupment GetRealEqiupmentState()
        {
            return oDC.GetEqiupmentstate();
        }

        public static List<NodeData> GetEnvironmentData()
        {
            return oDL.GetEnvironmentData();
        }

        public static void InsertEnvironmentData(NodeData param)
        {
            oDL.InsertEnvironmentData(param);
            oDC.UpdateEnvironmentData(param);
        }

        public static void InsertLog(LogData param)
        {
            oDL.InsertLog(param);
        }
    }
}
