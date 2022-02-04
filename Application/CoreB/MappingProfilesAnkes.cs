using AutoMapper;
using Domain;

namespace Application.CoreB
{
    public class MappingProfilesAnkes : Profile
    {
        
         public MappingProfilesAnkes()
        {
            CreateMap<Ankes , Ankes>();
        }

    }
}