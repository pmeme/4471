using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPi.Services.Interfaces;

namespace WebAPi.Controllers
{
    [Route("api/[controller]")]
    public class BreachController : Controller
    {
        private readonly IBreachService _breachService;

        public BreachController(IBreachService service)
        {
            _breachService = service;
        }

        [HttpGet("breaches/{account}")]
        public IActionResult GetBreaches(string account)
        {
            try
            {
                return Ok(_breachService.GetBreaches(account));
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("pastes/{account}")]
        public IActionResult GetPastes(string account)
        {
            return null;
        }

        [HttpGet("values")]
        public List<string> Test()
        {
            return new List<string>
            {
                "fff",
                "dsdd"
            };
        }
    }
}
