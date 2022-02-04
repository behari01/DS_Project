using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<UserNxenesi, UserNxenesi>();
            CreateMap<Ankes , Ankes>();
            CreateMap<Book , Book>();
            CreateMap<Note , Note>();
            CreateMap<Sesion , Sesion>();
        }
    }
}