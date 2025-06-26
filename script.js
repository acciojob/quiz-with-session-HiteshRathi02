const questions = [
  {
    question: "1. Capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
  },
  {
    question: "2. Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "Shakespeare", "Mark Twain", "Jane Austen"],
    answer: 1,
  },
  {
    question: "3. Largest planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 2,
  },
  {
    question: "4. Symbol for water?",
    options: ["CO2", "H2O", "O2", "CH4"],
    answer: 1,
  },
  {
    question: "5. Continents on Earth?",
    options: ["5", "6", "7", "8"],
    answer: 2,
  },
];

const container = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.innerText = `Your score is ${savedScore} out of 5.`;
}

let html = "";

questions.forEach((q, index) => {
  html += `<div class="question">
    <p>${q.question}</p>`;

  q.options.forEach((opt, i) => {
    const checked = savedProgress[`q${index}`] == i ? "checked" : "";
    html += `
      <label>
        <input type="radio" name="q${index}" value="${i}" ${checked}>
        ${opt}
      </label>`;
  });

  html += `</div>`;
});

container.innerHTML = html;

questions.forEach((q, index) => {
  const radios = document.getElementsByName(`q${index}`);
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      savedProgress[`q${index}`] = parseInt(radio.value);
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    });
  });
});

submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = savedProgress[`q${index}`];
    if (selected == q.answer) {
      score++;
    }
  });

  scoreDiv.innerText = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});
