using Application.Sesions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Domain;
using System.Collections.Generic;
using MediatR;

namespace API.Controllers
{
    public class SesionsController : BaseApiController
    {


    [HttpGet]

    public async Task<ActionResult<List<Sesion>>> GetSesions()
    {
        return await Mediator.Send(new SesionList.Query());
    }

    [HttpGet("{id}")]

    public async Task<ActionResult<Sesion>> GetSesion(int id)
    {
        return await Mediator.Send(new DetailsSesion.Query{Id = id});
    }

    //Endpoint i ri 

    [HttpPost]
    public async Task<IActionResult> CreateSesion(Sesion sesion)
    {
        return Ok(await Mediator.Send(new CreateSesion.Command {Sesion = sesion}));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditSesion(int id , Sesion sesion)
    {
        sesion.Id = id;
         return Ok(await Mediator.Send(new EditSesion.Command {Sesion = sesion}));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSesion(int id)
    {
         return Ok(await Mediator.Send(new DeleteSesion.Command {Id = id}));
    }
    }
}