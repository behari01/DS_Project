using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Sesions
{
    public class CreateSesion
    {
        public class Command : IRequest
        {
            public Sesion Sesion { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public  async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Sesion.Add(request.Sesion);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}