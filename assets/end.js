const myScore = document.getElementById('myScore')
const saveScoreBtn = document.getElementById('saveScore')
const playerName = document.getElementById('playerName')


saveScoreBtn.addEventListener('click', ()=>{
    let recentPlayerName = playerName.value
    localStorage.setItem('recentPlayerName', recentPlayerName)

 })

myScore.innerText += localStorage.getItem('mostRecentScore')

