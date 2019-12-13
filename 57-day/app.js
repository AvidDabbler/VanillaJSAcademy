const app = document.getElementById('app');

const duration = 120

let count = {
    timer: duration,
    done: false,
    pause: false,
    button: 'pause'
};

let button = () => document.getElementById('button').innerHTML = '<button class="button" id="' + count.button +'">' + count.button +'</button>'

const template = () => {
    if(count.done) return '<h2>Timer\'s Done</h2>';
    let min = Math.floor(count.timer / 60).toString().padStart(1,0);
    let sec = (count.timer % 60).toString().padStart(2,0);
    let clock = '<h2>' + min + ':' + sec + '</h2>';

    if(count.pause) return clock;
    return clock;
};

var render = function () {
    if (!app) return;
	app.innerHTML = template();
};
 
const run = ()=>{ 
    count.button = 'pause';
    count.done = false;
    count.pause = false;

    const start =window.setInterval(() => {
        let time = count.timer - 1;
        let done = time === 0 ? true : false;

        count.timer = time;
        count.done = done;

        render();

        if(done || count.pause){
            window.clearInterval(start);
        }
        if(done){
            count.button = 'restart';
            render();
            button();
        }
    }, 1000);
};

const restart = () => {
    count.timer = duration
    run();
};

const pause = () => {
    count.pause = true;
    count.button = 'start';
}

run();
button();

const close = (id) => {
    document.getElementById(id).closest('.button');
}

window.addEventListener('click', ()=>{
    if(!document.querySelector('.button')) return;
    else if(event.target.closest('#restart')){
         restart();
    }
    else if(event.target.closest('#pause')){
        pause();
    }
    else if (event.target.closest('#start')) {
        run();
    }
    button();
}, false)