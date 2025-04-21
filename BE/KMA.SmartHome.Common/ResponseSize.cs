using System;

namespace KMA.SmartHome.Common
{
    public class ResponseSize
    {
        public string Endpoint { get; set; }
        public long SizeInBytes { get; set; }
        public DateTime Timestamp { get; set; }
    }
} 