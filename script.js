let round = 1;
let timeInSeconds = 60;
let timer;
let isTimeRunning = false;

let blueScore = 0;
let blueFoul = 0;
let blueDisarm = 0;

let redScore = 0;
let redFoul = 0;
let redDisarm = 0;

let winnerBoard = [];

const roundEl = document.getElementById('round');
const timerEl = document.getElementById('timer');
const startBtnEl = document.getElementById('startBtn');
const pauseBtnEl = document.getElementById('pauseBtn');
const resetBtnEl = document.getElementById('resetBtn');
const nextRoundBtnEl = document.getElementById('nextRoundBtn');
const newMatchBtnEl = document.getElementById('newMatchBtn');

const blueScoreEl = document.getElementById('blueScore');
const blueScorePlusBtnEl = document.getElementById('blueScorePlusBtn');
const blueScoreMinusBtnEl = document.getElementById('blueScoreMinusBtn');
const blueFoulEl = document.getElementById('blueFoul');
const blueFoulPlusBtnEl = document.getElementById('blueFoulPlusBtn');
const blueFoulMinusBtnEl = document.getElementById('blueFoulMinusBtn');
const blueDisarmEl = document.getElementById('blueDisarm');
const blueDisarmPlusBtnEl = document.getElementById('blueDisarmPlusBtn');
const blueDisarmMinusBtnEl = document.getElementById('blueDisarmMinusBtn');

const redScoreEl = document.getElementById('redScore');
const redScorePlusBtnEl = document.getElementById('redScorePlusBtn');
const redScoreMinusBtnEl = document.getElementById('redScoreMinusBtn');
const redFoulEl = document.getElementById('redFoul');
const redFoulPlusBtnEl = document.getElementById('redFoulPlusBtn');
const redFoulMinusBtnEl = document.getElementById('redFoulMinusBtn');
const redDisarmEl = document.getElementById('redDisarm');
const redDisarmPlusBtnEl = document.getElementById('redDisarmPlusBtn');
const redDisarmMinusBtnEl = document.getElementById('redDisarmMinusBtn');

const redWinnerBtnEl = document.getElementById('redWinnerBtn');
const blueWinnerBtnEl = document.getElementById('blueWinnerBtn');
const drawBtnEl = document.getElementById('drawBtn');

const winnderRound1El = document.getElementById('winnderRound1');
const winnderRound2El = document.getElementById('winnderRound2');
const winnderRound3El = document.getElementById('winnderRound3');

const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

const startBtnClickElEvent = startBtnEl.addEventListener('click', (e) => {
  isTimeRunning = !isTimeRunning;
  startTimer();
  e.target.blur();
});

const startTimer = () => {
  stopTimer();

  if (isTimeRunning) {
    timer = setInterval(() => {
      if (timeInSeconds < 1) {
        stopTimer();
        return;
      }

      timeInSeconds--;
      displayTimer();
    }, 1000);
  }
};

const pauseBtnElClickEvent = pauseBtnEl.addEventListener('click', (e) => {
  isTimeRunning = false;
  stopTimer();
  e.target.blur();
});

const resetBtnElClickEvent = resetBtnEl.addEventListener('click', (e) => {
  resetTimer();
  e.target.blur();
});

const nextRoundBtnElClickEvent = nextRoundBtnEl.addEventListener('click', (e) => {
  resetRound(++round);
  e.target.blur();
});

const newMatchBtnElClickEvent = newMatchBtnEl.addEventListener('click', (e) => {
  winnerBoard = [];
  resetRound();
  e.target.blur();
});

const blueScorePlusBtnElClickEvent = blueScorePlusBtnEl.addEventListener('click', (e) => {
  blueScore++;
  displayBlueScore();
  e.target.blur();
});

const blueScoreMinusBtnElClickEvent = blueScoreMinusBtnEl.addEventListener('click', (e) => {
  blueScore--;
  displayBlueScore();
  e.target.blur();
});

const blueFoulPlusBtnElClickEvent = blueFoulPlusBtnEl.addEventListener('click', (e) => {
  blueFoul++;
  handlePenalty(blueFoul, blueDisarm, 'Red')
  displayBlueFoul();
  e.target.blur();
});

const blueFoulMinusBtnElClickEvent = blueFoulMinusBtnEl.addEventListener('click', (e) => {
  blueFoul--;
  handlePenalty(blueFoul, blueDisarm, 'Red')
  displayBlueFoul();
  e.target.blur();
});

