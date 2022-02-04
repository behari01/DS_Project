using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Ankesat
{
    public class CreateAnkes
    {
        public class Command : IRequest
        {
            public Ankes Ankes { get; set; }
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
                _context.Ankes.Add(request.Ankes);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}