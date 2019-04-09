using Microsoft.AspNetCore.Mvc;
using System.Web;
using WebAPi.Services.Interfaces;

namespace WebAPi.Controllers
{
    [Route("api/[controller]")]
    public class ToolController : Controller
    {
        private IToolService _toolService;

        public ToolController(IToolService service)
        {
            _toolService = service;
        }
        [HttpGet("generate")]
        public ContentResult GeneratePassword(int length = 32)
        {
            return Content(_toolService.GeneratePassword(length));
        }
    }
}