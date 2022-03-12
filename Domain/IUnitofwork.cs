using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
   public interface IUnitofwork :IDisposable
    {
       IRepository<Registration> Registrations { get; }
        void Save();
       // int Commit();
    }
}
