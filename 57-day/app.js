const app = document.getElementById('app');

// POLYFILLS
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;
  }
  
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;
  
      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

const duration = 120

let count = {
    timer: 60,
    done: false
};

const template = () => {
    if(count.done) return '<h2>Timer\'s Done</h2><button id="restart">Restart Timer</button>';
    let min = Math.floor(count.timer / 60).toString().padStart(1,0);
    let sec = (count.timer - (min * 60)).toString().padStart(2,0);
    console.log(sec)
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
    }, 100);
}

run();


window.addEventListener('click', ()=>{
    if(!document.getElementById('restart')) return;
    run();

}, false)