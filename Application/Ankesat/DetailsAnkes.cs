using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;


namespace Application.Ankesat
{
    public class DetailsAnkes
    {
        public class Query : IRequest<Ankes>
        {
            
            public int Id { get; set;}
        }

        public class Handler : IRequestHandler<Query, Ankes>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Ankes> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Ankes.FindAsync(request.Id);
            }
        }
    }
}