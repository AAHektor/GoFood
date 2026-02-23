using System;

namespace Backend.DTOs;

public class UpdateRestaurantDto
{
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? ImageUrl { get; set; }
    public string? Category {get; set; }
}
