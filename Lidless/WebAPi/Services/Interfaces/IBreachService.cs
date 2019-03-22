using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPi.Models;

namespace WebAPi.Services.Interfaces
{
    public interface IBreachService
    {
        Task<List<BreachModel>> GetBreaches(string account);
    }
}
