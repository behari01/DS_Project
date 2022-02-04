using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Notes
{
    public class EditNote
    {
        public class Command : IRequest
        {
            public Note Note { get; set; }
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
                var book = await _context.Note.FindAsync(request.Note.Id);

                _mapper.Map(request.Note, book);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}