using hospital_backend.Extensions;
using hospital_backend.Persistence;
using Microsoft.EntityFrameworkCore;

namespace hospital_backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.RegisterAuthentication();
            builder.Services.AddAuthToSwagger();

            builder.Services.AddDbContext<HospitalDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
