import {key} from './config.js'

const app = document.getElementById('app');
const icon = document.getElementById('icon');
const temp = document.getElementById('temp');
const desc = document.getElementById('desc');
const submit = document.getElementById('submit');
const input = document.getElementById('zip_input');

var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

const weather = (d) =>{
    app.innerHTML = '<h1>' + sanitizeHTML(d.city_name) + ', ' + sanitizeHTML(d.state_code) +'</h1>';
    icon.innerHTML = '<img src="https://www.weatherbit.io/static/img/icons/' + sanitizeHTML(d.weather.icon) + '.png" alt="' + sanitizeHTML(d.desc) +'">' 
    temp.innerHTML = '<h2 class="temp">Temperature: ' + sanitizeHTML(parseInt((d.temp * 9 / 5) + 32)) + '&#176;</h2>' 
    desc.innerHTML = '';
    
}

const getWeather = (zip)=>{
    fetch('https://api.weatherbit.io/v2.0/current?postal_code=' + zip + '&key=' + key())
    .then(response =>{
        if(response.ok){
            return response.json();
        }else{
            return Promise.reject(response);
        }
    })
    .then(data =>{
        return data.data[0];
    })
    .then(data => {
        weather(data);
    });
}

fetch( "https://ipapi.co/json")
    .then(response => {
        if(response.ok){
            return response.json();
        }else{
            return Promise.reject(response);
        }
    })
    .then(data =>{       
        getWeather(data.postal);
    });
   


document.addEventListener("click", event =>{
    const subzip = event.target.closest('#zip_submit');
    if(!subzip){
        return;
    }else if(parseInt(zip_input.value) < 10000 || parseInt(zip_input.value) > 100000){
        return;
    }else{
        getWeather(parseInt(zip_input.value));
    }

});