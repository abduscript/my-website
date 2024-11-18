const question = [
    {
        question: 'siapa nama raja Arab Saudi yang tidak takut terhadap Embargo Amerika?',
        answers: [
            { text: "Raja Fahd", correct: false },
            { text: "Raja Salman", correct: false },
            { text: "Raja Faisal", correct: true },
            { text: "Raja Abdullah", correct: false },
        ]
    },
    {
        question: 'siapakah orang baik di bawah ini?',
        answers: [
            { text: "Agus", correct: true },
            { text: "Yaqut", correct: false },
            { text: "Bahlil", correct: false },
            { text: "Erick", correct: false },
        ]
    },
    {
        question: 'siapakah orang yang disebut mulyono di bawah ini?',
        answers: [
            { text: "Anies", correct: false },
            { text: "Prabowo", correct: false },
            { text: "Ganjar", correct: false },
            { text: "Jokowi", correct: true },
        ]
    },
    {
        question: 'di bawah ini yang merupakan keluarga jokowi adalah?',
        answers: [
            { text: "Agus", correct: false },
            { text: "Yaqut", correct: false },
            { text: "Bobby", correct: true },
            { text: "Erick", correct: false },
        ]
    },
    {
        question: 'siapakah nama anak sulung jokowi?',
        answers: [
            { text: "Gibran", correct: true },
            { text: "Kaesang", correct: false },
            { text: "Bobby", correct: false },
            { text: "Erick", correct: false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
} 

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Coba Lagi";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();