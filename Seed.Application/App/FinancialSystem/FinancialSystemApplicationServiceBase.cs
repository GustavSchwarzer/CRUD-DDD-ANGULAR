using Common.Domain.Base;
using Common.Domain.Interfaces;
using Common.Dto;
using Seed.Application.Interfaces;
using Seed.Domain.Entitys;
using Seed.Domain.Filter;
using Seed.Domain.Interfaces.Services;
using Seed.Dto;
using System.Threading.Tasks;
using Common.Domain.Model;
using System.Collections.Generic;
using AutoMapper;

namespace Seed.Application
{
    public class FinancialSystemApplicationServiceBase : ApplicationServiceBase<FinancialSystem, FinancialSystemDto, FinancialSystemFilter>, IFinancialSystemApplicationService
    {
        protected readonly ValidatorAnnotations<FinancialSystemDto> _validatorAnnotations;
        protected readonly IFinancialSystemService _service;
        protected readonly CurrentUser _user;

        public FinancialSystemApplicationServiceBase(IFinancialSystemService service, IUnitOfWork uow, ICache cache, CurrentUser user, IMapper mapper) :
            base(service, uow, cache, mapper, user)
        {
            base.SetTagNameCache("FinancialSystem");
            this._validatorAnnotations = new ValidatorAnnotations<FinancialSystemDto>();
            this._service = service;
			this._user = user;
        }

       protected override async Task<FinancialSystem> MapperDtoToDomain<TDS>(TDS dto)
        {
			return await Task.Run(() =>
            {
				var _dto = dto as FinancialSystemDtoSpecialized;
				this._validatorAnnotations.Validate(_dto);
				this._serviceBase.AddDomainValidation(this._validatorAnnotations.GetErros());
				var domain = this._service.GetNewInstance(_dto, this._user);
				return domain;
			});
        }

		protected override async Task<IEnumerable<FinancialSystem>> MapperDtoToDomain<TDS>(IEnumerable<TDS> dtos)
        {
			var domains = new List<FinancialSystem>();
			foreach (var dto in dtos)
			{
				var _dto = dto as FinancialSystemDtoSpecialized;
				this._validatorAnnotations.Validate(_dto);
				this._serviceBase.AddDomainValidation(this._validatorAnnotations.GetErros());
				var domain = await this._service.GetNewInstance(_dto, this._user);
				domains.Add(domain);
			}
			return domains;
			
        }


        protected override async Task<FinancialSystem> AlterDomainWithDto<TDS>(TDS dto)
        {
			return await Task.Run(() =>
            {
				var _dto = dto as FinancialSystemDto;
				var domain = this._service.GetUpdateInstance(_dto, this._user);
				return domain;
			});
        }



    }
}
