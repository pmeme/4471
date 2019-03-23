using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using WebAPi.Models;
using WebAPi.Services.Interfaces;

namespace WebAPi.Services
{
    public class BreachService : IBreachService
    {

        public async Task<List<BreachModel>> GetBreaches(string account)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create($"https://haveibeenpwned.com/api/v2/breachedaccount/{ account }");
                request.UserAgent = "Lidless Account Checker";
                request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (Stream stream = response.GetResponseStream())
                using (StreamReader reader = new StreamReader(stream))
                {
                    var breachesAsJson = await reader.ReadToEndAsync();
                    //System.Diagnostics.Debug.WriteLine(breachesAsJson);
                    List<BreachModel> breaches = JsonConvert.DeserializeObject<List<BreachModel>>(breachesAsJson);
                    //breaches.ForEach(delegate (BreachModel b) { System.Diagnostics.Debug.WriteLine(b.ToString()); });
                    return breaches;
                }
            }
            catch (Exception)
            {
                return new List<BreachModel>();
            }
        }

        public async Task<List<PasteModel>> GetPastes(string account)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create($"https://haveibeenpwned.com/api/v2/pasteaccount/{ account }");
                request.UserAgent = "Lidless Account Checker";
                request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (Stream stream = response.GetResponseStream())
                using (StreamReader reader = new StreamReader(stream))
                {
                    var pastesAsJson = await reader.ReadToEndAsync();
                    System.Diagnostics.Debug.WriteLine(pastesAsJson);
                    List<PasteModel> pastes = JsonConvert.DeserializeObject<List<PasteModel>>(pastesAsJson);
                    pastes.ForEach(delegate (PasteModel p) { System.Diagnostics.Debug.WriteLine(p.ToString()); });
                    return pastes;
                }
            }
            catch (Exception)
            {
                return new List<PasteModel>();
            }

        }

    }
}
