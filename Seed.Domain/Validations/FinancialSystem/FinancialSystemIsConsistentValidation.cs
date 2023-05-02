using Common.Validation;
using Seed.Domain.Entitys;
using System;

namespace Seed.Domain.Validations
{
    public class FinancialSystemIsConsistentValidation : ValidatorSpecification<FinancialSystem>
    {
        public FinancialSystemIsConsistentValidation()
        {
            //base.Add(Guid.NewGuid().ToString(), new Rule<FinancialSystem>(Instance of is consistent specification,"message for user"));
        }

    }
}
