using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Nxenesit;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class NxenesiController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetNxenesit()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNxenesi(string id)
        {   
            return HandleResult(await Mediator.Send(new Details.Query{NxenesiID = id}));
        }

        [HttpPost]
        public async Task<IActionResult> ShtoNxenesin(UserNxenesi nxenesi){
            return HandleResult(await Mediator.Send(new Create.Command {Nxenesi = nxenesi}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> editNxenesi(string id, UserNxenesi nxenesi){
            nxenesi.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Nxenesi = nxenesi}));
        }

        [HttpDelete("{nxenesiID}")]
        public async Task<IActionResult> DeleteNxenesi(string nxenesiID){
            return HandleResult(await Mediator.Send(new Delete.Command{NxenesiID = nxenesiID}));
        }

    }
}