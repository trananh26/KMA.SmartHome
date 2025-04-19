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


        public static bool CheckDoor(DoorCheck password)
        {

            ///Kiểm tra mở cửa
            if (oDL.CheckDoor(password))
            {
                Eqiupment eqiupment;
                eqiupment = new Eqiupment();
                eqiupment.EquipmentID = "door";
                eqiupment.EquipmentState = 1;
                Control(eqiupment);

                eqiupment = new Eqiupment();
                eqiupment.EquipmentID = "lamp";
                eqiupment.EquipmentState = 1;
                Control(eqiupment);


                //Log lại event
                return true;
            }
            else
            {
                //Log lại event
                LogDataParam param = new LogDataParam();
                param.ID = Guid.NewGuid().ToString();
                param.LogID = "1";
                param.UpdateTime = DateTime.Now;
                param.UpdateBy = "System";

                InsertLog(param);

                return false;
            }
        }

        /// <summary>
        /// Còi, cửa, quạt
        /// </summary>
        /// <param name="param"></param>
        public static void Control(Eqiupment param)
        {
            RealEqiupment _eq = new RealEqiupment();
            _eq = GetRealEqiupmentState();

            if (param.EquipmentID == "door")
                _eq.Door = param.EquipmentState;

            if (param.EquipmentID == "fan")
                _eq.Fan = param.EquipmentState;

            if (param.EquipmentID == "lamp")
                _eq.Lamp = param.EquipmentState;

            if (param.EquipmentID == "alarm")
                _eq.Alarm = param.EquipmentState;

            oDC.Control(_eq);

            //Log event
        }

        public static RealEqiupment GetRealEqiupmentState()
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

            //Kiểm tra các cảnh báo
            if (param.Gas > 600)
            {
                // Còi kêu, quạt quay
                Eqiupment eqiupment;
                eqiupment = new Eqiupment();
                eqiupment.EquipmentID = "fan";
                eqiupment.EquipmentState = 1;
                Control(eqiupment);

                eqiupment = new Eqiupment();
                eqiupment.EquipmentID = "alarm";
                eqiupment.EquipmentState = 1;
                Control(eqiupment);

                //Log lại event
                LogDataParam log = new LogDataParam();
                log.ID = Guid.NewGuid().ToString();
                log.LogID = "2";
                log.UpdateTime = DateTime.Now;
                log.UpdateBy = "System";

                InsertLog(log);
            }
            if (param.Temp > 35)
            {
                //Log lại event
                LogDataParam log = new LogDataParam();
                log.ID = Guid.NewGuid().ToString();
                log.LogID = "3";
                log.UpdateTime = DateTime.Now;
                log.UpdateBy = "System";

                InsertLog(log);
            }
            if (param.Hum > 90)
            {
                //Log lại event
                LogDataParam log = new LogDataParam();
                log.ID = Guid.NewGuid().ToString();
                log.LogID = "4";
                log.UpdateTime = DateTime.Now;
                log.UpdateBy = "System";

                InsertLog(log);
            }
        }

        public static void InsertLog(LogDataParam param)
        {
            oDL.InsertLog(param);
        }

        public static void DoorClose()
        {
            Eqiupment eqiupment;
            eqiupment = new Eqiupment();
            eqiupment.EquipmentID = "door";
            eqiupment.EquipmentState = 0;
            Control(eqiupment);

            eqiupment = new Eqiupment();
            eqiupment.EquipmentID = "lamp";
            eqiupment.EquipmentState = 0;
            Control(eqiupment);
        }

        public static void AlarmStop()
        {
            Eqiupment eqiupment;
            eqiupment = new Eqiupment();
            eqiupment.EquipmentID = "fan";
            eqiupment.EquipmentState = 0;
            Control(eqiupment);

            eqiupment = new Eqiupment();
            eqiupment.EquipmentID = "alarm";
            eqiupment.EquipmentState = 0;
            Control(eqiupment);

            //Log lại event
            LogDataParam param = new LogDataParam();
            param.ID = Guid.NewGuid().ToString();
            param.LogID = "6";
            param.UpdateTime = DateTime.Now;
            param.UpdateBy = "System";

            InsertLog(param);
        }

        public static object GetNewAlarm()
        {
            var lstLog = oDL.GetNewAlarm();
            if (lstLog.Count > 0)
            {
                return lstLog;
            }
            else
            {
                return null;
            }
        }

        public static object GetAlertHistory()
        {
            var lstLog = oDL.GetAlertHistory();
            if (lstLog.Count > 0)
            {
                return lstLog;
            }
            else
            {
                return null;
            }
        }

        public static void DeleteAlert()
        {
            oDL.DeleteAlert();
        }

        public static bool ChangePassword(ChangePassword password)
        {
            if (oDL.CheckPassword(password.OldPassword))
            {
                oDL.ChangePassword(password);
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
