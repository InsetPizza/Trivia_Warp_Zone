//array of questions, options, answers, taunts and praises.
const questions = [
    {
        question:" What is the name of the boundary marking the edge of the Sun's influence in space?",
        options:["Kuiper Belt", "Heliopause"],
        answer:"Heliopause",
        taunt: "Oops! That's just the cosmic junk drawer — not the edge of the Sun's kingdom. Try reaching a little farther!",
        praise: "You're clearly made of star stuff — brilliance confirmed.",
        correctIndex: 1
    },
    {
        question:"Which theory best explains the origin of the Moon",
        options: ["It was captured by Earth's gravity", "It formed from debris after a Mars-sized object hit Earth"],
        answer: "It formed from debris after a Mars-sized object hit Earth",
        taunt: "Really? You think Earth just snatched the Moon like a cosmic pickpocket? Nah, it was a smash hit event!",
        praise:"Correct! You must've moonwalked through astrophysics.",
        correctIndex: 1
    },
    {
        question:"What element is primarily responsible for the Sun's energy through nuclear fusion?",
        options:["Hydrogen", "Helium"],
        answer: "Hydrogen",
        taunt: "Close, but no fusion reaction! Helium's the result, not the spark. You just reversed the Sun's homework.",
        praise: "You're clearly made of star stuff — brilliance confirmed.",
        correctIndex: 0
    },
    {
        question: "What type of black hole is believed to exist at the center of most galaxies?",
        options:["Supermassive black hole", "Stellar black hole"],
        answer: "Supermassive black hole",
        taunt: "Tiny thinking! Stellar black holes are like toddlers. Galaxies need a boss — and that's supermassive.",
        praise:"That answer was so accurate, even Hubble's impressed.",
        correctIndex: 0
    },
    {
        question: "Which phenomenon causes pulsars to emit beams of radiation detectable from Earth?",
        options:["Gravitational lensing", "Rapid rotation and strong magnetic fields"],
        answer: "Rapid rotation and strong magnetic fields",
        taunt: "Nice try, Einstein — but pulsars don't bend light, they just spin like DJ stars on overload.",
        praise:"That was faster than a meteor and twice as brilliant!",
        correctIndex: 1
    }
];

const totalQuestions = questions.length;

//colours for step progress bar
const stepColors = ["#7041a6", "#9d49b2ff", "#b777c1ff", "#ba63b5ff", "#d546a1ff"];
const lineColors = ["#ffffffff", "#ffffffff", "#ffffffff", "#ffffffff"];
let currentQuestionIndex = 0;
let score=0;

//DOM element references
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const tauntEl = document.getElementById("taunt");
const resultSlide = document.getElementById("result-box");
const resultText = document.getElementById("resultMessage");
const resultContent = document.querySelector(".overlay-content");

const progressSteps = document.querySelectorAll(".step");
const questionBox = document.getElementById("question-box");
const progressBar = document.querySelector(".progressbar");
const resultMessage = document.createElement("p");
resultMessage.className = "result-message";
questionBox.appendChild(resultMessage);
const nextBtn = document.getElementById("next-btn");
const quizTitle = document.getElementById("quiz-title");
const startScreen = document.getElementById("start-screen");

//next button handler
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderStepProgress();
    loadQuestion();
  } 
  else if (currentQuestionIndex >= questions.length) {
    document.getElementById('result-screen').style.display = 'flex';
    showFinalSlide();
  } 

  updateProgress(currentQuestionIndex);
});

//function to check answer and show praise or taunt
function checkAnswer(selectedIndex) {
  const current = questions[currentQuestionIndex];

  const allButtons = optionsEl.querySelectorAll("button");
  
allButtons.forEach((btn, i) => {
    btn.disabled = true;

    if (i === current.correctIndex) {
      btn.style.backgroundColor = "#28a745";
    } else if (i === selectedIndex) {
      btn.style.backgroundColor = "#c0392b";
    }
  });

  if (selectedIndex === current.correctIndex) {
    score++;
    feedbackEl.textContent = current.praise;
    feedbackEl.style.color = "green"
  } else {
    feedbackEl.textContent = current.taunt;
    feedbackEl.style.color = "red";
  }


  nextBtn.style.display = "inline-block"; 

}

