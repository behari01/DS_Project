using AutoMapper;
using Domain;

namespace Application.CoreB
{
    public class MappingProfilesNote : Profile
    {
        
          public MappingProfilesNote()
        {
            CreateMap<Note , Note>();
        }

    }
}