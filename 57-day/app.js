const app = document.getElementById('app');

const duration = 120

let count = {
    timer: duration,
    done: false,
    pause: false,
    button: 'pause'
};

const setData = function (obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			count[key] = obj[key];
		}
	}
	render();
};

let button = () => document.getElementById('button').innerHTML = '<button class="button" id="' + count.button +'">' + count.button +'</button>'

const template = () => {
    if(count.done) return '<h2>Timer\'s Done</h2>';
    let min = Math.floor(count.timer / 60).toString().padStart(1,0);
    let sec = (count.timer % 60).toString().padStart(2,0);
    let clock = '<h2>' + min + ':' + sec + '</h2>';

    return clock;
};

var render = function () {
    if (!app) return;
	app.innerHTML = template();
};
 
const run = ()=>{ 
    setData({
        button: 'pause',
        done: false,
        pause: false
    });

    const start =window.setInterval(() => {
        let time = count.timer - 1;
        let done = time === 0 ? true : false;


        setData({
            timer: time,
            done: done
        });


        if(done || count.pause){
            window.clearInterval(start);
        }
        if(done){
            setData({button: 'restart'});
            button();
        }
    }, 1000);
};

const restart = () => {
    setData({timer: duration});
    run();
};

const pause = () => {
    setData({
        pause: true,
        button: 'start'
    });
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