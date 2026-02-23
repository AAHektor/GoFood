using System;
using System.Reflection.Emit;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Models;

public class Restaurant
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string Category {get; set; } = string.Empty;
    public ICollection<Label> Labels {get; set; } = new List<Label>();
    public bool IsPopular { get; set; }

    public int OwnerId { get; set; }



}
