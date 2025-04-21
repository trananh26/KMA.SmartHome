using KMA.SmartHome.Common;
using KMA.SmartHome.DL;

namespace KMA.SmartHome.BL
{
    public class BLResponseSize
    {
        private static DLResponseSize oDL = new DLResponseSize();

        public static void InsertResponseSize(ResponseSize responseSize)
        {
            oDL.InsertResponseSize(responseSize);
        }

        public static List<ResponseSize> GetResponseSizes()
        {
            return oDL.GetResponseSizes();
        }
    }
} 