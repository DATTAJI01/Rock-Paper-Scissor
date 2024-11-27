let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
  tie: 0
  };

updateScoreElement();


let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-auto-play-btn').addEventListener('click', () => {
  autoPlay(); 
});
 
function autoPlay() {
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
    const playerMove = pickComputerMove();
    playGame(playerMove);
    },1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-btn').innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;  
    document.querySelector('.js-auto-play-btn').innerHTML = 'Auto Play';
  }
}


document.querySelector('.js-rock-btn').addEventListener('click', 
  () => {playGame('Rock');});

document.querySelector('.js-paper-btn').addEventListener('click',
  () => {playGame('Paper');});

document.querySelector('.js-scissors-btn').addEventListener('click',
  () => {playGame('Scissors');});


document.querySelector('.js-reset-score-btn').addEventListener('click',
  () => showConfirmationMessage());
  
  
function resetScore(){
  score.win = 0;
  score.lose = 0;
  score.tie = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  };


document.body.addEventListener('keydown',(event) => {
  if(event.key === 'r'){
    playGame('Rock');
  }
  else if(event.key === 'p'){
    playGame('Paper');
  }
  else if(event.key === 's'){
    playGame('Scissors');
  }
  else if(event.key === 'a'){
    autoPlay();
  }
  else if(event.key === 'Backspace'){
    showConfirmationMessage();
  }
}); 

function showConfirmationMessage(){
  document.querySelector('.js-confirmation-message').innerHTML =     `<p>Are you sure you want to reset the score?</p>
  <button class="js-reset-confirm-btn reset-confirm-btn">
  Yes
  </button>
  <button class="js-reset-cancel-btn reset-cancel-btn">
  No
  </button>`;

  document.querySelector('.js-reset-confirm-btn').addEventListener('click',
    () => {resetScore();
      hideConfirmationMessage();
    });
    
  document.querySelector('.js-reset-cancel-btn').addEventListener('click',
    () => {hideConfirmationMessage();
    });
}


function hideConfirmationMessage(){
  document.querySelector('.js-confirmation-message').innerHTML = '';
}









function playGame(playerMove) {

  const computerMove = pickComputerMove();
  
  let result = '';


  if (playerMove === 'Scissors') {

    if (computerMove === 'Rock') {
      result = 'You lose';
    }else if (computerMove === 'Paper') {
      result = 'You win';
    }else if (computerMove === 'Scissors') {
      result = 'Its a tie';
    }

  }else if (playerMove === 'Paper') {

    if (computerMove === 'Rock') {
      result = 'You win';
    }else if (computerMove === 'Paper') {
      result = 'Its a tie';
    }else if (computerMove === 'Scissors') {
      result = 'You lose';
    }

  }else if (playerMove === 'Rock') {

    if (computerMove === 'Rock') {
      result = 'Its a tie';
    }else if (computerMove === 'Paper') {
      result = 'You lose';
    }else if (computerMove === 'Scissors') {
      result = 'You win';
    }
  }

  if (result === 'You win') {
    score.win++;
  }else if (result === 'You lose') {
    score.lose++;
  }else if (result === 'Its a tie') {
    score.tie++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-moves')
    .innerHTML = `You picked <img class="move-icon" src="Images/${playerMove}-emoji.png" alt="Scissors"> 
    Computer picked <img class="move-icon" src="Images/${computerMove}-emoji.png" alt="Scissors">.`;

  document.querySelector('.js-result')
    .innerHTML = `${result}.`;

  updateScoreElement();
  
  
//       alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}.
// win: ${score.win}, lose: ${score.lose}, tie: ${score.tie}`);
}



function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `win: ${score.win}, lose: ${score.lose}, tie: ${score.tie}`;
}    


function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';
  if (randomNumber>=0 && randomNumber<1/3) {
    computerMove = 'Rock';
  }
  else if (randomNumber>=1/3 && randomNumber<2/3) {
    computerMove = 'Paper';
  }
  else if (randomNumber>=2/3 && randomNumber<1) {
    computerMove = 'Scissors';
  }


  return computerMove;
}

  