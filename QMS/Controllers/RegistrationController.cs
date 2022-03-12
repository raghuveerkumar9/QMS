using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
//using System.Web.Security;
using Domain;
using QMS.Models;
using Newtonsoft.Json;

namespace QMS.Controllers
{
    public class RegistrationController : BaseController
    {
        public string SaltKey = "AIeITPgc0aXdaaWSKWIngAARoOh5F5";

        // GET: Registration
        private IRepository<Registration> _Registration = null;
        static JavaScriptSerializer _ser = new JavaScriptSerializer();
        public RegistrationController()
        {
            this._Registration = new Repository<Registration>();
        }
        #region Login
        public ActionResult Login()
        {
            try
            {
                var user = _Registration.SelectAll().ToList();
                Session["PID"] = null;
                if (GetUser() != null)
                {
                    return RedirectToAction("../Dashboard");
                }
                Session.Abandon();
            }
            catch (Exception ex)
            {

            }
            return View();
        }
        [HttpPost]
        public JsonResult Login(string UserMobile, string UserPass)
        {
            try
            {
                UpdateLogger(0, "Try to login by mobileno- " + UserMobile.ToString());
                var VarPass = CreatePasswordHash(UserPass, SaltKey);
                Registration reg = _Registration.SelectAll().Where(x => x.UserMobile == UserMobile && x.UserPass == VarPass).FirstOrDefault();
                if (reg == null)
                {
                    return Json("This Mobile No and Password not match, Please try again");
                }
                Session["UserDetails"] = reg;
                //Session["UserName"] = reg.Name;
                RefreshUser();
                if (reg.RoleID == 0)
                {
                    return Json("Success^" + Url.Action("UserPanel", "Admin"));
                }
                else
                {
                    return Json("Success^" + Url.Action("UserPanel", "Registration"));
                }
                // return Json("Success^"+Url.Action("UserPanel", "Registration"));
            }
            catch (Exception ex)
            {
                UpdateLogger(0, "Error to login by mobileno- " + UserMobile.ToString());
                Session["UserDetails"] = null;
                return Json("Please enter valid Password");
            }
        }
        [HttpPost]
        public JsonResult Sinup(string UserMobile, string UserPass, string Name, string Gender, string DOB, string ReferralCode)
        {
            try
            {
                if (_Registration.SelectAll().Where(x => x.UserMobile == UserMobile).FirstOrDefault() != null)
                {
                    return Json("This Mobile No. Already Exists, Pleasse try another mobile No");
                }
               
                Registration reg = new Registration();
                reg.UserMobile = UserMobile;
                reg.ResetPassword = UserPass;
                reg.UserPass = CreatePasswordHash(UserPass, SaltKey);
                reg.Name = Name;
                reg.Gender = Gender;
                reg.DOB = DOB;
                reg.CreatedAt = System.DateTime.Now;
                _Registration.Add(reg);
                _Registration.Save();
                Session["UserDetails"] = reg;
                // Session["UserName"] = reg.Name;
                UpdateLogger(reg.UserId, "Created new sinup by mobileno- " + UserMobile.ToString());
                
                RefreshUser();
                // return Json("Success^" + Url.Action("UserPanel", "Registration"));
                return Json("Success^/Dashboard");
            }
            catch
            {
                Session["UserDetails"] = null;
                return Json("Error, Please try again with valid input");

            }
        }

        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("Login");
            // return View();
        }
        [HttpPost]
        public JsonResult ForgetPassword(string UserMobile, string DOB)
        {
            try
            {
                // var VarPass = CreatePasswordHash(UserPass, SaltKey);
                Registration reg = _Registration.SelectAll().Where(x => x.UserMobile == UserMobile && x.DOB == DOB).FirstOrDefault();
                if (reg == null)
                {
                    return Json("This Mobile No and DOB not match, Please try again");
                }
                return Json("Your Password is " + reg.ResetPassword.ToString());
            }
            catch
            {
                return Json("Please enter valid Entry");
            }
        }

