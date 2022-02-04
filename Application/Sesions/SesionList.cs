using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;



namespace Application.Sesions
{
    public class SesionList
    {
         public class Query : IRequest<List<Sesion>> {}
        

            public class Handler : IRequestHandler<Query, List<Sesion>>
            {
                private readonly DataContext _context;
                public Handler(DataContext context)
                {
                    _context = context;
                }

                public async Task<List<Sesion>> Handle(Query request, CancellationToken cancellationToken)
                {
                    return await _context.Sesion.ToListAsync();
                }
            }
    }
}