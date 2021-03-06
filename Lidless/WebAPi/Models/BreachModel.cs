﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPi.Models
{
    public class BreachModel
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Domain { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Include)]
        public DateTime BreachDate { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DateTime AddedDate { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DateTime ModifiedDate { get; set; }
        public int PwnCount { get; set; }
        public string Description { get; set; }
        public string[] DataClasses { get; set; }
        public bool IsVerified { get; set; }
        public bool IsFabricated { get; set; }
        public bool IsSensitive { get; set; }
        public bool IsRetired { get; set; }
        public bool IsSpamList { get; set; }
        public string LogoPath { get; set; }

        public override string ToString()
        {
            return $"{Name} : {Domain}";
        }
    }
}
