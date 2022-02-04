using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Sesions
{
    public class DeleteSesion
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var sesion = await _context.Sesion.FindAsync(request.Id);
            
                _context.Remove(sesion);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}