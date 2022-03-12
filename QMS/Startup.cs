using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(QMS.Startup))]
namespace QMS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
