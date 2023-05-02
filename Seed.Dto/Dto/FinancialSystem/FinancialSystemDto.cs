using System.ComponentModel.DataAnnotations;
using Common.Domain.Base;
using System;

namespace Seed.Dto
{
	public class FinancialSystemDto  : DtoBase
	{
	
        

        public virtual int FinancialSystemId {get; set;}

        [Required(ErrorMessage="FinancialSystem - Campo Month é Obrigatório")]
        public virtual int Month {get; set;}

        [Required(ErrorMessage="FinancialSystem - Campo Year é Obrigatório")]
        public virtual int Year {get; set;}

        [Required(ErrorMessage="FinancialSystem - Campo ClosingDay é Obrigatório")]
        public virtual int ClosingDay {get; set;}

        [Required(ErrorMessage="FinancialSystem - Campo GenerateExpenseCopy é Obrigatório")]
        public virtual bool GenerateExpenseCopy {get; set;}

        [Required(ErrorMessage="FinancialSystem - Campo MonthCopy é Obrigatório")]
        public virtual int MonthCopy {get; set;}

        [Required(ErrorMessage="FinancialSystem - Campo YearCopy é Obrigatório")]
        public virtual int YearCopy {get; set;}

        [Required(ErrorMessage="FinancialSystem - Campo Name é Obrigatório")]
        public virtual string Name {get; set;}


		
	}
}
