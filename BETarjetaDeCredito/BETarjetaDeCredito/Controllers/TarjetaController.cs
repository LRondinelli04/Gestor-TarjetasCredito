﻿using FBtarjeta.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FBtarjeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        private readonly AplicationDBContext _context;
        public TarjetaController(AplicationDBContext context) 
        {
            _context = context;
        }
        // GET: api/<TarjetaController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var listTarjetas = await _context.TarjetaCredito.ToListAsync();
                return Ok(listTarjetas);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<TarjetaController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                _context.Add(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(tarjeta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<TarjetaController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                if(id != tarjeta.Id)
                {
                    return NotFound();
                }
                _context.Update(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(new {message = "La tarjeta se actualizo con exito!"}); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<TarjetaController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var tarjeta = await _context.TarjetaCredito.FindAsync(id);
                if (tarjeta == null)
                {
                    return NotFound();
                }
                _context.TarjetaCredito.Remove(tarjeta);
                await _context.SaveChangesAsync();
                return Ok( new {message = "Tarjeta Eliminada"});

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}