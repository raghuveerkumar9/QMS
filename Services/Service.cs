using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Service
{
    public class Service<T> : IService<Registration> where T : class
    {
        IUnitofwork _unitOfWork;
       // IRepository<T> _repository;
        public Service(IUnitofwork unitOfWork, IRepository<Registration> repository)  
        {
            _unitOfWork = unitOfWork;
          //  _repository = repository;
        }
        public void Create(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            //_repository.Add(entity);
            _unitOfWork.Commit();
        }

        public void Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Registration> GetAll()
        {
            return _unitOfWork.Registrations.SelectAll().ToList();
        }

        public void Update(T entity)
        {
            throw new NotImplementedException();
        }

        public void Create(Registration entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(Registration entity)
        {
            throw new NotImplementedException();
        }

        IEnumerable<Registration> IService<Registration>.GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(Registration entity)
        {
            throw new NotImplementedException();
        }
    }
}
