using Application.Books;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Domain;
using System.Collections.Generic;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class BooksController : BaseApiController
    {


    [HttpGet]

    public async Task<ActionResult<List<Book>>> GetBooks()
    {
        return await Mediator.Send(new BookList.Query());
    }

    [HttpGet("{id}")]

    public async Task<ActionResult<Book>> GetBook(int id)
    {
        return await Mediator.Send(new DetailsBook.Query{Id = id});
    }

    //Endpoint i ri 

    [HttpPost]
    public async Task<IActionResult> CreateBook(Book book)
    {
        return Ok(await Mediator.Send(new CreateBook.Command {Book = book}));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditBook(int id , Book book)
    {
        book.Id = id;
        return Ok(await Mediator.Send(new EditBook.Command {Book = book}));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
         return Ok(await Mediator.Send(new DeleteBook.Command {Id = id}));
    }
    }
}