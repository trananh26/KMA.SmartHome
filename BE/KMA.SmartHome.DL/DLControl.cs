using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using Newtonsoft.Json;
using KMA.SmartHome.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace KMA.SmartHome.DL
{
    public class DLControl
    {
        IFirebaseClient client;

        IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = "AIzaSyAh39Gm8JRklu1JrTaYMEaiDCacKaBw0Nw",
            BasePath = "https://kmasmarthome-default-rtdb.firebaseio.com/"
        };

        public async void Control(RealEqiupment param)
        {
            // Ensure the client is initialized
            client = new FireSharp.FirebaseClient(config);

            if (client != null)
            {
                string path = $"Eqiupment";
                FirebaseResponse response = await client.UpdateAsync(path, param);

            }
        }

        public RealEqiupment GetEqiupmentstate()
        {
            RealEqiupment eqiupment = new RealEqiupment();
            client = new FireSharp.FirebaseClient(config);

            if (client != null)
            {
                var Result = client.Get("/Eqiupment");
                Dictionary<string, string> State = JsonConvert.DeserializeObject<Dictionary<string, string>>(Result.Body.ToString());
                if (State != null)
                {
                    foreach (var key in State)
                    {
                        if (key.Key == "Door")
                            eqiupment.Door = int.Parse(key.Value);

                        if (key.Key == "Fan")
                            eqiupment.Fan = int.Parse(key.Value);

                        if (key.Key == "Lamp")
                            eqiupment.Lamp = int.Parse(key.Value);

                        if (key.Key == "Alarm")
                            eqiupment.Alarm = int.Parse(key.Value);
                    }
                }
            }
            return eqiupment;
        }

        public async void UpdateEnvironmentData(NodeData param)
        {
            client = new FireSharp.FirebaseClient(config);

            if (client != null)
            {
                string path = $"NodeData";
                FirebaseResponse response = await client.UpdateAsync(path, param);

            }
        }
    }
}
