using Common.Domain.Interfaces;
using Common.Domain.Model;
using Common.Validation;
using Seed.Domain.Entitys;
using Seed.Domain.Interfaces.Repository;
using Seed.Domain.Interfaces.Services;

namespace Seed.Domain.Services
{
    public class FinancialSystemService : FinancialSystemServiceBase, IFinancialSystemService
    {

        public FinancialSystemService(IFinancialSystemRepository rep, IValidatorSpecification<FinancialSystem> validation, IWarningSpecification<FinancialSystem> warning, ICache cache, CurrentUser user) 
            : base(rep, validation, warning, cache, user)
        {


        }
        
    }
}
