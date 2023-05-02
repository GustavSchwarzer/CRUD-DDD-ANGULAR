using Common.Domain.Model;
using Seed.Domain.Entitys;
using Seed.Domain.Filter;
using System.Linq;

namespace Seed.Data.Repository
{
    public static class FinancialSystemOrderCustomExtension
    {

        public static IQueryable<FinancialSystem> OrderByDomain(this IQueryable<FinancialSystem> queryBase, FinancialSystemFilter filters)
        {
            return queryBase.OrderBy(_ => _.FinancialSystemId);
        }

    }
}

