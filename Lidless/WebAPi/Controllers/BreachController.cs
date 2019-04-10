using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
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

        [HttpGet("breaches/{account}/{domain?}")]
        public async Task<IActionResult> GetBreaches(string account, string domain = null)
        {
            try
            {
                return Ok(await _breachService.GetBreaches(account, domain));
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("pastes/{account}")]
        public async Task<IActionResult> GetPastes(string account)
        {
            try
            {
                return Ok(await _breachService.GetPastes(account));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
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
