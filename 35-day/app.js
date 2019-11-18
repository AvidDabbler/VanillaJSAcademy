import {key} from './config.js'

const weather = (d) =>{
    const div = document.getElementById('app');
    div.innerHTML = '<h1 class="temp">Temperature: ' + d.temp + '<img src="' + d.icon + '" alt="' + d.desc +'"></h1>' 


}


const gps = new Promise (()=>{
    fetch( "https://ipapi.co/json")
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                return Promise.reject(response);
            }
        })
        .then(data =>{       
           return fetch('https://api.weatherbit.io/v2.0/current?lat=' + data.latitude + '&lon=' + data.longitude + '&key=' + key());
        })
        .then(response =>{
            if(response.ok){
                return response.json();
            }else{
                return Promise.reject(response);
            }
        })
        .then(data =>{
            console.log(data)
            return{
                temp: parseInt((data.data[0].temp * 9 / 5) + 32),
                icon: "https://www.weatherbit.io/static/img/icons/" + data.data[0].weather.icon + ".png",
                desc: data.data[0].weather.description

            }
        })
        .then(data => {
            weather(data);
        })
    });

console.log(gps);