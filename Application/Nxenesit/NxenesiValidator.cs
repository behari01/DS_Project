using Domain;
using FluentValidation;

namespace Application.Nxenesit
{
    public class NxenesiValidator : AbstractValidator<UserNxenesi>
    {
        public NxenesiValidator(){
            RuleFor(x=> x.Emri).NotEmpty();
            RuleFor(x=> x.Mbiemri).NotEmpty();
            RuleFor(x=> x.Datelindja).NotEmpty();
            RuleFor(x=> x.Rruga).NotEmpty();
            RuleFor(x=> x.Qyteti).NotEmpty();
            RuleFor(x=> x.NumriKontaktues).NotEmpty();
        }
    }
}