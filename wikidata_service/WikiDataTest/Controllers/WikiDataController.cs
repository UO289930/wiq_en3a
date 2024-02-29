using Microsoft.AspNetCore.Mvc;


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

        [HttpGet("GetQuestions/{query}")]
        public async Task<IActionResult> GetQuestions(string query)
        {
            string endpointUrl = "https://query.wikidata.org/sparql?query=";
            string sparqlQuery = "SELECT ?capital ?capitalLabel ?country ?countryLabel WHERE {  ?capital wdt:P1376 ?country.  ?capital wdt:P31 wd:Q5119. ?country wdt:P31 wd:Q3624078.  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }}LIMIT 4";

            var fullUrl = endpointUrl + query;

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "Sergiollende/1.0");
                client.DefaultRequestHeaders.Add("Accept", "application/sparql-results+json");

                HttpResponseMessage response = await client.GetAsync(fullUrl);

                string responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseBody);
                var jsonResult = Newtonsoft.Json.JsonConvert.DeserializeObject(responseBody);
                Console.WriteLine("------------------------------------------------------------------------------------");

                Console.WriteLine(jsonResult);
                return Ok(jsonResult);
            }
           
        }
        
    }
}
