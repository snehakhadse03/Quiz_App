const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progress = document.getElementById("progress");
const scoreText = document.getElementById("score")
const progress_bar_text= document.getElementById("progressBartext")
const loaders = document.getElementById("loader")
const games = document.getElementById("game")
let CurrentQuestion = {};
let AcceptingAnswers = false;
let Score = 0;
let QuestionCounter = 0;
let AvailableQuestions = [];

let questions =[];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res =>{
  return res.json();
})
.then(loadedQuestions =>{
  
 questions = loadedQuestions.results.map(loadedQuestion =>{
  const formated_question = {
    question : loadedQuestion.question
  };
  const answerChoice = [...loadedQuestion.incorrect_answers]
  formated_question.answer = Math.floor(Math.random()*3) + 1;
  answerChoice.splice(formated_question.answer - 1,0,loadedQuestion.correct_answer);
  answerChoice.forEach((choice,index)=>{
    formated_question["choice" +(index+1)] = choice
  })
  return formated_question
})
  
   startGame();

}).catch(err => {
  console.log('err')
})

    const CORRECT_BONUS = 10;
    const MAX_QUESTIONS = 3;
    
    startGame = () => {
      QuestionCounter = 0;
      Score = 0;
      AvailableQuestions = [...questions];
      
      getNewQuestion();
    games.classList.remove('hidden')
     loaders.classList.add('hidden')
    }

    getNewQuestion = () => {
        if (AvailableQuestions.length === 0 || QuestionCounter >= MAX_QUESTIONS) {
             localStorage.setItem("mostRecentscore",Score)
            return window.location.assign('/end.html');
        }
        QuestionCounter++;
        
        progress.innerText = `Question ${QuestionCounter}/${MAX_QUESTIONS}`;
       
        progress_bar_text.style.width = `${(QuestionCounter / MAX_QUESTIONS) * 100}%`;
        
       
        const questionIndex = Math.floor(Math.random() * AvailableQuestions.length);
        CurrentQuestion = AvailableQuestions[questionIndex];
        question.innerText = CurrentQuestion.question;
                
        choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = CurrentQuestion["choice" + number];
        })
       
        AvailableQuestions.splice(questionIndex, 1);
           AcceptingAnswers = true;
        };

          choices.forEach(choice => {
          choice.addEventListener("click", e => {
            if (!AcceptingAnswers) return;
        
            AcceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];
        
              const classToApply = 
              selectedAnswer == CurrentQuestion.answer ? "correct" : "incorrect";
        if(classToApply === "correct"){
          increamentScore(CORRECT_BONUS);
        }
            selectedChoice.parentElement.classList.add(classToApply);
        
            setTimeout(() => {
              selectedChoice.parentElement.classList.remove(classToApply);
              
              
              getNewQuestion();
            }, 1000);
           
          });
        });
        increamentScore = number => {
         Score = number + Score;
         scoreText.innerText = Score;
        }
   


















    


