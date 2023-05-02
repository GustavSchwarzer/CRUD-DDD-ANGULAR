using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Seed.Domain.Entitys;

namespace Seed.Data.Map
{
    public class FinancialSystemMap : FinancialSystemMapBase
    {
        public FinancialSystemMap(EntityTypeBuilder<FinancialSystem> type) : base(type)
        {

        }

        protected override void CustomConfig(EntityTypeBuilder<FinancialSystem> type)
        {

        }

    }
}