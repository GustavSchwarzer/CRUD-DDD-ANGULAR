using AutoMapper;
using Common.API;
using Common.API.Extensions;
using Common.Domain.Base;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Seed.Application.Config;
using Seed.CrossCuting;
using Seed.Data.Context;
using System.Globalization;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Seed.Api
{
    public class Startup
    {
		private readonly IWebHostEnvironment _env;

        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
			this._env = env;
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			//Camelcase para json
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                options.JsonSerializerOptions.WriteIndented = false;
                options.JsonSerializerOptions.AllowTrailingCommas = true;
                options.JsonSerializerOptions.Converters.Add(new StringJsonConverter());
				options.JsonSerializerOptions.Converters.Add(new DatimeJsonConverter());
            });

            services.AddDbContext<DbContextSeed>(
             options => options.UseSqlServer(
                 Configuration
                    .GetSection("ConfigConnectionString:Default").Value));

            services.AddDistributedRedisCache(options =>
            {
                options.Configuration = Configuration.GetSection("ConfigCache:Default").Value;
                options.InstanceName = "Seed";
            });

            //Services Configuration
            services.Configure<ConfigSettingsBase>(Configuration.GetSection("ConfigSettings"));
			services.Configure<ConfigStorageConnectionStringBase>(Configuration.GetSection("ConfigStorage"));
            services.AddSingleton<IConfiguration>(Configuration);
			services.AddSingleton(new EnviromentInfo
            {
                RootPath = this._env.ContentRootPath
            });

            //Logging
            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddConfiguration(Configuration.GetSection("Logging"));
                loggingBuilder.AddConsole();
                loggingBuilder.AddDebug();
            });



            // Add cross-origin resource sharing services Configurations
            var configuration = new ConfigSettingsBase();
            Configuration.GetSection("ConfigSettings").Bind(configuration);
            Cors.Enable(services, configuration.ClientAuthorityEndPoint.ToArray());
			
            
            //AutoMapper
            services.AddAutoMapper(AutoMapperConfigSeed.RegisterMappings());

            // Add application services.
            ConfigContainerSeed.Config(services);

            //Policys
            //services.AddAuthorizationPolicy(ProfileCustom.Define);


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, IOptions<ConfigSettingsBase> configSettingsBase)
        {

            //Errors
			if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            //Logging File
            loggerFactory.AddFile(Configuration.GetSection("Logging"));


            //Cultue
            var supportedCultures = new[]
            {
                new CultureInfo("pt-BR"),
            };
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture(culture: "pt-BR", uiCulture: "pt-BR"),
                // Formatting numbers, dates, etc.
                SupportedCultures = supportedCultures,
                // UI strings that we have localized.
                SupportedUICultures = supportedCultures
            });

            app.UseCors("AllowStackOrigin");
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();
            app.AddTokenMiddlewareCustom();
            app.UseEndpoints(_ => _.MapControllers());
        }

    }
}
