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
 
const run = ()=>{ 
    const start =window.setInterval(() => {
        count.timer--;
        render();

        if(count.timer === 0 ){
            window.clearInterval(start);
        }
    }, 1000);
}

render();


window.addEventListener('click', ()=>{
    if(count.timer == 60){
        run();
    }
    else if(count.timer === 0){
        count.timer = 60;
        render();
        run;
    }

}, false)