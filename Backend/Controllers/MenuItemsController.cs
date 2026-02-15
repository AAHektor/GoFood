using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MenuItemsController(AppDbContext context)
        {
            _context = context;


        }

        [HttpGet("{restaurantId}")]

        public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItemsByRestaurant(int restaurantId)
        {
            return await _context.MenuItems.Where(x => x.RestaurantId == restaurantId).ToListAsync();
        }

        [HttpPost]

        public async Task<ActionResult<MenuItem>> CreateMenuItem(MenuItem menuItem)
        {
            _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();
            return Ok(menuItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuItem(int id)
        {
          var menuItem = await _context.MenuItems.FindAsync(id);
          if (menuItem == null)
            {
                return NotFound();
            }
            
            _context.MenuItems.Remove(menuItem);
            await _context.SaveChangesAsync();

            return NoContent();

        }

    }
}
