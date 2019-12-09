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

        console.log('start of timer');
        count.timer--;

        if(count.timer < 0){
            window.clearInterval(timerGo);
            app.innerHTML = '<h2>Timer Done!!!</h2>'
        }else{
            app.innerHTML = '<h2>' + count.timer + '</h2>';
        }

    }, 10);
};

const restartTimer = (event) => {
    if(!event.target.closest('#restart')) return;
    timerFunction();
};

timerFunction();

window.addEventListener('click', restartTimer, false)