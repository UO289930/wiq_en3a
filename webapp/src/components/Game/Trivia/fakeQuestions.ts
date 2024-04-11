import { Question } from "@/src/stores/playing-store";


export function getSportQuestion() : Question{

    return {
        text: "Who won the 2014 FIFA World Cup?",
        answers: ["Germany", "Argentina", "Brazil", "Spain"],
        correctAnswer: 0
    }

}

export function getArtQuestion() : Question{

    return {
        text: "Who painted the Mona Lisa?",
        answers: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        correctAnswer: 0
    }

}

export function getScienceQuestion() : Question{

    return {
        text: "What is the powerhouse of the cell?",
        answers: ["Mitochondria", "Ribosome", "Nucleus", "Endoplasmic reticulum"],
        correctAnswer: 0
    }

}

export function getHistoryQuestion() : Question{

    return {
        text: "Who was the first president of the United States?",
        answers: ["George Washington", "Thomas Jefferson", "John Adams", "James Madison"],
        correctAnswer: 0
    }

}

export function getGeographyQuestion() : Question{

    return {
        text: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2
    }

}