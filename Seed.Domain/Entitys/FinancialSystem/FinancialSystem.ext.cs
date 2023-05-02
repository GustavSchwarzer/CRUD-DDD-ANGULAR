using Seed.Domain.Validations;
using System;
using Common.Domain.Model;

namespace Seed.Domain.Entitys
{
    public class FinancialSystem : FinancialSystemBase
    {

        public FinancialSystem()
        {

        }

		 public FinancialSystem(int financialsystemid, int month, int year, int closingday, bool generateexpensecopy, int monthcopy, int yearcopy, string name) : base(financialsystemid, month, year, closingday, generateexpensecopy, monthcopy, yearcopy, name) { }


		public class FinancialSystemFactory : FinancialSystemFactoryBase
        {
            public FinancialSystem GetDefaultInstance(dynamic data, CurrentUser user)
            {
				return GetDefaultInstanceBase(data, user);
            }
        }

        public bool IsValid()
        {
            base._validationResult = base._validationResult.Merge(new FinancialSystemIsConsistentValidation().Validate(this));
            return base._validationResult.IsValid;
        }
        
    }
}
