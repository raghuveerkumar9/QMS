using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace QMS.Controllers
{
    public class AdminController : BaseController
    {
        private IRepository<TokenRegistration> _TokenRegistration = null;
        private IRepository<DepartmentMaster> _DepartmentMaster = null;
        static JavaScriptSerializer _ser = new JavaScriptSerializer();
        public AdminController()
        {
            this._TokenRegistration = new Repository<TokenRegistration>();
            this._DepartmentMaster = new Repository<DepartmentMaster>();

        }
        // GET: Admin
        public ActionResult UserPanel()
        {
            if (GetUser() != null && _userIdentity.RoleID == 0)
            {
                UpdateLogger(_userIdentity.UserId, "Logged by mobileno- " + _userIdentity.UserMobile.ToString());
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Registration");
            }
        }
        #region  Token Registration
        public ActionResult TokenRegistration()
        {
            //ViewData["DepartmentList"] =_DepartmentMaster.SelectAll().Select(x => new { ID = x.DeptID, DeparmentName = x.DepartmentName }).ToList();
            ViewData["DepartmentList"]=_DepartmentMaster.SelectAll().Select(x => new { ID = x.DeptID, DeparmentName = x.DepartmentName }).ToList();
            return View();

        }
        
        [HttpPost]
        public ActionResult TokenRegistrationSave(TokenRegistration model)
       
        {
            if (GetUser() != null)
                {
                TokenRegistration reg = new TokenRegistration();
                reg.Name = model.Name;
                reg.CounterNumberID = model.CounterNumberID;
                reg.TokenNumber = GetTokenNo(model.CounterNumberID).ToString();
                reg.Date = System.DateTime.Now;
                reg.DepartmentID = model.DepartmentID;
                reg.Gender = model.Gender;
                reg.Mobile = model.Mobile;
                reg.Payment = model.Payment;
                reg.Age = model.Age;
                _TokenRegistration.Add(reg);
                _TokenRegistration.Save();
                return Json("Successfully Updated^"+reg.TokenNumber.ToString());
                
            }
            
            return View();

        }
        public  string GetTokenNo(int CounterID)
        {
           int TokenNo= _TokenRegistration.SelectAll().Where(x => x.CounterNumberID == CounterID && x.Date.ToShortDateString() == DateTime.Now.ToShortDateString()).Count()+1;
            string NewToken = "";
            if (TokenNo.ToString().Length ==1)
            {
                NewToken = "A00" + TokenNo.ToString();
            }
            else if (TokenNo.ToString().Length == 2)
            {
                NewToken = "A0" + TokenNo.ToString();
            }
            else
            {
                NewToken = TokenNo.ToString();
            }
            return NewToken;


        }
        
        //private static int CalculateAge(DateTime dateOfBirth)
        //{
        //    int age = 0;
        //    age = DateTime.Now.Year - dateOfBirth.Year;
        //    if (DateTime.Now.DayOfYear < dateOfBirth.DayOfYear)
        //        age = age - 1;

        //    return age;
        //}
        #endregion
    }
}