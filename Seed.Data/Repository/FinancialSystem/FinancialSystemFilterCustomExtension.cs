using Common.Domain.Model;
using Seed.Domain.Entitys;
using Seed.Domain.Filter;
using System.Linq;

namespace Seed.Data.Repository
{
    public static class FinancialSystemFilterCustomExtension
    {

        public static IQueryable<FinancialSystem> WithCustomFilters(this IQueryable<FinancialSystem> queryBase, FinancialSystemFilter filters)
        {
            var queryFilter = queryBase;


            return queryFilter;
        }

		public static IQueryable<FinancialSystem> WithLimitTenant(this IQueryable<FinancialSystem> queryBase, CurrentUser user)
        {
            var tenantId = user.GetTenantId<int>();
			var queryFilter = queryBase;

            return queryFilter;
        }

    }
}

