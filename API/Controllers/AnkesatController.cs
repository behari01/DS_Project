using Application.Ankesat;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Domain;
using System.Collections.Generic;
using MediatR;


namespace API.Controllers
{
 public class AnkesatController : BaseApiController
    {


    [HttpGet]

    public async Task<ActionResult<List<Ankes>>> GetAnkesat()
    {
        return await Mediator.Send(new AnkesList.Query());
    }

    [HttpGet("{id}")]

    public async Task<ActionResult<Ankes>> GetAnkes(int id)
    {
        return await Mediator.Send(new DetailsAnkes.Query{Id = id});
    }

    //Endpoint i ri 

    [HttpPost]
    public async Task<IActionResult> CreateAnkes(Ankes ankes)
    {
        return Ok(await Mediator.Send(new CreateAnkes.Command {Ankes = ankes}));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditBook(int id , Ankes ankes)
    {
        ankes.Id = id;
         return Ok(await Mediator.Send(new EditAnkes.Command {Ankes = ankes}));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAnkes(int id)
    {
         return Ok(await Mediator.Send(new DeleteAnkes.Command {Id = id}));
    }
    }
}