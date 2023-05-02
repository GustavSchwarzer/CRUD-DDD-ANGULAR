﻿using Common.Domain.Interfaces;
using Seed.Domain.Entitys;
using Seed.Domain.Filter;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Domain.Interfaces.Repository
{
    public interface IFinancialSystemRepository : IRepository<FinancialSystem>, IRepositoryExtensions<FinancialSystem, FinancialSystemFilter>
    {

    }
}
