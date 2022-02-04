using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Ankesat
{
    public class DeleteAnkes
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
                var ankes = await _context.Ankes.FindAsync(request.Id);
            
                _context.Remove(ankes);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}