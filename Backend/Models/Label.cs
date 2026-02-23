using System;
using System.Text.Json.Serialization;

namespace Backend.Models;

public class Label
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    [JsonIgnore]
    public ICollection<Restaurant> Restaurants { get; set; } = new List<Restaurant>();

}
