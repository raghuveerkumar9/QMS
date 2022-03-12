using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Domain
{
    public class Mainservices
    {
        private readonly IRepository<Registration> _Registration = null;
        private static string userName = "";// Convert.ToString(ConfigurationManager.AppSettings["smsUser"]);
        private static string password = "";// Convert.ToString(ConfigurationManager.AppSettings["smsPass"]);
        public Mainservices()
        {
            this._Registration = new Repository<Registration>();
        }
        public static string TimeAgo(DateTime date)
        {
            var timeSince = DateTime.Now.Subtract(date);
            if (timeSince.TotalMilliseconds < 1) return "not yet";
            if (timeSince.TotalMinutes < 1) return "just now";
            if (timeSince.TotalMinutes < 2) return "1 minute ago";
            if (timeSince.TotalMinutes < 60) return $"{timeSince.Minutes} minutes ago";
            if (timeSince.TotalMinutes < 120) return "1 hour ago";
            if (timeSince.TotalHours < 24) return $"{timeSince.Hours} hours ago";
            if (timeSince.TotalDays < 2) return "yesterday";
            if (timeSince.TotalDays < 7) return $"{timeSince.Days} days ago";
            if (timeSince.TotalDays < 14) return "last week";
            if (timeSince.TotalDays < 21) return "2 weeks ago";
            if (timeSince.TotalDays < 28) return "3 weeks ago";
            if (timeSince.TotalDays < 60) return "last month";
            if (timeSince.TotalDays < 365) return $"{Math.Round(timeSince.TotalDays / 30)} months ago";
            return timeSince.TotalDays < 730 ? "last year" : $"{Math.Round(timeSince.TotalDays / 365)} years ago";
        }


        public static string SendMessage(string Phone, string Msg)
        {
            WebClient client = new WebClient();
            string baseurl = "http://bulksms.mysmsmantra.com:8080/WebSMS/SMSAPI.jsp?";
            baseurl = baseurl + "username=" + userName + "&password=" + password + "&sendername=AISTRN&mobileno=" + Phone + "&message=" + Msg + "";
            Stream data = client.OpenRead(baseurl);
            StreamReader reader = new StreamReader(data);
            string response = reader.ReadToEnd();
            data.Close();
            reader.Close();
            return response;
        }
        public static string CheckBlance()
        {

            WebClient client = new WebClient();
            string baseurl = "http://bulksms.mysmsmantra.com:8080/WebSMS/balance.jsp?";
            baseurl = baseurl + "username=" + userName + "&password=" + password + " ";


            //  string baseurl = "http://bulksms.mysmsmantra.com:8080/WebSMS/SMSAPI.jsp?username=xxxxx&password=xxxxxx&sendername=xxxxx&mobileno=xxxxxxx&message=xxxxxxx";
            Stream data = client.OpenRead(baseurl);
            StreamReader reader = new StreamReader(data);
            string response = reader.ReadToEnd();
            data.Close();
            reader.Close();
            return response;
        }

        public static string GeneratePassword()
        {
            const string passwordLength = "4";
            var newPassword = "";

            var allowedChars = "";
            allowedChars = "1,2,3,4,5,6,7,8,9,0";
            //allowedChars += "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,";
            //allowedChars += "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,";


            char[] sep = { ',' };
            var arr = allowedChars.Split(sep);


            var idString = "";

            var rand = new Random();

            for (var i = 0; i < Convert.ToInt32(passwordLength); i++)
            {
                var temp = arr[rand.Next(0, arr.Length)];
                idString += temp;
                newPassword = idString;

            }
            return newPassword;
        }
        public static string ImageNameGenerator()
        {
            const string passwordLength = "7";
            var newPassword = "";

            var allowedChars = "";
            allowedChars = "1,2,3,4,5,6,7,8,9,0";
            allowedChars += "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,";
            allowedChars += "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,";


            char[] sep = { ',' };
            var arr = allowedChars.Split(sep);


            var idString = "";

            var rand = new Random();

            for (var i = 0; i < Convert.ToInt32(passwordLength); i++)
            {
                var temp = arr[rand.Next(0, arr.Length)];
                idString += temp;
                newPassword = idString;

            }
            return newPassword;
        }

        public static string ReferralCodeGenerator()
        {
            const string passwordLength = "7";
            var newCode = "";

            var allowedChars = "";
            allowedChars = "1,2,3,4,5,6,7,8,9,0";
            allowedChars += "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,";
           // allowedChars += "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,";


            char[] sep = { ',' };
            var arr = allowedChars.Split(sep);

            var idString = "";

            var rand = new Random();

            for (var i = 0; i < Convert.ToInt32(passwordLength); i++)
            {
                var temp = arr[rand.Next(0, arr.Length)];
                idString += temp;
                newCode = idString;
            }
             
            return newCode;
        }
       
        public void sendmail1()
        {
            try
            {
                var fromAddress = new MailAddress("enquiry.sscs@gmail.com", "SSCS Auto reply");
                var toAddress = new MailAddress("raghuveer.kumar9@gmail.com", "Raghu");
                const string fromPassword = "INFO@2020";
                const string subject = "test";
                const string body = "Hey now!!";
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                    Timeout = 20000
                };
                // SmtpClient.UseDefaultCredentials = false.
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }
            }
            catch
            {

            }
        }


        public bool SendEmail(string strToMail, string strSubject, string strBody)
        {
            bool bResult = false;
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    string displayName = Convert.ToString(ConfigurationManager.AppSettings["smtpDisplayName"]);
                    mail.To.Add(strToMail.Trim());
                    //if (!string.IsNullOrEmpty(strToMail.Trim()))
                    //{
                    //    string[] words = strToMail.Trim().Split(',');
                    //    foreach (string word in words)
                    //    {

                    //        mail.To.Add(word.Trim());
                    //    }
                    //}
                    mail.From = new MailAddress(Convert.ToString(ConfigurationManager.AppSettings["smtpUser"]), displayName);
                    mail.Bcc.Add(Convert.ToString(ConfigurationManager.AppSettings["bccMail"]));
                    mail.Subject = strSubject.Trim();
                    mail.Body = strBody.Trim();
                    mail.IsBodyHtml = true;
                    using (SmtpClient smtp = new SmtpClient())
                    {
                        smtp.Host = Convert.ToString(ConfigurationManager.AppSettings["smtpServer"]);
                        smtp.Port = Convert.ToInt32(ConfigurationManager.AppSettings["smtpPort"]);

                        smtp.EnableSsl = Convert.ToBoolean(ConfigurationManager.AppSettings["EnableSsl"]);
                        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential(Convert.ToString(ConfigurationManager.AppSettings["smtpUser"]), Convert.ToString(ConfigurationManager.AppSettings["smtpPass"]));
                        smtp.Timeout = 20000;
                        smtp.Send(mail);
                        bResult = true;
                    }
                }
                return bResult;
            }
            catch (Exception ex)
            {
                //  Logger.SaveErrorLog(this.ToString(), MethodBase.GetCurrentMethod().Name, ex);
                return false;
            }
        }
    }

}