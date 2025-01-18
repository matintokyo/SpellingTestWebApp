const wordListInput = document.getElementById('word-list');
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

// Predefined list of 100 words
const predefinedWords = [
  'apple', 'banana', 'cherry', 'date', 'elephant', 'falcon', 'grape', 'hippopotamus',
  'igloo', 'jaguar', 'kangaroo', 'lemon', 'mango', 'nectarine', 'orange', 'peach',
  'quince', 'raspberry', 'strawberry', 'tomato', 'umbrella', 'violet', 'walnut',
  'xylophone', 'yacht', 'zebra', 'ant', 'bee', 'cat', 'dog', 'eagle', 'frog',
  'goose', 'hawk', 'iguana', 'jellyfish', 'kiwi', 'lion', 'monkey', 'newt',
  'owl', 'penguin', 'quokka', 'rabbit', 'snake', 'tiger', 'urchin', 'vulture',
  'whale', 'xerus', 'yak', 'zucchini', 'cloud', 'rainbow', 'forest', 'mountain',
  'river', 'ocean', 'desert', 'island', 'prairie', 'plateau', 'valley', 'meadow',
  'cliff', 'canyon', 'lake', 'waterfall', 'stream', 'geyser', 'volcano', 'glacier',
  'hill', 'dune', 'reef', 'lagoon', 'beach', 'shore', 'bay', 'cave', 'delta',
  'plain', 'peak', 'peninsula', 'archipelago', 'marsh', 'swamp', 'bog', 'savanna',
  'jungle', 'rainforest', 'tundra', 'steppe', 'fjord', 'estuary', 'grove', 'orchard'
];

// Prepopulate the word list when the page loads
document.addEventListener('DOMContentLoaded', () => {
  wordListInput.value = predefinedWords.join(', '); // Populate the textarea with predefined words
});

// Start the test
startBtn.addEventListener('click', () => {
  if (words.length === 0) {
    const inputWords = wordListInput.value.split(',').map(w => w.trim()).filter(Boolean);
    if (inputWords.length < 10) {
      alert('Please enter at least 10 words.');
      return;
    }
    words = inputWords;
  }
  startTest();
});

// Other functions like `startTest`, `nextBtn` click handler, `endTest`, etc., remain unchanged
