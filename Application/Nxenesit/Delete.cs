using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Nxenesit
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>{

            public string NxenesiID { get; set; }
        
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var nxenesi = await _context.AspNetUsers.FindAsync(request.NxenesiID);

                // if (nxenesi == null) return null;

                _context.Remove(nxenesi);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Deshtim ne fshirje te nxenesit");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}