const app = document.getElementById('app');
let count = 0;

const timerGo = window.setInterval(() => {
    count++;

    if(count < 10){
        window.clearInterval(timerGo);
        app.innerHTML = '<h2>Timer Done!!!</h2>'
        count = 0;
    }else{
        app.innerHTML = '<h2>' + count + '</h2>';
    }

}, 1000);

const init = () => {
    timerGo();
}

init();
