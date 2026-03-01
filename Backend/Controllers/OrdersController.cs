using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PlaceOrder(Order order)
        {
            order.OrderDate = DateTime.Now;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }

        [HttpGet] 
        public async Task<ActionResult> GetOrders()
        {
            var orders = await _context.Orders
            .OrderByDescending(o => o.OrderDate)
            .Select(o => new
            {
                o.Id,
                o.UserId,
                o.RestaurantId,
                RestaurantName = _context.Restaurants
                .Where(r => r.Id == o.RestaurantId)
                .Select(r => r.Name)
                .FirstOrDefault(),
                RestaurantImageUrl = _context.Restaurants
                .Where(r => r.Id == o.RestaurantId)
                .Select(r => r.ImageUrl)
                .FirstOrDefault(),
                o.OrderDate,
                o.TotalPrice,
                o.OrderStatus,
                o.DeliveryAddress,
                o.Number,
                o.Name,
                o.ItemsJson
            })
            .ToListAsync();

            return Ok(orders);
        }
    }
}
