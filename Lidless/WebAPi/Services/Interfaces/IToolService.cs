using System.Threading.Tasks;

namespace WebAPi.Services.Interfaces
{
    public interface IToolService
    {
        string GeneratePassword(int length);
    }
}
