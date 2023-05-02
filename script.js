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

const winnderRound1El = document.getElementById('winnderRound1');
const winnderRound2El = document.getElementById('winnderRound2');
const winnderRound3El = document.getElementById('winnderRound3');

const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

const startBtnClickElEvent = startBtnEl.addEventListener('click', () => {
  isTimeRunning = !isTimeRunning;

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
});

const pauseBtnElClickEvent = pauseBtnEl.addEventListener('click', () => {
  isTimeRunning = false;
  stopTimer();
});

const resetBtnElClickEvent = resetBtnEl.addEventListener('click', () => {
  resetTimer();
});

const nextRoundBtnElClickEvent = nextRoundBtnEl.addEventListener('click', () => {
  resetRound(++round);
});

const newMatchBtnElClickEvent = newMatchBtnEl.addEventListener('click', () => {
  winnerBoard = [];
  resetRound();
});

const blueScorePlusBtnElClickEvent = blueScorePlusBtnEl.addEventListener('click', () => {
  blueScore++;
  displayBlueScore();
});

const blueScoreMinusBtnElClickEvent = blueScoreMinusBtnEl.addEventListener('click', () => {
  blueScore--;
  displayBlueScore();
});

const blueFoulPlusBtnElClickEvent = blueFoulPlusBtnEl.addEventListener('click', () => {
  blueFoul++;
  displayBlueFoul();
});

const blueFoulMinusBtnElClickEvent = blueFoulMinusBtnEl.addEventListener('click', () => {
  blueFoul--;
  displayBlueFoul();
});

const blueDisarmPlusBtnElClickEvent = blueDisarmPlusBtnEl.addEventListener('click', () => {
  blueDisarm++;
  displayBlueDisarm();
});

const blueDisarmMinusBtnElClickEvent = blueDisarmMinusBtnEl.addEventListener('click', () => {
  blueDisarm--;
  displayBlueDisarm();
});

const redScorePlusBtnElClickEvent = redScorePlusBtnEl.addEventListener('click', () => {
  redScore++;
  displayRedScore();
});

const redScoreMinusBtnElClickEvent = redScoreMinusBtnEl.addEventListener('click', () => {
  redScore--;
  displayRedScore();
});

const redFoulPlusBtnElClickEvent = redFoulPlusBtnEl.addEventListener('click', () => {
  redFoul++;
  displayRedFoul();
});

const redFoulMinusBtnElClickEvent = redFoulMinusBtnEl.addEventListener('click', () => {
  redFoul--;
  displayRedFoul();
});

const redDisarmPlusBtnElClickEvent = redDisarmPlusBtnEl.addEventListener('click', () => {
  redDisarm++;
  displayRedDisarm();
});

const redDisarmMinusBtnElClickEvent = redDisarmMinusBtnEl.addEventListener('click', () => {
  redDisarm--;
  displayRedDisarm();
});

const redWinnerBtnElClickEvent = redWinnerBtnEl.addEventListener('click', () => {
  winnerBoard[round - 1] = 'Red';
  displayWinnerBoard();
});

const blueWinnerBtnElClickEvent = blueWinnerBtnEl.addEventListener('click', () => {
  winnerBoard[round - 1] = 'Blue';
  displayWinnerBoard();
});

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