//progress bar above
function renderStepProgress() {
  const stepContainer = document.getElementById('step-progress');
  stepContainer.innerHTML = "";

  for (let i = 0; i < totalQuestions; i++) {
    const container = document.createElement('div');
    container.className = 'step-container';

    const step = document.createElement('div');
    step.classList.add("step");
    step.textContent = i+1;

    if (i < currentQuestionIndex) {
      step.style.backgroundColor = stepColors[i % stepColors.length];
    } else if (i === currentQuestionIndex) {
      step.classList.add("active");
      step.style.backgroundColor = stepColors[i % stepColors.length];
    } else {
      step.style.backgroundColor = "#ccc";
    }

    container.appendChild(step);

    if (i < totalQuestions - 1) {
      const line = document.createElement('div');
      line.classList.add("step-line");

      if (i < currentQuestionIndex) {
        line.style.backgroundColor = lineColors[i % lineColors.length];
      } else {
        line.style.backgroundColor = "#ccc";
      }

      container.appendChild(line);
    }

    stepContainer.appendChild(container);
  }
}

//update the progress bar
function updateProgress(currentIndex) {
  const steps = document.querySelectorAll(".step");
  const lines = document.querySelectorAll(".step-line");

   steps.forEach((step, i) => {
    step.classList.remove("active", "done");
    if (i < currentIndex) {
      step.classList.add("done");
    } else if (i === currentIndex) {
      step.classList.add("active");
    }
  });

  lines.forEach((line, i) => {
    line.classList.remove("active");
    if (i < currentIndex) {
      line.classList.add("active");
    }
  });
  }

//show final result slide
function showFinalSlide() {
    const resultScreen = document.getElementById("result-screen"); 

    const overlayContent = resultScreen.querySelector(".overlay-content");

    let completionMessage = "";

    if (score === questions.length) {
        completionMessage = "Okay, Einstein. Show-off much?";
    } else if (score >= questions.length - 1) {
        completionMessage = "So close… yet still floating aimlessly in space!";
    } else if (score >= Math.floor(questions.length / 2)) {
        completionMessage = "Halfway to Mars... but forgot the oxygen.";
    } else if (score > 0) {
        completionMessage = "You hit a few stars… mostly space junk though.";
    } else {
        completionMessage = "Crash landing! But hey, space is hard.";
    }

     // Update result overlay content
    overlayContent.innerHTML = `
        <h4 class="quiz-finished">Quiz Completed!</h4>
        <p class="completion-text">${completionMessage}</p>
        <p class="final-score">Your Score: ${score}/${questions.length}</p>
        <button class="retry-btn" id="retry-btn">Try Again</button>
    `;

     // Update result overlay content
    document.getElementById("question-box").style.display = "none";
    document.getElementById("step-progress").style.display = "none";
    document.querySelector(".container").style.display = "none";
    ("final-score");
    resultScreen.classList.remove("hidden");

    document.getElementById("retry-btn").addEventListener("click", () => {
        location.reload();
    });
}

//load questions
function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    questionEl.textContent = questionData.question;
    optionsEl.innerHTML="";
    feedbackEl.textContent = "";
    tauntEl.textContent = "";
    feedbackEl.style.color = "";

    // Hide intro text and next button
    document.getElementById('intro-text').style.display = 'none';
    document.getElementById("next-btn").style.display = "none";

      // Create and show options
    questionData.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.className = "option-button";
      button.onclick = () => checkAnswer(index);
      optionsEl.appendChild(button);
});


    document.getElementById("taunt").textContent = "";
}

//to start the quiz and proceed to next slide
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;

    // Hide start screen and reveal quiz
    document.getElementById("start-screen").style.display = "none";

    const quiz = document.getElementById("question-box");
    quiz.style.display = "block";            

    document.querySelector(".container").classList.remove("hidden");
    quizTitle.classList.add("hidden");
    questionBox.classList.remove("hidden");
    resultContent.innerHTML = "";
    document.getElementById("step-progress").style.display = "flex";

    renderStepProgress();
    loadQuestion();
}

//DOM 
document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
        startBtn.addEventListener("click", startQuiz);
    }
});