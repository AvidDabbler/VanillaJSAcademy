const app = document.getElementById('app');
const score = document.getElementById('score');
const reset = document.getElementById('reset');

let standing = {
    win: 0,
    lose: 0,
    correct: 0
};


var monsters = [
    'monster1',
    'monster2',
    'monster3',
    'monster4',
    'monster5',
    'monster6',
    'monster7',
    'monster8',
    'monster9',
    'monster10',
    'monster11',
    'sock'
];

let shuffleMonsters;

var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

const init= ()=>{
    shuffleMonsters = shuffle(monsters.slice());

    app.innerHTML = "<div class='row'>" + shuffleMonsters.map((monster, index) =>{
        const html = "<div aria-live='polite' class='grid door'>"
            + "<button class='monster-button' data-monster-id ='" + index + "'>"
                + "<img id='" + index + "' alt='Click to find all the monsters' src='door.svg'></button></div>";
        return html;
    }).join('') + '</div>';
    standing.correct = 0;

}

const clickDoor = el =>{
    const monster = el.target.closest('[data-monster-id]');

    if(!monster){
        return;
    }
    const id = monster.getAttribute('data-monster-id');
    if (shuffleMonsters[id] == 'sock'){
        monster.parentNode.innerHTML = "<img alt='" + shuffleMonsters[id] + "' src='" + shuffleMonsters[id] +".svg'>";
        alert('You lost the game');
        init();
        standing.lose++;
        score.innerHTML = "<h3 class ='full' id = 'score'> Win: " + standing.win + " | Lose: " + standing.lose + "</h3>"; 
    }else if(standing.correct < (monsters.length-2)){
        monster.parentNode.innerHTML = "<img alt='" + shuffleMonsters[id] + "' src='" + shuffleMonsters[id] +".svg'>";
        standing.correct++;
    }else{
        alert('you won the game');
        standing.win++;
        score.innerHTML = "<h3 class ='full' id = 'score'> Win: " + standing.win + " | Lose: " + standing.lose + "</h3>"; 
        init();
    }
};

reset.addEventListener('click', init, false);
app.addEventListener('click', clickDoor, false);
init();
