using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WikiDataTest.Models;
using WikiDataTest.Services;

namespace WikiDataTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WikiDataController : ControllerBase
    {
        private readonly ILogger<WikiDataController> _logger;
        private readonly QueryService _queryService;
        private readonly WikiDataService _wikiDataService;
        private readonly QuestionService _questionService;


        public WikiDataController(ILogger<WikiDataController> logger,
            QueryService queryService, WikiDataService wikiDataService, QuestionService questionService)
        {
            _logger = logger;
            _queryService = queryService;
            _wikiDataService = wikiDataService;
            _questionService = questionService;
        }

        [HttpGet("GetCapitalsQuestions")]
        public async Task<IActionResult> GetCapitalsQuestions()
        {
            RootObject jsonQuestions = await _wikiDataService.GetQuestions(_queryService.GetCapitalsQuery());

            Question[] questions = _questionService.GenerateQuestionsCapitalsOf(jsonQuestions.results.bindings.ToArray<CapitalCountry>());

            foreach (var item in questions)
            {
                Console.WriteLine(item.ToString());
            }

            return Ok(questions);
        }   

        [HttpGet("GetQuestionsMovieQuestions")]
        public async Task<IActionResult> GetQuestionsMovieDirectorQuestions()
        {
            var jsonQuestions = await _wikiDataService.GetQuestions(_queryService.GetMovieDirectorQuery());

            return Ok(jsonQuestions);
        }        

        [HttpGet("GetElementSymbolQuestions")]
        public async Task<IActionResult> GetElementSymbolQuestions()
        {
            var jsonQuestions = await _wikiDataService.GetQuestions(_queryService.GetElementSymbolQuery());

            return Ok(jsonQuestions);
        }       
    }

}
