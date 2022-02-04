using Application.Core;
using Application.Ankesat;
using Application.Books;
using Application.Notes;
using Application.Nxenesit;
using Application.Sesions;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){
            
             services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
           
           var connection = config.GetConnectionString("DitariDatabase");
           services.AddDbContext<DataContext>(options => options.UseSqlServer(connection));
           
           services.AddControllersWithViews();
                // .AddNewtonsoftJson(options =>
                // options.SerializerSettings.ReferenceLoopHandling = Newtonsoft
                // .Json.ReferenceLoopHandling.Ignore)
                // .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
                // = new DefaultContractResolver());
        
           services.AddCors(opt => {
               opt.AddPolicy("CorsPolicy", policy =>{
                   policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
               });
           });

           services.AddMediatR(typeof(List.Handler).Assembly);
           services.AddAutoMapper(typeof(MappingProfiles).Assembly);

           //Books
            services.AddMediatR(typeof(BookList.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            //Sesionet
            services.AddMediatR(typeof(SesionList.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            //Ankesat 
            services.AddMediatR(typeof(AnkesList.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            //Notes
            services.AddMediatR(typeof(NoteList.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
           
           return services;
        }
    }
}