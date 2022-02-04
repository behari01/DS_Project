using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Nxenesit
{
    public class List
    {
        public class Query : IRequest<Result<List<UserNxenesi>>> { }

        public class Handler : IRequestHandler<Query, Result<List<UserNxenesi>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<UserNxenesi>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<UserNxenesi>>.Success(await _context.AspNetUsers.ToListAsync(cancellationToken));
            }
        }
    }
}