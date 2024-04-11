function generateQuestions(questionMessage, dataSet, numberQuestions = 10){
    const questions = [];

    const ids = new Set();

    // Generate a set of unique random indices
    while (ids.size < numberQuestions) {
        ids.add(Math.floor(Math.random()*dataSet.length));
    }

    const idsList = Array.from(ids);

    // Generate the questions
    for (let j = 0; j < idsList.length; j++) {
        const name = dataSet[idsList[j]].themeLabel.value;
        const questionText = questionMessage + name;
        const answers = [];

        // Index of the correct answer
        let correctAnswer = 0;

        // Add the correct answer in the first place
        answers[correctAnswer] = dataSet[idsList[j]].attributeLabel.value;

        // Get 3 random incorrect answers from all 
        const wrongIds = new Set();
        for (let w = 1; w < 4; w++) {
            let wrongId = Math.floor(Math.random()*dataSet.length);
            while (idsList[j] === wrongId || wrongIds.has(wrongId)) {
                wrongId = Math.floor(Math.random()*dataSet.length);
            }
            // Add the id of the incorrect answer to the set
            wrongIds.add(wrongId);
            answers[w] = dataSet[wrongId].attributeLabel.value;
        }

        // Shuffle the answers
        const shuffled = shuffleAnswers(answers, correctAnswer);

        questions[j] = {
            text:questionText, 
            answers: shuffled.answers, 
            correctAnswer: shuffled.correctAnswer,
            wikiLink: 'link',
        };
    }
    return questions;
}

function shuffleAnswers(answers, correctAnswer)
{
    let newIndex = Math.floor(Math.random()*answers.length);

    // Swap correct answer with the answer at the new index
    let temp = answers[newIndex];
    answers[newIndex] = answers[correctAnswer];
    answers[correctAnswer] = temp;

    // Update correctAnswer to point to the new index
    correctAnswer = newIndex;

    return {answers, correctAnswer};
}

module.exports = {generateQuestions};