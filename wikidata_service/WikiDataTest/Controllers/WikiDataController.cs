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
            string sparqlQuery = "SELECT ?capitalLabel ?countryLabel WHERE {  ?capital wdt:P1376 ?country.  ?capital wdt:P31 wd:Q5119. ?country wdt:P31 wd:Q3624078.  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }} LIMIT 400";

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

                Question[] questions = GenerateQuestionsCapitalsOf(jsonResult.results.bindings.ToArray<CapitalCountry>());

                foreach (var item in questions)
                {
                    Console.WriteLine(item.ToString());
                }

                return Ok(jsonResult);
            }
           
        }

        private Question[] GenerateQuestionsCapitalsOf(CapitalCountry[] capitalCountries)
        {
            Question[] questions = new Question[10];

            ISet<int> ids = new HashSet<int>();
            Random r = new Random();

            while (ids.Count < 10) { 
                ids.Add(r.Next(capitalCountries.Length));
            }

            int[] idsList = new int[10];
            int i = 0;
            foreach (int id in ids)
            {
                idsList[i++] = id;
            }

            for (int j = 0; j < idsList.Length; j++)
            {
                string text = "What is the capital of " + capitalCountries[idsList[j]].countryLabel.value;
                string[] answers = new string[4];
                answers[0] = capitalCountries[idsList[j]].capitalLabel.value;
                int[] wrongIds = new int[3];
                for (int w = 1; w < 4; w++)
                {
                    int wrongId = r.Next(capitalCountries.Length);
                    while (idsList.Contains(wrongId) || wrongIds.Contains(wrongId) )
                    {
                        wrongId = r.Next(capitalCountries.Length);
                    }
                    answers[w] = capitalCountries[wrongId].capitalLabel.value;
                }
                int correctAnswer = 0;

                questions[j] = new Question(text, answers, correctAnswer);
            }

            return questions;
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

    public class Question
    {
        public string text { get; set; }
        public string[] answers;
        public int correctAnswer;

        public Question(string text, string[] answers, int correctAnswer)
        {
            this.text = text;
            this.answers = answers;
            this.correctAnswer = correctAnswer;
        }

        public string ToString()
        {
            string aux = "text: " + text;
            aux += "\ncorrectAnswer: " + answers[0];
            aux += "\nAnswer: " + answers[1];
            aux += "\nAnswer: " + answers[2];
            aux += "\nAnswer: " + answers[3];
            return aux ;
        }
    }
}
