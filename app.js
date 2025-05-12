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
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style Syntax", "Computer Style Sheet", "Colorful Style System"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "Hyperlink Text Mark Language", "HyperText Markdown Language", "Home Tool Markup Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "What year was JavaScript created?",
    options: ["1995", "2000", "1985", "1999"],
    answer: "1995"
  },
  {
    question: "Which company developed the React library?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    answer: "Facebook"
  },
  {
    question: "Which tag is used to link a JavaScript file?",
    options: ["<link>", "<script>", "<js>", "<javascript>"],
    answer: "<script>"
  },
  {
    question: "Which array method adds a new item to the end?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()"
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "<!--", "#", "/* */"],
    answer: "//"
  },
  {
    question: "What is the output of: typeof null?",
    options: ["'object'", "'null'", "'undefined'", "'boolean'"],
    answer: "'object'"
  }
];


// DOM Elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const submitBtn = document.getElementById('submit-btn');
const timerEl = document.getElementById('timer');
const darkModeToggle = document.getElementById("dark-mode-toggle");

let currentQuestionIndex = 0;
let qClickCount = 0;
let score = 0;
const totalQuestions = quizData.length;

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Load a question
function loadQuestion(index) {
  prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
  nextBtn.style.display = index === totalQuestions - 1 ? 'none' : 'inline-block';
  submitBtn.style.display = index === totalQuestions - 1 ? 'inline-block' : 'none';
  timerEl.textContent = timeSlots[index]
  const currentQuestion = quizData[index];
  questionEl.textContent = currentQuestion.question;
  document.getElementById("qNum").textContent = index+1

  for (let i = 0; i < optionsEl.children.length; i++) {
    optionsEl.children[i].textContent = currentQuestion.options[i];
    optionsEl.children[i].classList.remove('selected')
  }
  startTimer()
}

let intervalID = null
let timeSlots = []
let selectedAnswer = [];
for (let i = 0; i < totalQuestions; i++) {
  timeSlots.push(5)
  selectedAnswer.push(null)
}
// Timer function
function startTimer() {
  clearInterval(intervalID)
  intervalID = setInterval(() => {

    timerEl.textContent = timeSlots[currentQuestionIndex]-1;

    if (timeSlots[currentQuestionIndex] <= 0) {
      clearInterval(intervalID);
      
      qClickCount++;
      if (qClickCount >= totalQuestions) {
        for (let i = 0; i < quizData.length; i++) {
          if (quizData[i].answer==selectedAnswer[i]) {
            ans++
          }
        }
        document.getElementById("sQ").textContent=ans
        document.getElementById("tQ").textContent=totalQuestions
        document.getElementById("quiz-container").style.display = "none";
        document.getElementById("result-container").style.display = "block";
      }
      else{
        nextBtn.click(); // Simulate next click
      }
    }

    timeSlots[currentQuestionIndex]--;
  }, 1000);
}

// Event Listeners for Next and Previous buttons
nextBtn.addEventListener("click", () => {
  currentQuestionIndex = (currentQuestionIndex+1)%totalQuestions;
  loadQuestion(currentQuestionIndex);
});

prevBtn.addEventListener("click", () => {
  currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
  loadQuestion(currentQuestionIndex);
});

// submissions
let ans=0

const optionButtons = document.querySelectorAll('.option');
optionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Deselect all
    optionButtons.forEach(b => b.classList.remove("selected"));

    // Select the clicked one
    btn.classList.add("selected");

    // Save the selected answer
    selectedAnswer[currentQuestionIndex] = btn.textContent;
    console.log("Selected:", selectedAnswer[currentQuestionIndex]);
  });
});
submitBtn.addEventListener("click",()=>{
    for (let i = 0; i < quizData.length; i++) {
      if (quizData[i].answer==selectedAnswer[i]) {
        ans++
      }
    }
    document.getElementById("sQ").textContent=ans
    document.getElementById("tQ").textContent=totalQuestions
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
  
})
// Initial call
document.getElementById("retry-btn").addEventListener("click",()=>{
  for (let i = 0; i < timeSlots.length; i++) {
      timeSlots[i] = 5;
  }
  qClickCount = 0
  currentQuestionIndex = 0;
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("result-container").style.display = "none";
  loadQuestion(currentQuestionIndex)
});
loadQuestion(currentQuestionIndex);

