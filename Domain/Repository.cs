using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Remoting.Contexts;
//using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
//using GenericwithUnitofwork.Models;

namespace Domain
{
    public class Repository<T> : IRepository<T> where T : class // , IDisposable
    {
        private AppCtx db = null;
        private DbSet<T> table = null;
        private DbContext _context;

        public Repository()
        {
            this.db = new AppCtx();
            table = db.Set<T>();
        }

        public Repository(DbContext _context)
        {
            this._context = _context;
        }

        //public Repository(AppCtx db)
        //{
        //    this.db = db;
        //    table = db.Set<T>();
        //}


        public IEnumerable<T> SelectAll()
        {
            return table.ToList();
        }

        public T Find(object id)
        {

            return table.Find(id);
        }
        public void Add(T obj)
        {
            table.Add(obj);
        }
        public void AddRang(List<T> obj)
        {
            table.AddRange(obj);
        }
      
        public void Update(T obj)
        {
            table.Attach(obj);
            db.Entry(obj).State = EntityState.Modified;
        }
        public void Delete(object id)
        {
            T existing = table.Find(id);
            table.Remove(existing);
        }
        public void Save()
        {
            db.SaveChanges();
        }

        public DbRawSqlQuery<T> SQLQuery<T>(string sql, params object[] parameters)
        {
            return db.Database.SqlQuery<T>(sql, parameters);
        }
        //private bool disposed = false;
        //protected virtual void Dispose(bool disposing)
        //{
        //    if (!this.disposed)
        //    {
        //        if (disposing)
        //        {
        //            db.Dispose();
        //        }
        //    }
        //    this.disposed = true;
        //}
        //public void Dispose()
        //{
        //    Dispose(true);
        //    GC.SuppressFinalize(this);
        //}


    }
}
