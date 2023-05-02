﻿using Common.Cache;
using Common.Domain.Interfaces;
using Common.Orm;
using Common.Validation;
using Microsoft.Extensions.DependencyInjection;
using Seed.Application;
using Seed.Application.Interfaces;
using Seed.Data.Context;
using Seed.Data.Repository;
using Seed.Domain.Entitys;
using Seed.Domain.Interfaces.Repository;
using Seed.Domain.Interfaces.Services;
using Seed.Domain.Services;
using Seed.Domain.Validations;

namespace Seed.Api
{
    public static partial class ConfigContainerSeed
    {

        public static void Config(IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork<DbContextSeed>>();
            
			services.AddScoped<IValidatorSpecification<FinancialSystem>,FinancialSystemIsSuitableValidation>();
			services.AddScoped<IWarningSpecification<FinancialSystem>, FinancialSystemIsSuitableWarning>();
			services.AddScoped<IFinancialSystemApplicationService, FinancialSystemApplicationService>();
			services.AddScoped<IFinancialSystemService, FinancialSystemService>();
			services.AddScoped<IFinancialSystemRepository, FinancialSystemRepository>();



            RegisterOtherComponents(services);
        }
    }
}
