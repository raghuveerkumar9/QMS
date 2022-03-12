using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Service
{

    class CommonServices
    {
        private IRepository<UserLogger> _UserLogger = new Repository<UserLogger>();

        public void UpdateUserLogger(UserLogger Logger)
        {
            _UserLogger.Add(Logger);
            _UserLogger.Save();

        }
        //public string GetIp()
        //{
        //    string ipAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
        //    if (string.IsNullOrEmpty(ipAddress))
        //    {
        //        ipAddress = Request.ServerVariables["REMOTE_ADDR"];
        //    }
        //    ViewBag.IPAddress = ipAddress;


        //    string ip = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
        //    if (string.IsNullOrEmpty(ip))
        //    {
        //        ip = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
        //    }
        //    return ip;
        //}
    }
}
