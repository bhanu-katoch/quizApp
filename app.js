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
  // Add more questions here
];

// DOM Elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const timerEl = document.getElementById('timer');
const darkModeToggle = document.getElementById("dark-mode-toggle");

let currentQuestionIndex = 0;
let qClickCount = 0;
let score = 0;
const totalQuestions = quizData.length;
let darkModeEnabled = false;

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeEnabled = !darkModeEnabled;
});

// Load a question
function loadQuestion(index) {
  timerEl.textContent = timeSlots[index]
  const currentQuestion = quizData[index];
  questionEl.textContent = currentQuestion.question;
  document.getElementById("qNum").textContent = index+1

  for (let i = 0; i < optionsEl.children.length; i++) {
    optionsEl.children[i].textContent = currentQuestion.options[i];
  }
  startTimer()
}

let intervalID = null
let timeSlots = [5,5]
// Timer function
function startTimer() {
  clearInterval(intervalID)
  intervalID = setInterval(() => {

    timerEl.textContent = timeSlots[currentQuestionIndex];

    if (timeSlots[currentQuestionIndex] <= 0) {
      clearInterval(intervalID);
      nextBtn.click(); // Simulate next click

      qClickCount++;
      if (qClickCount < totalQuestions) {
        startTimer();
      } else {
        document.getElementById("quiz-container").style.display = "none";
        document.getElementById("result-container").style.display = "block";
      }
    }

    timeSlots[currentQuestionIndex]--;
  }, 1000);
}

// Event Listeners for Next and Previous buttons
nextBtn.addEventListener("click", () => {
  currentQuestionIndex = Math.min(currentQuestionIndex + 1, totalQuestions - 1);
  loadQuestion(currentQuestionIndex);
  startTimer();
});

prevBtn.addEventListener("click", () => {
  currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
  loadQuestion(currentQuestionIndex);
  startTimer();
});

// Initial call
loadQuestion(currentQuestionIndex);

