using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Seed.Domain.Entitys;

namespace Seed.Data.Map
{
    public abstract class FinancialSystemMapBase 
    {
        protected abstract void CustomConfig(EntityTypeBuilder<FinancialSystem> type);

        public FinancialSystemMapBase(EntityTypeBuilder<FinancialSystem> type)
        {
            
            type.ToTable("FinancialSystem");
            type.Property(t => t.FinancialSystemId).HasColumnName("Id");
           

            type.Property(t => t.Month).HasColumnName("Month");
            type.Property(t => t.Year).HasColumnName("Year");
            type.Property(t => t.ClosingDay).HasColumnName("ClosingDay");
            type.Property(t => t.GenerateExpenseCopy).HasColumnName("GenerateExpenseCopy");
            type.Property(t => t.MonthCopy).HasColumnName("MonthCopy");
            type.Property(t => t.YearCopy).HasColumnName("YearCopy");
            type.Property(t => t.Name).HasColumnName("Name").HasColumnType("nvarchar(max)");


            type.HasKey(d => new { d.FinancialSystemId, }); 

			CustomConfig(type);
        }
		
    }
}