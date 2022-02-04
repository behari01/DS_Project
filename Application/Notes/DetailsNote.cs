using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;

namespace Application.Notes
{
    public class DetailsNote
    {
        public class Query : IRequest<Note>
        {
            
            public int Id { get; set;}
        }

        public class Handler : IRequestHandler<Query, Note>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Note> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Note.FindAsync(request.Id);
            }
        }
    }
}