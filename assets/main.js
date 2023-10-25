// make constants that select the question id, one that makes an array from the answers class, score-text class and timer
const question = document.getElementById('question')
const answers = Array.from(document.querySelectorAll('.answers')) 
const timeLeft = document.getElementById('timer')
const scoreText = document.getElementById('score')
const myScore = document.getElementById('myScore')
const saveScoreBtn = document.getElementById('saveScore')


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let time = 60
let availableQuestions = []


let questions = [
    {
        question: 'Which of these is a markup language?',
        answer1: 'JavaScript',
        answer2: 'C++',
        answer3: 'Python',
        answer4: 'HTML',
        correctAns: 4
    },
    {
        question: 'What type of data is a true or false?',
        answer1: 'Boolean',
        answer2: 'integer',
        answer3: 'String',
        answer4: 'Array',
        correctAns: 1
    },
    {
        question: 'What does HTML stand for?',
        answer1: 'HyperTextual Mashup Language',
        answer2: 'HyperText Markup Language',
        answer3: 'Happy Turtles Make Lasagna',
        answer4: 'Hi There My Love',
        correctAns: 2
    },
    {
        question: 'What type of data can an Array in JavaScript store',
        answer1: 'Other arrays',
        answer2: 'Strings',
        answer3: 'Booleans',
        answer4: 'All of the Above',
        correctAns: 4
    },
    {
        question: 'Which of these is not an object oriented programming language',
        answer1: 'Python',
        answer2: 'C#',
        answer3: 'JavaScript',
        answer4: 'Java',
        correctAns: 3
    }
]
let timerValue = parseInt(timeLeft.textContent)
const Score_Points = 1
const Max_questions = 5

beginGame = () =>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
incrementScore = num => {
    score += num
    scoreText.textContent = score
}
// this function detects if the length of available questions is equal to zero or if the question counter is greater than max questions, the most recent score will be saved to local storage and the function will and and change the window to the end page 
// 
getNewQuestion =() => {
    if(availableQuestions.length === 0 || questionCounter > Max_questions ) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }
    // question counter increases by 1
    questionCounter++
    
    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    answers.forEach(correctAns => {
        const number = correctAns.dataset['number']
        correctAns.innerText = currentQuestion['answer' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

const answersContainer = document.getElementById('answerDiv'); 

answersContainer.addEventListener('click', (event) => {
    event.stopPropagation(); // This stops the event from propagating further up the DOM tree

 
});
answers.forEach(correctAns => {
    correctAns.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = true
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

       let correctOrNot = selectedAnswer ==currentQuestion.correctAns ? 'correct' :
       'incorrect' 
       console.log(correctOrNot)
      
       if(correctOrNot === 'correct') {
        

         incrementScore(1)

       } else {
        
        
        
        if (timerValue > 0) {
            timerValue = timerValue -5
            timeLeft.textContent = timerValue
        } 
    }
       

       selectedChoice.parentElement.classList.add(correctOrNot)

       setTimeout(() => {
        selectedChoice.parentElement.classList.remove(correctOrNot)
        getNewQuestion()

       },1000)
    })
})

// decrease timer 
function updateTimer () {
    
    // decrease timerValue by 1 and change timeLeft.textContent to new timerValue
    if (timerValue > 0) {
        timerValue --
        timeLeft.textContent = timerValue
    } 
    if(timerValue === 0){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
   
    }
    
}
// updates timer every 1 second
setInterval(updateTimer, 1000)





beginGame()