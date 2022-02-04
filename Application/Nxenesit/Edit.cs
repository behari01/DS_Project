using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Nxenesit
{
    public class Edit
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var nxenesi = await _context.AspNetUsers.FindAsync(request.Nxenesi.Id);

                _mapper.Map(request.Nxenesi, nxenesi);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Deshtim ne ndryshim te te dhenave te nxenesit!");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}