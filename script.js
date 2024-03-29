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
let scores = [];

const blueContainerEl = document.getElementById('blueContainer');
const redContainerEl = document.getElementById('redContainer');

const roundEl = document.getElementById('round');
const timerEl = document.getElementById('timer');
const startBtnEl = document.getElementById('startBtn');
const pauseBtnEl = document.getElementById('pauseBtn');
const resetBtnEl = document.getElementById('resetBtn');
const nextRoundBtnEl = document.getElementsByClassName('nextRoundBtn');
const newMatchBtnEl = document.getElementsByClassName('newMatchBtn');

const blueScoreEl = document.getElementById('blueScore');
const blueScorePlusBtnEl = document.getElementsByClassName('blueScorePlusBtn');
const blueScoreMinusBtnEl = document.getElementById('blueScoreMinusBtn');
const blueFoulEl = document.getElementById('blueFoul');
const blueFoulPlusBtnEl = document.getElementById('blueFoulPlusBtn');
const blueFoulMinusBtnEl = document.getElementById('blueFoulMinusBtn');
const blueDisarmEl = document.getElementById('blueDisarm');
const blueDisarmPlusBtnEl = document.getElementById('blueDisarmPlusBtn');
const blueDisarmMinusBtnEl = document.getElementById('blueDisarmMinusBtn');

const redScoreEl = document.getElementById('redScore');
const redScorePlusBtnEl = document.getElementsByClassName('redScorePlusBtn');
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

const winnerModalTextEl = document.getElementById('winnerModalText');

const stopTimer = () => {
  toggleTimerBackground();

  if (!timer) {
    return;
  }

  clearInterval(timer);
  timer = null;
}

