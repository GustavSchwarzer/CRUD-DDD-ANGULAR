using Common.Domain.Base;
using Common.Domain.Interfaces;
using Common.Domain.Model;
using Common.Validation;
using Seed.Domain.Entitys;
using Seed.Domain.Filter;
using Seed.Domain.Interfaces.Repository;
using Seed.Domain.Validations;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Domain.Services
{
    public class FinancialSystemServiceBase : ServiceBase<FinancialSystem>
    {
        protected readonly IFinancialSystemRepository _rep;
        protected readonly IValidatorSpecification<FinancialSystem> _validation;
        protected readonly IWarningSpecification<FinancialSystem> _warning;


        public FinancialSystemServiceBase(IFinancialSystemRepository rep, IValidatorSpecification<FinancialSystem> validation, IWarningSpecification<FinancialSystem> warning, ICache cache, CurrentUser user)
            : base(cache)
        {
            this._rep = rep;
            this._user = user;
            this._validation = validation;
            this._warning = warning;
        }

        public virtual async Task<FinancialSystem> GetOne(FinancialSystemFilter filters)
        {
            return await this._rep.GetById(filters);
        }

        public virtual async Task<IEnumerable<FinancialSystem>> GetByFilters(FinancialSystemFilter filters)
        {
            var queryBase = this._rep.GetBySimplefilters(filters);
            return await this._rep.ToListAsync(queryBase);
        }

        public virtual Task<PaginateResult<FinancialSystem>> GetByFiltersPaging(FinancialSystemFilter filters)
        {
            var queryBase = this._rep.GetBySimplefilters(filters);
            return this._rep.PagingAndDefineFields(filters, queryBase);
        }

        public override void Remove(FinancialSystem financialsystem)
        {
            this._rep.Remove(financialsystem);
        }

        public virtual Summary GetSummary(PaginateResult<FinancialSystem> paginateResult)
        {
            return new Summary
            {
                Total = paginateResult.TotalCount,
				PageSize = paginateResult.PageSize,
            };
        }

        public virtual ValidationSpecificationResult GetDomainValidation(FilterBase filters = null)
        {
            return this._validationResult;
        }

        public virtual ConfirmEspecificationResult GetDomainConfirm(FilterBase filters = null)
        {
            return this._validationConfirm;
        }

        public virtual WarningSpecificationResult GetDomainWarning(FilterBase filters = null)
        {
            return this._validationWarning;
        }

        public override async Task<FinancialSystem> Save(FinancialSystem financialsystem, bool questionToContinue = false)
        {
			var financialsystemOld = await this.GetOne(new FinancialSystemFilter { FinancialSystemId = financialsystem.FinancialSystemId, QueryOptimizerBehavior = "OLD" });
			var financialsystemOrchestrated = await this.DomainOrchestration(financialsystem, financialsystemOld);

            if (questionToContinue)
            {
                if (this.Continue(financialsystemOrchestrated, financialsystemOld) == false)
                    return financialsystemOrchestrated;
            }

            return this.SaveWithValidation(financialsystemOrchestrated, financialsystemOld);
        }

        public override async Task<FinancialSystem> SavePartial(FinancialSystem financialsystem, bool questionToContinue = false)
        {
            var financialsystemOld = await this.GetOne(new FinancialSystemFilter { FinancialSystemId = financialsystem.FinancialSystemId, QueryOptimizerBehavior = "OLD" });
			var financialsystemOrchestrated = await this.DomainOrchestration(financialsystem, financialsystemOld);

            if (questionToContinue)
            {
                if (this.Continue(financialsystemOrchestrated, financialsystemOld) == false)
                    return financialsystemOrchestrated;
            }

            return SaveWithOutValidation(financialsystemOrchestrated, financialsystemOld);
        }

        protected override FinancialSystem SaveWithOutValidation(FinancialSystem financialsystem, FinancialSystem financialsystemOld)
        {
            financialsystem = this.SaveDefault(financialsystem, financialsystemOld);
			this._cacheHelper.ClearCache();

			if (!financialsystem.IsValid())
			{
				this._validationResult = financialsystem.GetDomainValidation();
				this._validationWarning = financialsystem.GetDomainWarning();
				return financialsystem;
			}

            this._validationResult = new ValidationSpecificationResult
            {
                Errors = new List<string>(),
                IsValid = true,
                Message = "Alterado com sucesso."
            };
            
            return financialsystem;
        }

		protected override FinancialSystem SaveWithValidation(FinancialSystem financialsystem, FinancialSystem financialsystemOld)
        {
            if (!this.IsValid(financialsystem))
				return financialsystem;
            
            financialsystem = this.SaveDefault(financialsystem, financialsystemOld);
            this._validationResult = new ValidationSpecificationResult
            {
                Errors = new List<string>(),
                IsValid = true,
                Message = "Inserido com sucesso."
            };

            this._cacheHelper.ClearCache();
            return financialsystem;
        }
		
		protected virtual bool IsValid(FinancialSystem entity)
        {
            var isValid = true;
            if (!this.DataAnnotationIsValid() || !entity.IsValid())
            {
                if (this._validationResult.IsNull())
                    this._validationResult = entity.GetDomainValidation();
                else
                    this._validationResult.Merge(entity.GetDomainValidation());

                if (this._validationWarning.IsNull())
                    this._validationWarning = entity.GetDomainWarning();
                else
                    this._validationWarning.Merge(entity.GetDomainWarning());

                isValid = false;
            }

            this.Specifications(entity);
            if (!this._validationResult.IsValid)
                isValid = false;

            return isValid;
        }

		protected virtual void Specifications(FinancialSystem financialsystem)
        {
            this._validationResult  = this._validationResult.Merge(this._validation.Validate(financialsystem));
			this._validationWarning  = this._validationWarning.Merge(this._warning.Validate(financialsystem));
        }

        protected virtual FinancialSystem SaveDefault(FinancialSystem financialsystem, FinancialSystem financialsystemOld)
        {
			

            var isNew = financialsystemOld.IsNull();			
            if (isNew)
                financialsystem = this.AddDefault(financialsystem);
            else
				financialsystem = this.UpdateDefault(financialsystem);

            return financialsystem;
        }
		
        protected virtual FinancialSystem AddDefault(FinancialSystem financialsystem)
        {
            financialsystem = this._rep.Add(financialsystem);
            return financialsystem;
        }

		protected virtual FinancialSystem UpdateDefault(FinancialSystem financialsystem)
        {
            financialsystem = this._rep.Update(financialsystem);
            return financialsystem;
        }
				
		public virtual async Task<FinancialSystem> GetNewInstance(dynamic model, CurrentUser user)
        {
            return await Task.Run(() =>
            {
                return new FinancialSystem.FinancialSystemFactory().GetDefaultInstance(model, user);
            });
         }

		public virtual async Task<FinancialSystem> GetUpdateInstance(dynamic model, CurrentUser user)
        {
            return await Task.Run(() =>
            {
                return new FinancialSystem.FinancialSystemFactory().GetDefaultInstance(model, user);
            });
         }
    }
}
