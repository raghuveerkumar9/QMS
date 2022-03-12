using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
   public interface IRepository<T> where T : class // , IDisposable
    {
        IEnumerable<T> SelectAll();
        T Find(object id);
        void Add(T obj);
        void AddRang(List<T> obj);
        void Update(T obj);
        void Delete(object id);
        void Save();
         DbRawSqlQuery<T> SQLQuery<T>(string sql, params object[] parameters);
        
    }
     
}
