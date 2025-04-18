const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      answer: "Paris"
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    // Add more questions
  ];

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const timerEl = document.getElementById('timer');
const darkMode = document.getElementById("dark-mode-toggle")


let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

let flag_mode = false

darkMode.addEventListener("click",(e)=>{
  console.log("clicked");
  if(flag_mode){
    document.querySelector('body').classList.add("dark-mode")
    flag_mode = false
  }
  else{
    document.querySelector('body').classList.remove("dark-mode")
    flag_mode = true
  }
});

let qCount = 0;
const qLength = quizData.length;

let qclick = 0
function startTimer(){
  let count  = 5;
  const intervalID = setInterval(() => {
    timerEl.textContent = count;
    if(count==0){
      clearInterval(intervalID);
      nextBtn.click()
      count = 5
      qclick++;
      if(qclick<qLength){
        startTimer()
      }
      if(qclick==qLength){
        document.querySelector("#quiz-container").style.display = "none";
        document.querySelector("#result-container").style.display = "block";
      }
    }   
    count--;
  }, 1000);
}
startTimer()
nextBtn.addEventListener("click",(e)=>{
  qCount++;
  if(qCount>qLength-1){
    qCount=qLength-1;
  }
  questionEl.textContent = quizData[qCount].question;
  for (let i = 0; i < 4; i++){
    optionsEl.children[i].textContent = quizData[qCount].options[i]
  }
})
prevBtn.addEventListener("click",(e)=>{
  qCount--;
  if(qCount<0){
    qCount=0;
  }
  questionEl.textContent = quizData[qCount].question;
  for (let i = 0; i < 4; i++){
    optionsEl.children[i].textContent = quizData[qCount].options[i]
  }
})