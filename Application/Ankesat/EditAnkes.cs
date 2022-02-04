using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Ankesat
{
    public class EditAnkes
    {
         public class Command : IRequest
        {
            public Ankes Ankes { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var ankes = await _context.Ankes.FindAsync(request.Ankes.Id);

                _mapper.Map(request.Ankes, ankes);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        } 
    }
}