const toggleTimerBackground = () => {
  if (timeInSeconds === 60 || isTimeRunning) {
    timerEl.parentElement.classList.remove('bg-warning');
    timerEl.parentElement.classList.add('bg-light');
    return;
  }

  timerEl.parentElement.classList.remove('bg-light');
  timerEl.parentElement.classList.add('bg-warning');
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

const nextRoundBtnElClickEvent = Array.from(nextRoundBtnEl).forEach(el => {
  el.addEventListener('click', (e) => {
    scores[round] = {
      blue: blueScore,
      red: redScore,
    }
    
    if (round >= 3) {
      displayScores();
      return;
    }
  
    if (!winnerBoard[round - 1]) {
      alert('Please declare a winner!');
      return;
    }
  
    resetRound(++round);

    e.target.blur();
  });
})



const newMatchBtnElClickEvent = Array.from(newMatchBtnEl).forEach(el => {
  el.addEventListener('click', (e) => {
    if (winnerBoard.length !== 3) {
      if (!confirm('There is no declared winner. Do you want a new match?')) {
        return;
      }
    }
  
    winnerBoard = [];
    scores = [];
    resetRound();
    blueContainerEl.classList.remove('first-point-indicator');
    redContainerEl.classList.remove('first-point-indicator');
    e.target.blur();
  });
})

const blueScorePlusBtnElClickEvent = Array.from(blueScorePlusBtnEl).forEach((el, i) => {
  el.addEventListener('click', (e) => {
    if (i === 0) {
      blueScore++;
    }

    if (i === 1) {
      if (blueContainerEl.classList.contains('first-point-indicator') && blueScore > 0) {
        blueContainerEl.classList.remove('first-point-indicator');
        el.textContent = 'First Point';
        blueScore--;
      } else {
        blueContainerEl.classList.add('first-point-indicator');
        el.textContent = 'Remove First Point';
        blueScore++;
      }
    }
    displayBlueScore();
    e.target.blur();
  });
})

const blueScoreMinusBtnElClickEvent = blueScoreMinusBtnEl.addEventListener('click', (e) => {
  if (blueScore === 0) {
    return;
  }
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

const redScorePlusBtnElClickEvent = Array.from(redScorePlusBtnEl).forEach((el, i) => {
  el.addEventListener('click', (e) => {
    if (i === 0) {
      redScore++;
    }

    if (i === 1) {
      if (redContainerEl.classList.contains('first-point-indicator') && redScore > 0) {
        redContainerEl.classList.remove('first-point-indicator');
        el.textContent = 'First Point';
        redScore--;
      } else {
        redContainerEl.classList.add('first-point-indicator');
        el.textContent = 'Remove First Point';
        redScore++;
      }
    }
    displayRedScore();
    e.target.blur();
  });
})

const redScoreMinusBtnElClickEvent = redScoreMinusBtnEl.addEventListener('click', (e) => {
  if (redScore === 0) {
    return;
  }

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
  winnerBoard[round - 1] = {
    text: 'Red',
    class: 'bg-danger',
  };
  winnerModalTextEl.textContent = 'Red';
  winnerModalTextEl.classList.remove(...['bg-primary', 'bg-secondary']);
  winnerModalTextEl.classList.add('bg-danger');
  displayWinnerBoard();
  e.target.blur();
});

const blueWinnerBtnElClickEvent = blueWinnerBtnEl.addEventListener('click', (e) => {
  winnerBoard[round - 1] = {
    text: 'Blue',
    class: 'bg-primary',
  };
  winnerModalTextEl.textContent = 'Blue';
  winnerModalTextEl.classList.remove(...['bg-danger', 'bg-secondary']);
  winnerModalTextEl.classList.add('bg-primary');
  displayWinnerBoard();
  e.target.blur();
});

const drawBtnElClickEvent = drawBtnEl.addEventListener('click', (e) => {
  winnerBoard[round - 1] = {
    text: 'Draw',
    class: 'bg-secondary',
  };
  winnerModalTextEl.textContent = 'Draw';
  winnerModalTextEl.classList.remove(...['bg-danger', 'bg-primary']);
  winnerModalTextEl.classList.add('bg-secondary');
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
  blueContainerEl.classList.remove('first-point-indicator');
  redContainerEl.classList.remove('first-point-indicator');
  Array.from(blueScorePlusBtnEl)[1].textContent = 'First Point';
  Array.from(redScorePlusBtnEl)[1].textContent = 'First Point'
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
  const [w1, w2, w3] = winnerBoard;

  winnderRound1El.textContent = '';
  winnderRound1El.classList.remove(...winnderRound1El.classList);
  winnderRound2El.textContent = '';
  winnderRound2El.classList.remove(...winnderRound2El.classList);
  winnderRound3El.textContent = '';
  winnderRound3El.classList.remove(...winnderRound3El.classList);

  if (w1) {
    winnderRound1El.textContent = w1.text;
    winnderRound1El.classList.add(...['badge', w1.class]);
  }

  if (w2) {
    winnderRound2El.textContent = w2.text;
    winnderRound2El.classList.remove(...winnderRound2El.classList);
    winnderRound2El.classList.add(...['badge', w2.class]);
  }

  if (w3) {
    winnderRound3El.textContent = w3.text;
    winnderRound3El.classList.remove(...winnderRound3El.classList);
    winnderRound3El.classList.add(...['badge', w3.class]);
  }
}

const displayScores = () => {
  const [, r1, r2, r3] = scores;

  document.getElementById('blueScoreR1').textContent = r1 ? r1.blue : '';
  document.getElementById('redScoreR1').textContent = r1 ? r1.red : '';
  document.getElementById('blueScoreR2').textContent = r2 ? r2.blue : '';
  document.getElementById('redScoreR2').textContent = r2 ? r2.red : '';
  document.getElementById('blueScoreR3').textContent = r3 ? r3.blue : '';
  document.getElementById('redScoreR3').textContent = r3 ? r3.red : '';
};

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
  displayScores();
}

const windowLoadEvent = window.addEventListener('load', () => {
  display();
});

const spacePressEvent = window.addEventListener('keypress', (e) => {
  if (e.code !== 'Space') {
  	return;
  }

  e.preventDefault();

  isTimeRunning = !isTimeRunning;

  isTimeRunning ? startTimer() : stopTimer();
});