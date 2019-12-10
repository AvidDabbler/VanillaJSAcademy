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


let count = {
    timer: 60
};

const template = () => {
    if(count.timer === 0 ) return '<h2>Timer\'s Done</h2>';
    return '<h2>'+ count.timer +'</h2>'
};

var render = function () {
    if (!app) return;
	app.innerHTML = template();
};
const clear = ()=>{
    count.timer = 60;
    window.clearInterval(run);
} 
const run = () => {
    const start = window.setInterval(() => {
        count.timer === 0 ? clear : count.timer--;
        render();
    }, 100)
};

render();
run();

window.addEventListener('click', ()=>{
    if(count.timer > 0){
        clear();
        run();
    }else{
        count.timer = 60;
        run();
    }
}, false)