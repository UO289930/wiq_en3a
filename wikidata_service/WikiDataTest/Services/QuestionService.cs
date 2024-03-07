using System;
using WikiDataTest.Controllers;
using WikiDataTest.Models;

namespace WikiDataTest.Services
{
    public class QuestionService
    {
        /// <summary>
        /// Generate the questions from the capital/countries passed as parameter
        /// </summary>
        /// <param name="capitalCountries"> all the countries obtained </param>
        /// <param name="numberQuestions"> number of questions to generate </param>
        /// <returns></returns>
        public Question[] GenerateQuestionsCapitalsOf(CapitalCountry[] capitalCountries, int numberQuestions = 10)
        {
            Question[] questions = new Question[numberQuestions];

            ISet<int> ids = new HashSet<int>();
            Random r = new Random();

            while (ids.Count < numberQuestions)
            {
                ids.Add(r.Next(capitalCountries.Length));
            }

            int[] idsList = new int[numberQuestions];
            int i = 0;
            foreach (int id in ids)
            {
                idsList[i++] = id;
            }

            // Generate questions 
            for (int j = 0; j < idsList.Length; j++)
            {
                // Generate the questions
                string countryName = capitalCountries[idsList[j]].countryLabel.value;
                string questionText = $"What is the capital of {countryName}?";
                string[] answers = new string[4];

                // Place of the correct answer
                int correctAnswer = 0;

                // Save the capital of the specific country on first place
                answers[correctAnswer] = capitalCountries[idsList[j]].capitalLabel.value;

                // Get 3 random wrong answers from all the capitals
                int[] wrongIds = new int[3];
                for (int w = 1; w < 4; w++)
                {
                    int wrongId = r.Next(capitalCountries.Length);
                    while (idsList[j] == wrongId || wrongIds.Contains(wrongId))
                    {
                        wrongId = r.Next(capitalCountries.Length);
                    }
                    // Adding the id of the wrongAnswer to the array
                    wrongIds[w - 1] = wrongId;
                    answers[w] = capitalCountries[wrongId].capitalLabel.value;
                }

                questions[j] = new Question(questionText, answers, correctAnswer);
            }

            return questions;
        }
    }
}
