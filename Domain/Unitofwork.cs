using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public   class Unitofwork : IUnitofwork  ,IDisposable
    {   
        private readonly DbContext _context;
     
        public Unitofwork(DbContext context)
        {
            _context = context;
        }
              
       
        private IRepository<Registration> _Registration;
        public IRepository<Registration> Registrations
        {
            get
            {

                if (_Registration == null)
                    _Registration = new Repository<Registration>(_context);
                return _Registration;
            }
        }
        public int Commit()
        {
            return _context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            System.GC.SuppressFinalize(this);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
