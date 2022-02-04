using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Ankesat
{
    public class AnkesList
    {
         public class Query : IRequest<List<Ankes>> {}
        

            public class Handler : IRequestHandler<Query, List<Ankes>>
            {
                private readonly DataContext _context;
                public Handler(DataContext context)
                {
                    _context = context;
                }

                public async Task<List<Ankes>> Handle(Query request, CancellationToken cancellationToken)
                {
                    return await _context.Ankes.ToListAsync();
                }
            }
    }
}