const app = document.getElementById('app');


const duration = 120

let count = {
    timer: 60,
    done: false
};

const template = () => {
    if(count.done) return '<h2>Timer\'s Done</h2><button id="restart">Restart Timer</button>';
    let min = Math.floor(count.timer / 60).toString().padStart(1,0);
    let sec = (count.timer - (min * 60)).toString().padStart(2,0);
    return min + ':' + sec;
};

var render = function () {
    if (!app) return;
	app.innerHTML = template();
};
 
const run = ()=>{ 
    count.timer = duration;
    count.done = false;

    const start =window.setInterval(() => {
        let time = count.timer - 1;
        let done = time === 0 ? true : false;

        count.timer = time;
        count.done = done;

        render();

        if(done){
            window.clearInterval(start);
        }
    }, 1000);
}

run();


window.addEventListener('click', ()=>{
    if(!document.getElementById('restart')) return;
    run();

}, false)