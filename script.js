// Predefined words categorized by weeks
const wordsByWeek = {
  1: [
    "over", "new", "art", "take", "only", "car", "park", "hard", "barn", "card", "shark", "dark", "oh", "eyes", "date", "hold"
  ],
  2: [
    "little", "work", "know", "place", "years", "rain", "mail", "wait", "paint", "chant", "paid", "sail", "goods", "services", "consumer", "producer"
  ],
  3: [
    "live", "me", "cool", "give", "most", "saw", "law", "raw", "jar", "straw", "draw", "country", "ocean", "title", "skip", "change"
  ],
  4: [
    "very", "after", "things", "our", "just", "girl", "dirt", "shirt", "third", "thirst", "birth", "yellow", "add", "got", "life", "cycle"
  ],
  // Add other weeks here ...
  // Week 5 to Week 36...
};

// State variables
let selectedWeeks = [];
let testMode = 'normal';
let wordsToTest = [];
let currentWordIndex = 0;
let mistakes = [];

// Dynamically populate week selector and handle mode changes
window.onload = () => {
  const weekSelector = document.getElementById('week-selector');
  for (let i = 1; i <= 36; i++) {
    const weekOption = document.createElement('div');
    weekOption.className = 'form-check';
    weekOption.innerHTML = `
      <input class="form-check-input" type="checkbox" value="${i}" id="week-${i}">
      <label class="form-check-label" for="week-${i}">Week ${i}</label>
    `;
    weekSelector.appendChild(weekOption);
  }

  // Button to start test
  document.getElementById('start-btn').addEventListener('click', startTest);
  document.getElementById('normal-mode').addEventListener('change', () => { testMode = 'normal'; });
  document.getElementById('hard-mode').addEventListener('change', () => { testMode = 'hard'; });
};

// Collect selected weeks
function getSelectedWeeks() {
  selectedWeeks = [];
  for (let i = 1; i <= 36; i++) {
    const checkbox = document.getElementById(`week-${i}`);
    if (checkbox.checked) {
      selectedWeeks.push(i);
    }
  }
}

// Generate test words based on selected weeks and mode
function generateTestWords() {
  getSelectedWeeks();
  const words = [];
  selectedWeeks.forEach(week => {
    const weekWords = wordsByWeek[week];
    const range = testMode === 'normal' ? 10 : 16;
    const selectedWords = weekWords.slice(0, range);
    words.push(...selectedWords);
  });
  
  // Randomly shuffle and select 10 or 16 words based on mode
  wordsToTest = shuffle(words).slice(0, testMode === 'normal' ? 10 : 16);
}

// Shuffle array (Fisher-Yates shuffle)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Start the test
function startTest() {
  getSelectedWeeks();
  if (selectedWeeks.length === 0) {
    alert('Please select at least one week.');
    return;
  }
  
  generateTestWords();
  showTestSection();
  currentWordIndex = 0;
  showNextWord();
}

// Show the test section and hide the home section
function showTestSection() {
  document.getElementById('home-section').classList.add('hidden');
  document.getElementById('test-section').classList.remove('hidden');
}

// Show the next word in the test
function showNextWord() {
  if (currentWordIndex < wordsToTest.length) {
    const word = wordsToTest[currentWordIndex];
    document.getElementById('word-prompt').innerText = word;
    document.getElementById('user-input').value = '';
    document.getElementById('user-input').focus();
    currentWordIndex++;
  } else {
    showResults();
  }
}

// Show the results at the end of the test
function showResults() {
  document.getElementById('test-section').classList.add('hidden');
  document.getElementById('result-section').classList.remove('hidden');
  
  let score = 0;
  const wordResults = document.getElementById('word-results');
  wordResults.innerHTML = '';
  
  wordsToTest.forEach((word, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    
    const userAnswer = document.getElementById('user-input').value.trim();
    const isCorrect = userAnswer.toLowerCase() === word.toLowerCase();
    if (isCorrect) {
      score++;
    } else {
      mistakes.push(word);
    }

    listItem.innerHTML = `${word} - ${isCorrect ? 'Correct' : 'Wrong'}`;
    wordResults.appendChild(listItem);
  });
  
  document.getElementById('score').innerText = `Score: ${score}/${wordsToTest.length}`;
  document.getElementById('test-mistakes-btn').classList.toggle('hidden', mistakes.length === 0);
}

// Handle retake or mistakes test
document.getElementById('retake-btn').addEventListener('click', () => {
  mistakes = [];
  startTest();
});

document.getElementById('test-mistakes-btn').addEventListener('click', () => {
  wordsToTest = mistakes;
  showTestSection();
  currentWordIndex = 0;
  showNextWord();
});

// Navigate back to home
document.getElementById('home-btn').addEventListener('click', () => {
  document.getElementById('result-section').classList.add('hidden');
  document.getElementById('home-section').classList.remove('hidden');
});
