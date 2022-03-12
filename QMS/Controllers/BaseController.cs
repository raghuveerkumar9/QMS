using System;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Mvc;
using Domain;

namespace QMS.Controllers
{
    public class BaseController : Controller
    {
        public static Registration _userIdentity = new Registration();
        private IRepository<UserLogger> _UserLogger = new Repository<UserLogger>();
        private IRepository<Registration> _Registration = new Repository<Registration>();
       // private IRepository<DepartmentMaster> _DepartmentMaster = new Repository<DepartmentMaster>();
        // GET: Base               
        //   private IRepository<T> repository = null;
        public BaseController()

        {
            // this.repository = new Repository<T>();
            // GET: Base
            // GetUser1();

        }
        public void RefreshUser()
        {
            var User = Session["UserDetails"] as Registration;
            Session["UserDetails"] = _Registration.SelectAll().Where(x => x.UserId == User.UserId).FirstOrDefault();

        }
        public string GetIp()
        {
            string ipAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(ipAddress))
            {
                ipAddress = Request.ServerVariables["REMOTE_ADDR"];
            }
            //string ip = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            //if (string.IsNullOrEmpty(ip))
            //{
            //    ip = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            //}
            //return ip;
            return ipAddress;
        }
        #region Logger
        public ActionResult UpdateLogger(long UserID, string Description)
        {
            try
            {
                UserLogger userlog = new UserLogger();
                userlog.UserID = UserID;
                userlog.UserIP = GetIp();
                userlog.Description = Description;
                userlog.CreateAt = System.DateTime.Now;
                _UserLogger.Add(userlog);
                _UserLogger.Save();
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        public Registration GetUser()
        {
            _userIdentity = null;
            try
            {
                if (Session["UserDetails"] != null)
                {
                    _userIdentity = Session["UserDetails"] as Registration;
            //        SqlParameter[] parameter = {
            //new SqlParameter("@UserID",_userIdentity.UserId),
            //};
                   // _userIdentity = _Registration.SQLQuery<Registration>("SP_UpdatePoints @UserID", parameter).FirstOrDefault();
                    if (_userIdentity != null)
                    {
                        Session["UserDetails"] = _userIdentity;
                    }
                }
            }
            catch
            {
                _userIdentity = null;
            }
            return _userIdentity;
        }
        #endregion

    }
}