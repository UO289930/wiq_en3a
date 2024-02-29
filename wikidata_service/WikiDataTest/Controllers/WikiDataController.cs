using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WikiDataTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WikiDataController : ControllerBase
    {

        private readonly ILogger<WikiDataController> _logger;

        public WikiDataController(ILogger<WikiDataController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetQuestions")]
        public async Task<IActionResult> GetQuestions()
        {
            string endpointUrl = "https://query.wikidata.org/sparql?query=";
            string sparqlQuery = "SELECT ?capitalLabel ?countryLabel WHERE {  ?capital wdt:P1376 ?country.  ?capital wdt:P31 wd:Q5119. ?country wdt:P31 wd:Q3624078.  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }}LIMIT 4";

            var fullUrl = endpointUrl + sparqlQuery;

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "Sergiollende/1.0");
                client.DefaultRequestHeaders.Add("Accept", "application/sparql-results+json");

                HttpResponseMessage response = await client.GetAsync(fullUrl);

                string responseBody = await response.Content.ReadAsStringAsync();

                RootObject jsonResult = JsonConvert.DeserializeObject<RootObject>(responseBody);
                foreach(CapitalCountry c in jsonResult.results.bindings)
                {
                    Console.WriteLine(c.ToString());
                }

                

                return Ok(jsonResult);
            }
           
        }
        
    }

    public class CapitalCountry
    {
        public Label capitalLabel { get; set; }
        public Label countryLabel { get; set; }

        public string ToString()
        {
            return countryLabel.value + ": " + capitalLabel.value;
        }
    }

    public class Label
    {
        public string value { get; set; }
    }


    public class Results
    {
        public List<CapitalCountry> bindings { get; set; }
    }

    public class RootObject
    {
        public Results results { get; set; }
    }
}
