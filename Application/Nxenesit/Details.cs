using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Nxenesit
{
    public class Details
    {
        public class Query : IRequest<Result<UserNxenesi>>
        {
            public string NxenesiID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<UserNxenesi>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<UserNxenesi>> Handle(Query request, CancellationToken cancellationToken)
            {
                var nxenesi = await _context.AspNetUsers.FindAsync(request.NxenesiID);

                return Result<UserNxenesi>.Success(nxenesi);
            }
        }
    }
}