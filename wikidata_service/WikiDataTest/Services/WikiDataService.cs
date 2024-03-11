using Newtonsoft.Json;
using WikiDataTest.Controllers;
using WikiDataTest.Models;

namespace WikiDataTest.Services
{
    public class WikiDataService
    {
        public WikiDataService() { }

        public async Task<RootObject> GetQuestions(string sparqlQuery)
        {
            string endpointUrl = "https://query.wikidata.org/sparql?query=";

            var fullUrl = endpointUrl + sparqlQuery;

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "Sergiollende/1.0");
                client.DefaultRequestHeaders.Add("Accept", "application/sparql-results+json");

                HttpResponseMessage response = await client.GetAsync(fullUrl);

                string responseBody = await response.Content.ReadAsStringAsync();

                RootObject jsonResult = JsonConvert.DeserializeObject<RootObject>(responseBody);

                return jsonResult;
            }
        }
    }
}
