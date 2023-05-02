using Common.API;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Seed.Application.Interfaces;
using Seed.Domain.Filter;
using Seed.Dto;
using Seed.CrossCuting;
using System;

namespace Seed.Api.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class FinancialSystemController : ControllerBase<FinancialSystemDto>
    {
        public FinancialSystemController(IFinancialSystemApplicationService app, ILoggerFactory logger, IWebHostEnvironment env)
            : base(app, logger, env, new ErrorMapCustom())
        {



        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] FinancialSystemFilter filters)
        {
            return await base.Get<FinancialSystemFilter>(filters, "Seed - FinancialSystem");
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id, [FromQuery] FinancialSystemFilter filters)
        {
            if (id.IsSent()) filters.FinancialSystemId = id;
            return await base.GetOne(filters, "Seed - FinancialSystem");
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FinancialSystemDtoSpecialized dto)
        {
            return await base.Post(dto, "Seed - FinancialSystem");
        }

        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] FinancialSystemDtoSpecialized dto)
        {
            return await base.Put(dto, "Seed - FinancialSystem");
        }


        [AllowAnonymous]
        [HttpDelete]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, FinancialSystemDtoSpecialized dto)
        {
            if (id.IsSent()) dto.FinancialSystemId = id;
            return await base.Delete(dto, "Seed - FinancialSystem");
        }
        


    }
}
