using Common.Validation;
using Seed.Domain.Entitys;
using Seed.Domain.Interfaces.Repository;
using System;

namespace Seed.Domain.Validations
{
    public class FinancialSystemIsSuitableWarning : WarningSpecification<FinancialSystem>
    {
        public FinancialSystemIsSuitableWarning(IFinancialSystemRepository rep)
        {
            //base.Add(Guid.NewGuid().ToString(), new Rule<FinancialSystem>(Instance of suitable warning specification,"message for user"));
        }

    }
}
