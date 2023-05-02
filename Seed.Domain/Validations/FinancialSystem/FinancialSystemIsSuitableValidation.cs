using Common.Validation;
using Seed.Domain.Entitys;
using Seed.Domain.Interfaces.Repository;
using System;

namespace Seed.Domain.Validations
{
    public class FinancialSystemIsSuitableValidation : ValidatorSpecification<FinancialSystem>
    {
        public FinancialSystemIsSuitableValidation(IFinancialSystemRepository rep)
        {
            //base.Add(Guid.NewGuid().ToString(), new Rule<FinancialSystem>(Instance of is suitable,"message for user"));
        }

    }
}
