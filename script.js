const quizData = [
    {
        question: "¿Qué anime presenta el épico despertar del 'Gear 5'?",
        options: ["Naruto", "One Piece", "Dragon Ball Z", "Bleach"],
        correct: 1
    },
    {
        question: "¿Qué grupo de K-Pop hizo historia con el éxito mundial 'Dynamite'?",
        options: ["EXO", "Stray Kids", "BTS", "SEVENTEEN"],
        correct: 2
    },
    {
        question: "¿Cómo se llama el protagonista de 'Solo Leveling'?",
        options: ["Sung Jin-woo", "Tanjiro Kamado", "Izuku Midoriya", "Kirito"],
        correct: 0
    },
    {
        question: "¿Cuál es el nombre oficial del fandom de BLACKPINK?",
        options: ["Army", "Once", "Blink", "Stay"],
        correct: 2
    },
    {
        question: "¿En qué anime aparece el poderoso hechicero Satoru Gojo?",
        options: ["Hunter x Hunter", "Jujutsu Kaisen", "Demon Slayer", "Black Clover"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const progressEl = document.getElementById('quiz-progress');
const nextBtn = document.getElementById('next-btn');

function loadQuiz() {
    const currentQuizData = quizData[currentQuestion];
    questionEl.innerText = currentQuizData.question;
    optionsEl.innerHTML = '';

    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.innerText = option;
        button.addEventListener('click', () => selectOption(index, button));
        optionsEl.appendChild(button);
    });

    progressEl.innerText = `Pregunta ${currentQuestion + 1} de ${quizData.length}`;
    nextBtn.style.display = 'none';
}

function selectOption(index, element) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');

    // Store answer selection logic if needed, or check immediately
    // For this simple version, we'll just enable the next button
    nextBtn.style.display = 'block';
    nextBtn.dataset.selected = index;
}

nextBtn.addEventListener('click', () => {
    const selectedAnswer = parseInt(nextBtn.dataset.selected);
    if (selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
});

function showResults() {
    let message = "";
    if (score === quizData.length) message = "¡Eres una leyenda viviente! 👑";
    else if (score > quizData.length / 2) message = "¡Nada mal, fan de corazón! ✨";
    else message = "¡Sigue practicando, padawan! 🌸";

    document.getElementById('quiz-content').innerHTML = `
        <div style="text-align: center;">
            <h2 style="font-size: 3rem; margin-bottom: 1rem;">${score}/${quizData.length}</h2>
            <p style="font-size: 1.5rem; margin-bottom: 2rem;">${message}</p>
            <button onclick="location.reload()" class="cta-btn">Reintentar</button>
        </div>
    `;
    progressEl.style.display = 'none';
}

// Initial load
loadQuiz();

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
