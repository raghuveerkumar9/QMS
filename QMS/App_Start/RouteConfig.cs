using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace QMS
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
           
            routes.MapRoute(
           name: "Login",
           url: "Login",
           defaults: new { controller = "Registration", action = "Login", id = UrlParameter.Optional }
           );

            routes.MapRoute(
          name: "Dashboard",
          url: "Dashboard",
          defaults: new { controller = "Admin", action = "UserPanel", id = UrlParameter.Optional }
          );
            routes.MapRoute(
               name: "Default",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Registration", action = "Login", id = UrlParameter.Optional }
           );
        }
    }
}
