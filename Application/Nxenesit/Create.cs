using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Nxenesit
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {

            public UserNxenesi Nxenesi { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Nxenesi).SetValidator(new NxenesiValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.AspNetUsers.Add(request.Nxenesi);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Nuk mund te shtohet nxenesi!");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}