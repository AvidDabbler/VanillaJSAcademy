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

const timerFunction = () => {
    let count = {
        timer: 60
    };

    const timerGo = window.setInterval(() => {
        count.timer--;

        if(count.timer < 0){
            window.clearInterval(timerGo);
            //CHANGE
            console.log('<h2>Timer Done!!!</h2>')
            return '<h2>Timer Done!!!</h2>'
        }
        //CHANGE
        console.log('<h2>' + count.timer + '</h2>');
        return '<h2>' + count.timer + '</h2>';

    }, 10);
};

const restartTimer = (event) => {

    if(!event.target.closest('#restart')) return;
    timerFunction();
};


var render = function () {
	if (!app) return;
	app.innerHTML = timerFunction();
};

render();

window.addEventListener('click', restartTimer, false)