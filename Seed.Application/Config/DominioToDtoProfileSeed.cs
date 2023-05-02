using Seed.Domain.Entitys;
using Seed.Dto;

namespace Seed.Application.Config
{
    public class DominioToDtoProfileSeed : AutoMapper.Profile
    {

        public DominioToDtoProfileSeed()
        {
            CreateMap(typeof(FinancialSystem), typeof(FinancialSystemDto)).ReverseMap();
            CreateMap(typeof(FinancialSystem), typeof(FinancialSystemDtoSpecialized));
            CreateMap(typeof(FinancialSystem), typeof(FinancialSystemDtoSpecializedResult));
            CreateMap(typeof(FinancialSystem), typeof(FinancialSystemDtoSpecializedReport));
            CreateMap(typeof(FinancialSystem), typeof(FinancialSystemDtoSpecializedDetails));

        }

    }
}
