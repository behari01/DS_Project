using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Sesions
{
    public class EditSesion
    {
         public class Command : IRequest
        {
            public Sesion Sesion { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var sesion = await _context.Sesion.FindAsync(request.Sesion.Id);

                _mapper.Map(request.Sesion, sesion);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}