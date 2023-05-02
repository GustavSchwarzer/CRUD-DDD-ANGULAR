using Common.Domain.Base;
using Common.Domain.Model;
using System;

namespace Seed.Domain.Entitys
{
    public class FinancialSystemBase : DomainBase
    {
        public FinancialSystemBase()
        {

        }

		public FinancialSystemBase(int financialsystemid, int month, int year, int closingday, bool generateexpensecopy, int monthcopy, int yearcopy, string name) 
        {
            this.FinancialSystemId = financialsystemid;
            this.Month = month;
            this.Year = year;
            this.ClosingDay = closingday;
            this.GenerateExpenseCopy = generateexpensecopy;
            this.MonthCopy = monthcopy;
            this.YearCopy = yearcopy;
            this.Name = name;

        }


		public class FinancialSystemFactoryBase
        {
            public virtual FinancialSystem GetDefaultInstanceBase(dynamic data, CurrentUser user)
            {
                var construction = new FinancialSystem(data.FinancialSystemId,
                                        data.Month,
                                        data.Year,
                                        data.ClosingDay,
                                        data.GenerateExpenseCopy,
                                        data.MonthCopy,
                                        data.YearCopy,
                                        data.Name);



				construction.SetConfirmBehavior(data.ConfirmBehavior);
				construction.SetAttributeBehavior(data.AttributeBehavior);
        		return construction;
            }

        }

        public virtual int FinancialSystemId { get; protected set; }
        public virtual int Month { get; protected set; }
        public virtual int Year { get; protected set; }
        public virtual int ClosingDay { get; protected set; }
        public virtual bool GenerateExpenseCopy { get; protected set; }
        public virtual int MonthCopy { get; protected set; }
        public virtual int YearCopy { get; protected set; }
        public virtual string Name { get; protected set; }



    }
}
