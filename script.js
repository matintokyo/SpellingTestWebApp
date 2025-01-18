const wordListInput = document.getElementById('word-list');
const startBtn = document.getElementById('start-btn');
const inputSection = document.getElementById('input-section'); // Properly defined
const testSection = document.getElementById('test-section');
const wordPrompt = document.getElementById('word-prompt');
const userInput = document.getElementById('user-input');
const nextBtn = document.getElementById('next-btn');
const repeatBtn = document.getElementById('repeat-btn');
const resultSection = document.getElementById('result-section');
const scoreDisplay = document.getElementById('score');
const wordResults = document.getElementById('word-results');
const restartBtn = document.getElementById('restart-btn');
const voiceSelect = document.getElementById('voice-select');

let words = [];
let testWords = [];
let currentWordIndex = 0;
let userAnswers = [];
let score = 0;
let selectedVoice = null;

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

// Prepopulate the word list and load voices
document.addEventListener('DOMContentLoaded', () => {
  wordListInput.value = predefinedWords.join(', ');
  populateVoiceList();
});

// Populate TTS voices in the dropdown
function populateVoiceList() {
    const voices = speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('voice-select');

    // Clear previous options
    voiceSelect.innerHTML = '';

    // Filter voices to only English voices (those with 'en-' in their name)
    const englishVoices = voices.filter(voice => voice.lang.includes('en-'));

    // Populate the voice select options
    englishVoices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = voice.name;
        option.value = voice.name;
        voiceSelect.appendChild(option);
    });

    // Set the default voice if available
    if (englishVoices.length > 0) {
        voiceSelect.value = englishVoices[0].name;
    }
}

// Make sure the voices are loaded (sometimes the browser loads them asynchronously)
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
} else {
    populateVoiceList();
}

// Start the test
startBtn.addEventListener('click', () => {
  const inputWords = wordListInput.value.split(',').map(w => w.trim()).filter(Boolean);
  if (inputWords.length < 10) {
    alert('Please enter at least 10 words.');
    return;
  }
  words = inputWords;
  startTest();
});

function startTest() {
  testWords = getRandomWords(words, 10); // Get 10 random words for the test
  inputSection.classList.add('hidden');
  resultSection.classList.add('hidden');
  testSection.classList.remove('hidden');
  currentWordIndex = 0;
  userAnswers = [];
  score = 0;
  repeatBtn.disabled = true;
  userInput.value = '';
  wordPrompt.textContent = 'Press "Next" to hear the first word!';
  userInput.focus(); // Focus the input box initially
}

// Next word in the test
nextBtn.addEventListener('click', () => {
  if (currentWordIndex > 0) {
    const userAnswer = userInput.value.trim();
    userAnswers.push(userAnswer);
    userInput.value = '';
  }

  if (currentWordIndex < testWords.length) {
    const currentWord = testWords[currentWordIndex];
    speakWord(currentWord);
    wordPrompt.textContent = `Word ${currentWordIndex + 1} of ${testWords.length}`;
    repeatBtn.disabled = false;
    currentWordIndex++;
    userInput.focus(); // Focus the input box automatically
  } else {
    endTest();
  }
});

// Repeat the current word
repeatBtn.addEventListener('click', () => {
  const currentWord = testWords[currentWordIndex - 1];
  speakWord(currentWord);
});

// End the test and show results
function endTest() {
  const userAnswer = userInput.value.trim();
  userAnswers.push(userAnswer);
  testSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  displayResults();
}

// Display results
function displayResults() {
  score = 0;
  wordResults.innerHTML = '';
  testWords.forEach((word, index) => {
    const userAnswer = userAnswers[index] || 'empty';
    const isCorrect = word.toLowerCase() === userAnswer.toLowerCase();
    if (isCorrect) score++;

    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${word} - ${isCorrect ? 'Correct' : `Wrong (You wrote: "${userAnswer}")`}`;
    listItem.style.color = isCorrect ? 'green' : 'red';
    wordResults.appendChild(listItem);
  });
  scoreDisplay.textContent = `You scored ${score} out of ${testWords.length}.`;
}

// Restart the test
restartBtn.addEventListener('click', () => {
  startTest();
});

// Function to get random words
function getRandomWords(wordArray, count) {
  return wordArray
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

// Function to read a word using TTS
function speakWord(word) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(word);
  if (selectedVoice) utterance.voice = selectedVoice;
  synth.speak(utterance);
}
