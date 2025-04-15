using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace KMA.SmartHome.Common
{
    public class ApiClient
    {
        private readonly HttpClient _httpClient;


        public ApiClient(string baseUrl)
        {
            _httpClient = new HttpClient { BaseAddress = new Uri(baseUrl) };
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }


        public static string ExcutedAPI(string baseUrl, string function, object parameter, Dictionary<string, string> headers, string method = "POST")
        {
            try
            {
                string data = string.Empty;

                string APIUrl = baseUrl + function;
                string param = string.Empty;
                if (parameter != null)
                {
                    param = JsonConvert.SerializeObject(parameter);
                }
                HttpWebRequest req = (HttpWebRequest)(WebRequest.Create(APIUrl));
                req.Method = method;
                req.ContentType = "application/json";

                if (headers != null && headers.Count > 0)
                {
                    foreach (KeyValuePair<string, string> header in headers)
                    {
                        req.Headers.Add(header.Key, header.Value);
                    }
                }

                if (req.Method != "GET")
                {
                    System.Text.UTF8Encoding encoding = new UTF8Encoding();
                    byte[] byteArray = encoding.GetBytes(param);
                    req.ContentLength = byteArray.Length;
                    if (!string.IsNullOrEmpty(param))
                    {
                        req.ContentLength = byteArray.Length;
                        using (Stream stream = req.GetRequestStream())
                        {
                            stream.Write(byteArray, 0, byteArray.Length);
                        }
                    }
                }
                using (HttpWebResponse response = (HttpWebResponse)(req.GetResponse()))
                {
                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        StreamReader reader = new StreamReader(response.GetResponseStream());
                        data = reader.ReadToEnd();
                    }
                }
                return data;
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}
