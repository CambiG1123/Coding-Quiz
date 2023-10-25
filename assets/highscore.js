const scoreListEl = document.getElementById('scoreList')
let recentScore = localStorage.getItem('mostRecentScore')
let recentPlayerName = localStorage.getItem('recentPlayerName')


function renderScores() {
    let scoresAndPlayers = JSON.parse(localStorage.getItem('scoresAndPlayers')) || [];

    scoresAndPlayers.push({player: recentPlayerName, score: recentScore})

localStorage.setItem('scoresAndPlayers', JSON.stringify(scoresAndPlayers));

  
    // Clear the existing list
    scoreListEl.innerHTML = '';
  
    scoresAndPlayers.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.player}: ${item.score}`;
      scoreListEl.appendChild(listItem);
    });
  }
  renderScores()