using Seed.Domain.Entitys;
using Seed.Domain.Filter;
using System.Linq;

namespace Seed.Data.Repository
{
    public static class FinancialSystemFilterBasicExtension
    {

        public static IQueryable<FinancialSystem> WithBasicFilters(this IQueryable<FinancialSystem> queryBase, FinancialSystemFilter filters)
        {
            var queryFilter = queryBase;

			if (filters.Ids.IsSent()) queryFilter = queryFilter.Where(_ => filters.GetIds().Contains(_.FinancialSystemId));

            if (filters.FinancialSystemId.IsSent()) 
			{ 
				
				queryFilter = queryFilter.Where(_=>_.FinancialSystemId == filters.FinancialSystemId);
			}
            if (filters.Month.IsSent()) 
			{ 
				
				queryFilter = queryFilter.Where(_=>_.Month == filters.Month);
			}
            if (filters.Year.IsSent()) 
			{ 
				
				queryFilter = queryFilter.Where(_=>_.Year == filters.Year);
			}
            if (filters.ClosingDay.IsSent()) 
			{ 
				
				queryFilter = queryFilter.Where(_=>_.ClosingDay == filters.ClosingDay);
			}
            if (filters.GenerateExpenseCopy.IsSent()) 
			{ 
				
				queryFilter = queryFilter.Where(_=>_.GenerateExpenseCopy == filters.GenerateExpenseCopy);
			}
            if (filters.MonthCopy.IsSent()) 
			{ 
				
				queryFilter = queryFilter.Where(_=>_.MonthCopy == filters.MonthCopy);
			}
            if (filters.YearCopy.IsSent()) 
			{ 
				
				queryFilter = queryFilter.Where(_=>_.YearCopy == filters.YearCopy);
			}
            if (filters.Name.IsSent()) 
			{ 
				
				queryFilter = queryFilter.Where(_=>_.Name.Contains(filters.Name));
			}


            return queryFilter;
        }

		
    }
}