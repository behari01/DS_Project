using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;

namespace Application.Books
{
    public class DetailsBook
    {
        public class Query : IRequest<Book>
        {
            
            public int Id { get; set;}
        }

        public class Handler : IRequestHandler<Query, Book>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Book> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Book.FindAsync(request.Id);
            }
        }
    }
}