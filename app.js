const wordListInput = document.getElementById('word-list');
const generateBtn = document.getElementById('generate-btn');
const startBtn = document.getElementById('start-btn');
const testSection = document.getElementById('test-section');
const wordPrompt = document.getElementById('word-prompt');
const userInput = document.getElementById('user-input');
const nextBtn = document.getElementById('next-btn');
const repeatBtn = document.getElementById('repeat-btn');
const resultSection = document.getElementById('result-section');
const scoreDisplay = document.getElementById('score');
const wordResults = document.getElementById('word-results');
const restartBtn = document.getElementById('restart-btn');
const inputSection = document.getElementById('input-section');

let words = [];
let testWords = [];
let currentWordIndex = 0;
let userAnswers = [];
let score = 0;

// Predefined list of words to generate random words
const predefinedWords = [
  'apple', 'banana', 'cherry', 'date', 'elephant', 'falcon', 'grape', 'hippopotamus',
  'igloo', 'jaguar', 'kangaroo', 'lemon', 'mango', 'nectarine', 'orange', 'peach',
  'quince', 'raspberry', 'strawberry', 'tomato', 'umbrella', 'violet', 'walnut',
  'xylophone', 'yacht', 'zebra', 'ant', 'bee', 'cat', 'dog', 'eagle', 'frog',
  'goose', 'hawk', 'iguana', 'jellyfish', 'kiwi', 'lion', 'monkey', 'newt',
  'owl', 'penguin', 'quokka', 'rabbit', 'snake', 'tiger', 'urchin', 'vulture',
  'whale', 'xerus', 'yak', 'zucchini'
];

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

// Generate random words and fill the input
generateBtn.addEventListener('click', () => {
  const randomWords = getRandomWords(predefinedWords, 50);
  wordListInput.value = randomWords.join(', ');
});

// Start the test
startBtn.addEventListener('click', () => {
  if (words.length === 0) {
    const inputWords = wordListInput.value.split(',').map(w => w.trim()).filter(Boolean);
    if (inputWords.length < 10) {
      alert('Please enter at least 10 words.');
      return;
    }
    words = inputWords
