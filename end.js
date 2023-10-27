const usernames = document.getElementById("username");
const saveScoreButton = document.getElementById("saveScorebutton")
const mostRecentscore = localStorage.getItem("mostRecentscore")
const finalscore = document.getElementById("final_score")
const highscore = JSON.parse(localStorage.getItem("highScore") )|| [];

 const MAX_HIGH_SCORES = 5;
 


  finalscore.innerText = mostRecentscore;
 usernames.addEventListener('keyup', ()=>{
   saveScoreButton.disabled = !usernames.value
});
    saveHighscore = (e) =>{
    console.log('finish');
    
    e.preventDefault();
    
    const score = {
        score : Math.floor(Math.random()*100),
        name : usernames.value,
    };
    highscore.push(score);
    highscore.sort((a,b) => b.score - a.score);
    highscore.splice(5);

      localStorage.setItem("highScore",JSON.stringify(highscore));
     window.location.assign('/Home.html');
     
    
};