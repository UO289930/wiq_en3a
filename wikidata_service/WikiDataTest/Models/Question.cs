namespace WikiDataTest.Models
{
    public class Question
    {
        public string text { get; set; }
        public string[] answers { get; set; } 
        public int correctAnswer { get; set; }

        public Question(string text, string[] answers, int correctAnswer)
        {
            this.text = text;
            this.answers = answers;
            this.correctAnswer = correctAnswer;
            suffleAnswers();
        }

        private void suffleAnswers()
        {
            Random rand = new Random();
            int newIndex = rand.Next(answers.Length);

            // Swap correct answer with the answer at the new index
            string temp = answers[newIndex];
            answers[newIndex] = answers[correctAnswer];
            answers[correctAnswer] = temp;

            // Update correctAnswer to point to the new index
            correctAnswer = newIndex;
        }

        public string ToString()
        {
            string aux = "text: " + text;
            aux += "\ncorrectAnswer: " + answers[0];
            aux += "\nAnswer: " + answers[1];
            aux += "\nAnswer: " + answers[2];
            aux += "\nAnswer: " + answers[3];
            return aux;
        }
    }
}
