using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    [Table("Registration")]
    public class Registration
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long UserId { get; set; }
        public string UserMobile { get; set; }
        public string UserPass { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string DOB { get; set; }
        public string ProfilImage { get; set; }
        public string ResetPassword { get; set; }
        public DateTime CreatedAt { get; set; }
        public int RoleID { get; set; }
        public bool IsActive { get; set; }
    }
    [Table("UserLogger")]
    public class UserLogger
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }
        public long UserID { get; set; }
        public string UserIP { get; set; }
        public string Description { get; set; }
        public DateTime CreateAt { get; set; }
    }
    [Table("DepartmentMaster")]
    public class DepartmentMaster
    {
        //    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int DeptID { get; set; }
        public string DepartmentName { get; set; }
        public DateTime Date { get; set; }


    }
    [Table("TokenRegistration")] 
    public class TokenRegistration
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set;}
        public string Mobile { get; set; }
        public string Age { get; set; }
        public int CounterNumberID { get; set; }
        public int DepartmentID { get; set; }
        public string Gender { get; set; }
        public string TokenNumber { get; set; }
        public string Payment { get; set; }
        public DateTime Date { get; set; }
    }
}