const blueDisarmPlusBtnElClickEvent = blueDisarmPlusBtnEl.addEventListener('click', (e) => {
  blueDisarm++;
  handlePenalty(blueFoul, blueDisarm, 'Red')
  displayBlueDisarm();
  e.target.blur();
});

const blueDisarmMinusBtnElClickEvent = blueDisarmMinusBtnEl.addEventListener('click', (e) => {
  blueDisarm--;
  handlePenalty(blueFoul, blueDisarm, 'Red')
  displayBlueDisarm();
  e.target.blur();
});

const redScorePlusBtnElClickEvent = redScorePlusBtnEl.addEventListener('click', (e) => {
  redScore++;
  displayRedScore();
  e.target.blur();
});

const redScoreMinusBtnElClickEvent = redScoreMinusBtnEl.addEventListener('click', (e) => {
  redScore--;
  displayRedScore();
  e.target.blur();
});

const redFoulPlusBtnElClickEvent = redFoulPlusBtnEl.addEventListener('click', (e) => {
  redFoul++;
  handlePenalty(redFoul, redDisarm, 'Blue')
  displayRedFoul();
  e.target.blur();
});

const redFoulMinusBtnElClickEvent = redFoulMinusBtnEl.addEventListener('click', (e) => {
  redFoul--;
  handlePenalty(redFoul, redDisarm, 'Blue')
  displayRedFoul();
  e.target.blur();
});

const redDisarmPlusBtnElClickEvent = redDisarmPlusBtnEl.addEventListener('click', (e) => {
  redDisarm++;
  handlePenalty(redFoul, redDisarm, 'Blue')
  displayRedDisarm();
  e.target.blur();
});

const redDisarmMinusBtnElClickEvent = redDisarmMinusBtnEl.addEventListener('click', (e) => {
  redDisarm--;
  handlePenalty(redFoul, redDisarm, 'Blue')
  displayRedDisarm();
  e.target.blur();
});

const redWinnerBtnElClickEvent = redWinnerBtnEl.addEventListener('click', (e) => {
  winnerBoard[round - 1] = 'Red';
  displayWinnerBoard();
  e.target.blur();
});

const blueWinnerBtnElClickEvent = blueWinnerBtnEl.addEventListener('click', (e) => {
  winnerBoard[round - 1] = 'Blue';
  displayWinnerBoard();
  e.target.blur();
});

const drawBtnElClickEvent = drawBtnEl.addEventListener('click', (e) => {
  winnerBoard[round - 1] = 'Draw';
  displayWinnerBoard();
  e.target.blur();
});

const handlePenalty = (foul, disarm, winner) => {
  if (foul === 3 && disarm === 2) {
    winnerBoard[round - 1] = winner;
    displayWinnerBoard();
    stopTimer();
  }
}

const resetTimer = () => {
  isTimeRunning = false;
  timeInSeconds = 60;
  displayTimer();
  stopTimer();
}

const resetRound = (newRound = 1) => {
  round = newRound;
  blueScore = 0;
  blueFoul = 0;
  blueDisarm = 0;
  redScore = 0;
  redFoul = 0;
  redDisarm = 0;
  resetTimer();
  display();
}

const displayTimer = () => {
  timerEl.textContent = new Date(timeInSeconds * 1000).toISOString().substr(14, 5);
}

const displayRound = () => {
  roundEl.textContent = round;
}

const displayBlueScore = () => {
  blueScoreEl.textContent = blueScore;
}

const displayBlueFoul = () => {
  blueFoulEl.textContent = blueFoul;
}

const displayBlueDisarm = () => {
  blueDisarmEl.textContent = blueDisarm;
}

const displayRedScore = () => {
  redScoreEl.textContent = redScore;
}

const displayRedFoul = () => {
  redFoulEl.textContent = redFoul;
}

const displayRedDisarm = () => {
  redDisarmEl.textContent = redDisarm;
}

const displayWinnerBoard = () => {
  winnderRound1El.textContent = winnerBoard[0] || 'N/A';
  winnderRound2El.textContent = winnerBoard[1] || 'N/A';
  winnderRound3El.textContent = winnerBoard[2] || 'N/A';
}

const display = () => {
  displayRound();
  displayTimer();
  displayBlueScore();
  displayBlueFoul();
  displayBlueDisarm();
  displayRedScore();
  displayRedFoul();
  displayRedDisarm();
  displayWinnerBoard();
}

const windowLoadEvent = window.addEventListener('load', () => {
  display();
});

const spacePressEvent = window.addEventListener('keypress', (e) => {
  if (e.code !== 'Space') {
  	return;
  }

  isTimeRunning = !isTimeRunning;

  isTimeRunning ? startTimer() : stopTimer();
});