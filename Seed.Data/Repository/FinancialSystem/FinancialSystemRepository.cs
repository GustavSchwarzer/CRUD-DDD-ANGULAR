using Common.Domain.Base;
using Common.Orm;
using Seed.Data.Context;
using Seed.Domain.Entitys;
using Seed.Domain.Filter;
using Seed.Domain.Interfaces.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System;
using Common.Domain.Model;

namespace Seed.Data.Repository
{
    public class FinancialSystemRepository : Repository<FinancialSystem>, IFinancialSystemRepository
    {
        private CurrentUser _user;
        public FinancialSystemRepository(DbContextSeed ctx, CurrentUser user) : base(ctx)
        {
			this._user = user;
        }

      
        public IQueryable<FinancialSystem> GetBySimplefilters(FinancialSystemFilter filters)
        {
            var querybase = this.GetAll(this.DataAgregation(filters))
								.WithBasicFilters(filters)
								.WithCustomFilters(filters)
								.OrderByDomain(filters)
                                .OrderByProperty(filters);
            return querybase;
        }

        public async Task<FinancialSystem> GetById(FinancialSystemFilter model)
        {
            var _financialsystem = await this.SingleOrDefaultAsync(this.GetAll(this.DataAgregation(model))
               .Where(_=>_.FinancialSystemId == model.FinancialSystemId));

            return _financialsystem;
        }

		public async Task<IEnumerable<dynamic>> GetDataItem(FinancialSystemFilter filters)
        {
            var querybase = await this.ToListAsync(this.GetBySimplefilters(filters).Select(_ => new
            {
                Id = _.FinancialSystemId,
				Name = _.Month
            })); 

            return querybase;
        }

        public async Task<IEnumerable<dynamic>> GetDataListCustom(FinancialSystemFilter filters)
        {
            var querybase = await this.ToListAsync(this.GetBySimplefilters(filters).Select(_ => new
            {
                Id = _.FinancialSystemId

            }));

            return querybase;
        }

		
        public async Task<PaginateResult<dynamic>> GetDataListCustomPaging(FinancialSystemFilter filters)
        {
            var querybase = await this.PagingDataListCustom<dynamic>(filters, this.GetBySimplefilters(filters).Select(_ => new
            {
                Id = _.FinancialSystemId
            }));
            return querybase;
        }

        public async Task<dynamic> GetDataCustom(FinancialSystemFilter filters)
        {
            var querybase = await this.ToListAsync(this.GetBySimplefilters(filters).Select(_ => new
            {
               Id = _.FinancialSystemId

            }));

            return querybase;
        }

        protected override dynamic DefineFieldsGetOne(IQueryable<FinancialSystem> source, string queryOptimizerBehavior)
        {
            if (queryOptimizerBehavior == "queryOptimizerBehavior")
            {
                return source.Select(_ => new
                {

                });
            }
            return source;
        }

        protected override IQueryable<dynamic> DefineFieldsGetByFilters(IQueryable<FinancialSystem> source, FilterBase filters)
        {
			if (filters.QueryOptimizerBehavior == "queryOptimizerBehavior")
            {
                return source.Select(_ => new
                {

                });
            }
            return source;

        }

        protected override IQueryable<FinancialSystem> MapperGetByFiltersToDomainFields(IQueryable<FinancialSystem> source, IEnumerable<dynamic> result, string queryOptimizerBehavior)
        {
            if (queryOptimizerBehavior == "queryOptimizerBehavior")
            {
                return result.Select(_ => new FinancialSystem
                {

                }).AsQueryable();
            }

            return result.Select(_ => (FinancialSystem)_).AsQueryable();

        }

        protected override FinancialSystem MapperGetOneToDomainFields(IQueryable<FinancialSystem> source, dynamic result, string queryOptimizerBehavior)
        {
            if (queryOptimizerBehavior == "queryOptimizerBehavior")
            {
                return new FinancialSystem
                {

                };
            }

            return source.SingleOrDefault();
        }

		protected override Expression<Func<FinancialSystem, object>>[] DataAgregation(Expression<Func<FinancialSystem, object>>[] includes, FilterBase filter)
        {
            return base.DataAgregation(includes, filter);
        }

    }
}
