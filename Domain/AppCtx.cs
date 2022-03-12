using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Data.Entity.Infrastructure;
//using GenericwithUnitofwork.Models;

namespace Domain
{
    public class AppCtx : DbContext
    {
        public AppCtx() : base("name=DefaultConnection")
        {
        }
        public DbSet<Registration> Registrations { get; set; }
        public DbSet<TokenRegistration> TokenRegistrations { get; set; }
        public DbSet<DepartmentMaster> DepartmentMaster { get; set; }

        public static AppCtx Create()
        {
            return new AppCtx();
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

        }
    }
}
