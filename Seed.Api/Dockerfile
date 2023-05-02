##See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.
#
#FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
#WORKDIR /app
#EXPOSE 80
#EXPOSE 443
#
#FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
#WORKDIR /src
#COPY ["Seed.Api/Seed.Api.csproj", "Seed.Api/"]
#COPY ["Common.API/Common.API.csproj", "Common.API/"]
#COPY ["Common.Domain/Common.Domain.csproj", "Common.Domain/"]
#COPY ["Common.Dto/Common.Dto.csproj", "Common.Dto/"]
#COPY ["Common.Cache/Common.Cache.csproj", "Common.Cache/"]
#COPY ["Seed.Application/Seed.Application.csproj", "Seed.Application/"]
#COPY ["Common.App/Common.App.csproj", "Common.App/"]
#COPY ["Seed.CrossCuting/Seed.CrossCuting.csproj", "Seed.CrossCuting/"]
#COPY ["Common.Orm/Common.Orm.csproj", "Common.Orm/"]
#COPY ["Seed.Domain/Seed.Domain.csproj", "Seed.Domain/"]
#COPY ["Common.Validation/Common.Validation.csproj", "Common.Validation/"]
#COPY ["Seed.Domain.Filter/Seed.Domain.Filter.csproj", "Seed.Domain.Filter/"]
#COPY ["Seed.Enums/Seed.Enums.csproj", "Seed.Enums/"]
#COPY ["Seed.Dto/Seed.Dto.csproj", "Seed.Dto/"]
#COPY ["Seed.CrossCuting.Auth/Seed.CrossCuting.Auth.csproj", "Seed.CrossCuting.Auth/"]
#COPY ["Seed.Data/Seed.Data.csproj", "Seed.Data/"]
#RUN dotnet restore "Seed.Api/Seed.Api.csproj"
#COPY . .
#WORKDIR "/src/Seed.Api"
#RUN dotnet build "Seed.Api.csproj" -c Release -o /app/build
#
#FROM build AS publish
#RUN dotnet publish "Seed.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "Seed.Api.dll"]