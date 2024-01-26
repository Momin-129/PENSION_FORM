using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using NICTest.Models;
using Newtonsoft.Json;

namespace NICTest.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;


    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    public IActionResult Form()
    {

        return View();
    }

    [HttpPost]
    public IActionResult FormData(string data)
    {
        // Parse the JSON data and store it in TempData
        TempData["FormData"] = data;

        return Json(new { success = true });
    }

    public IActionResult Result()
    {
        // Retrieve the data from TempData on the second page
        var formData = TempData["FormData"] as Dictionary<string, string>;

        // Use the formData object to display on the page

        return View();
    }

    public class MyObjectModel
    {
        public string? MyObject { get; set; }
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
