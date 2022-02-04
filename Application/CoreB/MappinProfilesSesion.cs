using AutoMapper;
using Domain;

namespace Application.CoreB
{
    public class MappingProfilesSesion : Profile
    {

        public MappingProfilesSesion()
        {
            CreateMap<Sesion , Sesion>();
        }
        
    }
}