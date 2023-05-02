using Common.Domain.Base;
using Common.Domain.CompositeKey;
using Common.Domain.Model;
using System;

namespace Seed.Domain.Filter
{
    public class FinancialSystemFilterBase : FilterBase
    {

        public virtual int FinancialSystemId { get; set;} 
        public virtual int Month { get; set;} 
        public virtual int Year { get; set;} 
        public virtual int ClosingDay { get; set;} 
        public virtual bool? GenerateExpenseCopy { get; set;} 
        public virtual int MonthCopy { get; set;} 
        public virtual int YearCopy { get; set;} 
        public virtual string Name { get; set;} 


        public override string CompositeKey(CurrentUser user) {
            return CompositeKeyExtensions.MakeCompositeKey(this, $"{user.GetSubjectId<int>()}");
        }

    }
}
