using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;

namespace Application.Sesions
{
    public class DetailsSesion
    {
         public class Query : IRequest<Sesion>
        {
            
            public int Id { get; set;}
        }

        public class Handler : IRequestHandler<Query, Sesion>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Sesion> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Sesion.FindAsync(request.Id);
            }
        }
    }
}