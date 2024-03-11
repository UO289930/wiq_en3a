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
