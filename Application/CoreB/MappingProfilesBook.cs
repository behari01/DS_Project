using AutoMapper;
using Domain;

namespace Application.CoreB
{
    public class MappingProfilesBook : Profile
    {

        public MappingProfilesBook()
        {
            CreateMap<Book , Book>();
        }
        
    }
}