using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class MenuItem
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    [Range(0, 5000)]
    public decimal Price { get; set; }
    [Required]
    public string ImageUrl { get; set; } = string.Empty;
    [Required]
    public int RestaurantId { get; set; }

}
