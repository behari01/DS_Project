using Application.Notes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Domain;
using System.Collections.Generic;
using MediatR;

namespace API.Controllers
{
    public class NotesController : BaseApiController
    {


    [HttpGet]

    public async Task<ActionResult<List<Note>>> GetNotes()
    {
        return await Mediator.Send(new NoteList.Query());
    }

    [HttpGet("{id}")]

    public async Task<ActionResult<Note>> GetNote(int id)
    {
        return await Mediator.Send(new DetailsNote.Query{Id = id});
    }

    //Endpoint i ri 

    [HttpPost]
    public async Task<IActionResult> CreateNote(Note note)
    {
        return Ok(await Mediator.Send(new CreateNote.Command {Note= note}));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditNote(int id , Note note)
    {
        note.Id = id;
         return Ok(await Mediator.Send(new EditNote.Command {Note = note}));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
         return Ok(await Mediator.Send(new DeleteNote.Command {Id = id}));
    }
    }
}