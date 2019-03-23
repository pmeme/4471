using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPi.Models
{
    public class PasteModel
    {
        public string Id { get; set; }
        public string Source { get; set; }
        public string Title { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DateTime Date { get; set; }
        public int EmailCount { get; set; }

        public override string ToString()
        {
            return $"{Title} : {Source}";
        }
    }
}
