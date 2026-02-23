using System.Runtime.InteropServices;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RestaurantsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Restaurant>>> GetRestaurants()
        {
            return await _context.Restaurants
            .Include(r => r.Labels)
            .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Restaurant>> CreateRestaurant(Restaurant restaurant)
        {
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRestaurants), new { id = restaurant.Id }, restaurant);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> GetRestaurant(int id)
        {
            var restaurant = await _context.Restaurants
            .Include(r => r.Labels)
            .FirstOrDefaultAsync(r => r.Id == id);

            if (restaurant == null)
            {
                return NotFound();
            }

            return restaurant;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRestaurant(int id)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);
            if (restaurant == null)
            {
                return NotFound();
            }

            _context.Restaurants.Remove(restaurant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}/labels")]
        public async Task<ActionResult<IEnumerable<Label>>> GetLabelsForRestaurant(int id)
        {
            var restaurant = await _context.Restaurants
            .Include(r => r.Labels)
            .FirstOrDefaultAsync(r => r.Id == id);

            if (restaurant == null)
            {
                return NotFound();
            }

            return restaurant.Labels.ToList();
        }

        [HttpPost("{id}/labels/{labelId}")]
        public async Task<ActionResult> AddLabelToRestaurant(int id, int labelId)
        {
            var restaurant = await _context.Restaurants
            .Include(r => r.Labels)
            .FirstOrDefaultAsync(r => r.Id == id);

            if (restaurant == null)
            {
                return NotFound();
            }

            var label = await _context.Labels.FindAsync(labelId);
            if (label == null)            {
                return NotFound("Label not found");
            }

            
            restaurant.Labels.Add(label);
            await _context.SaveChangesAsync();

            return Ok(label);
        }

        [HttpDelete("{restaurantId}/labels/{labelId}")]
        public async Task<ActionResult> RemoveLabelFromRestaurant(int restaurantId, int labelId)
        {
            var restaurant = await _context.Restaurants
            .Include(r => r.Labels) 
            .FirstOrDefaultAsync(r => r.Id == restaurantId);
            
            if (restaurant == null)
            {
                return NotFound();
            }

            var label = await _context.Labels.FindAsync(labelId);
            if (label == null)
            {
                return NotFound("Label not found");
            }

            restaurant.Labels.Remove(label);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("labels")]
        public async Task<ActionResult<Label>> CreateLabel(Label label)
        {
            _context.Labels.Add(label);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAllLabels), new { id = label.Id }, label);
        }

        [HttpGet("labels")] 
        public async Task<ActionResult<IEnumerable<Label>>> GetAllLabels() {
            return await _context.Labels.ToListAsync();
        }
        
    }
}
