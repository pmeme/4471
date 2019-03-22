using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebAPi.Models;
using WebAPi.Services.Interfaces;

namespace WebAPi.Services
{
    public class BreachService : IBreachService
    {

        public async Task<List<BreachModel>> GetBreaches(string account)
        {
            throw new NotImplementedException();
        }
    }
}