        public ActionResult ResetPassword()
        {
            if (GetUser() != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }
        [HttpPost]
        public JsonResult ResetPassword(string OldPassword, string NewPassword)
        {
            if (GetUser() != null)
            {
                var Reg = _Registration.SelectAll().Where(x => x.UserId == _userIdentity.UserId).FirstOrDefault();
                if (Reg.ResetPassword != OldPassword)
                {
                    return Json("Fail^You old Password not match, Please enter Correct Password");
                }
                Reg.ResetPassword = NewPassword;
                Reg.UserPass = CreatePasswordHash(NewPassword, SaltKey);
                _Registration.Save();
                return Json("Success^Successfully Updated your password");

            }


            return Json("Fail^Please login again");
        }
        #endregion
        #region Profile
        public ActionResult UserProfile()
        {
            //var Reg = _Registration.SelectAll().Where(x => x.UserId == 1006).FirstOrDefault();
            //return View(Reg);
            if (GetUser() != null)
            {
                var Reg = _Registration.SelectAll().Where(x => x.UserId == _userIdentity.UserId).FirstOrDefault();
                return View(Reg);
            }
            else
            {

                return RedirectToAction("Login");
            }

        }
        public JsonResult UpdateProfile(string Name,string Dob,string Email,string Gender)
        {
            if (GetUser() != null)
            {
                Registration RegData = _Registration.SelectAll().Where(x => x.UserId == _userIdentity.UserId).FirstOrDefault();
                RegData.Name = Name;
                RegData.DOB = Dob;
                RegData.Email = Email == null ? "" : Email;
                RegData.Gender = Gender;
                _Registration.Save();
                return Json("Successfully Updated");
            }
            else
            {
                return Json("Login");
            }
            
        }
        #endregion
        public ActionResult UserPanel()
        {
            Session["PID"] = null;
            if (GetUser() != null)
            {
                var reg = Session["UserDetails"] as Registration;
                UpdateLogger(reg.UserId, "Logged by mobileno- " + reg.UserMobile.ToString());

                return View(reg);
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        #region Password Encrystiption

        public string CreatePasswordHash(string pwd, string salt)
        {
            string pwdAndSalt = String.Concat(pwd, salt);
            string hashedPwd = FormsAuthentication.HashPasswordForStoringInConfigFile(pwdAndSalt, "sha1");

            return hashedPwd;

        }

        #endregion

        #region Password Encyption
        //public string CreateSalt()
        //{
        //    RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
        //    byte[] buff = new byte[32];
        //    rng.GetBytes(buff);

        //    return Convert.ToBase64String(buff);
        //}
        //private string Encryptdata(string password)
        //{
        //    string strmsg = string.Empty;
        //    byte[] encode = new byte[password.Length];
        //    encode = Encoding.UTF8.GetBytes(password);
        //    strmsg = Convert.ToBase64String(encode);
        //    return strmsg;
        //}
        //private string Decryptdata(string decryptPwd)
        //{
        //    string decryptpwd = string.Empty;
        //    UTF8Encoding encodepwd = new UTF8Encoding();
        //    Decoder Decode = encodepwd.GetDecoder();
        //    byte[] todecode_byte = Convert.FromBase64String(decryptPwd);
        //    int charCount = Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
        //    char[] decoded_char = new char[charCount];
        //    Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
        //    decryptpwd = new String(decoded_char);
        //    return decryptpwd;
        //}
        ////
        //public string base64Encode(string sData)
        //{
        //    try
        //    {
        //        byte[] encData_byte = new byte[sData.Length];

        //        encData_byte = System.Text.Encoding.UTF8.GetBytes(sData);

        //        string encodedData = Convert.ToBase64String(encData_byte);

        //        return encodedData;

        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error in base64Encode" + ex.Message);
        //    }
        //}
        ////DECODE

        //public string base64Decode(string sData)
        //{
        //    try
        //    {
        //        System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();

        //        System.Text.Decoder utf8Decode = encoder.GetDecoder();

        //        byte[] todecode_byte = Convert.FromBase64String(sData);

        //        int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);

        //        char[] decoded_char = new char[charCount];

        //        utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);

        //        string result = new String(decoded_char);

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error in base64Decode" + ex.Message);
        //    }
        //}

        // string encode = base64Encode(val);

        // string decode = base64Decode(val);
        #endregion
    }
}