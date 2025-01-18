const wordListInput = document.getElementById('word-list');
const startBtn = document.getElementById('start-btn');
const testSection = document.getElementById('test-section');
const wordPrompt = document.getElementById('word-prompt');
const userInput = document.getElementById('user-input');
const nextBtn = document.getElementById('next-btn');
const resultSection = document.getElementById('result-section');
const scoreDisplay = document.getElementById('score');
const mistakesList = document.getElementById('mistakes');
const restartBtn = document.getElementById('restart-btn');
const inputSection = document.getElementById('input-section');

let words = [];
let testWords = [];
let currentWordIndex = 0;
let userAnswers = [];
let score = 0;

// Function to shuffle and select random words
function getRandomWords(wordArray, count) {
  return wordArray.sort(() => Math.random() - 0.5).slice(0, count);
}

// Function to read a word using TTS
function speakWord(word) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(word);
  synth.speak(utterance);
}

// Start the test
startBtn.addEventListener('click', () => {
  const inputWords = wordListInput.value.split(',').map(w => w.trim()).filter(Boolean);
  if (inputWords.length < 10) {
    alert('Please enter at least 10 words.');
    return;
  }
  words = inputWords;
  testWords = getRandomWords(words, 10);
  inputSection.classList.add('hidden');
  testSection.classList.remove('hidden');
  currentWordIndex = 0;
  userAnswers = [];
  score = 0;
  wordPrompt.textContent = 'Press "Next" to hear the first word!';
});

// Next word in the test
nextBtn.addEventListener('click', () => {
  if (currentWordIndex > 0) {
    // Store the user's input for the last word
    const userAnswer = userInput.value.trim();
    userAnswers.push(userAnswer);
    userInput.value = '';
  }
  if (currentWordIndex < testWords.length) {
    const currentWord = testWords[currentWordIndex];
    speakWord(currentWord);
    wordPrompt.textContent = `Word ${currentWordIndex + 1} of ${testWords.length}`;
    currentWordIndex++;
  } else {
    // Test is complete, show results
    testSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    showResults();
  }
});

// Show test results
function showResults() {
  mistakesList.innerHTML = '';
  testWords.forEach((word, index) => {
    if (word.toLowerCase() === userAnswers[index]?.toLowerCase()) {
      score++;
    } else {
      const mistake = document.createElement('li');
      mistake.textContent = `You wrote "${userAnswers[index] || 'empty'}", correct is "${word}"`;
      mistakesList.appendChild(mistake);
    }
  });
  scoreDisplay.textContent = `You scored ${score} out of ${testWords.length}.`;
}

// Restart the test
restartBtn.addEventListener('click', () => {
  resultSection.classList.add('hidden');
  inputSection.classList.remove('hidden');
  wordListInput.value = '';
});
