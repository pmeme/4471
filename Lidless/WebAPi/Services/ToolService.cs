using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using WebAPi.Extensions;
using WebAPi.Services.Interfaces;

namespace WebAPi.Services
{
    public class ToolService : IToolService
    {
        public string GeneratePassword(int length)
        {
            return PasswordGenerator.GeneratePassword(length, 5);
        }


    }
}
