using System;

namespace Backend.Models;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int RestaurantId { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.Now;
    public decimal TotalPrice { get; set; }
    public string OrderStatus { get; set; } = "Pending";

    public string ItemsJson { get; set; } = string.Empty;
}
