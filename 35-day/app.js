import {key} from './config.js'

// DIV SELECTORS
// const app = document.getElementById('app');
// const icon = document.getElementById('icon');
// const temp = document.getElementById('temp');
// const desc = document.getElementById('desc');
const submit = document.getElementById('submit');
const input = document.getElementById('zip_input');

// SANITIZE API DATA HELPER FUNCTION



// // SCRAPE WEATHER DATA
// const weatherData = (d, type = 'f') =>{
//     return{
//         temp: (type == 'f') ? String(Math.round(d.temp * (9 / 5) + 32)) :String(Math.round(d.temp)),
//         city: sanitizeHTML(d.city_name),
//         state: sanitizeHTML(d.state_code),
//         desc:  sanitizeHTML(d.weather.description),
//         icon: sanitizeHTML(d.weather.icon)

//     }
// }



// const init = (div, icon, tempType)=>{
//     // GET LOCATION DATA CALL WEATHER DATA
//     fetch( "https://ipapi.co/json")
//     .then(response => {
//         if(response.ok){
//             return response.json();
//         }else{
//             return Promise.reject(response);
//         }
//     })
//     .then(data =>{      
//         getWeather(data.city, data.region_code);
//     });


//     const getWeather = (city, region)=>{
//         fetch('https://api.weatherbit.io/v2.0/current?city=' + city + ', ' + region + '&key=' + key())
//         .then(response =>{
//             if(response.ok){
//                 return response.json();
//             }else{
//                 return Promise.reject(response);
//             }
//         })
//         .then(data =>{
//             return data.data[0];
//         })
//         .then(data => {
//             return weatherData(data , tempType);
//         }).then(data=>{
//             const container = document.querySelector(div);
//             const locHTML = '<h1>' + data.city + ', ' + data.state +'</h1>';
//             const iconHTML = '<img src="https://www.weatherbit.io/static/img/icons/' + data.icon + '.png" alt="' + data.desc +'">';
//             const tempHTML = '<h2 class="temp">Temperature: ' + data.temp + '&#176;</h2>';
//             const descHTML = '<h3>' + data.desc + '</h3>'
            
//             if(icon == true){
//                 container.innerHTML = locHTML + iconHTML + tempHTML + descHTML;
//             }else{
//                 container.innerHTML = locHTML + tempHTML + descHTML;
//             }
//             return data;
//         });
//     };
// };




const getTheWeather = options =>{
    let defaults = {
        apiKey: null,
        selector: null,
        convertTemp: true,
        selector: '#app',
        description: 'It is currently {{temp}} degrees and {{conditions}} in {{city}}, {{state}}.',
        noWeather: 'Unable to get weather data at this time. Sorry!',
        showIcon: true
    };

    const settings = Object.assign(defaults, options);

    const app = document.querySelector(settings.selector); // '#app'

    /**
     * Sanitize and encode all HTML in a user-submitted string
     * @param  {String} str  The user-submitted string
     * @return {String} str  The sanitized string
     */

    const sanitizeHTML = function (str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    /**
     * Convert fahrenheit to celcius
     * @param  {String} temp The temperature in celcius
     * @return {Number}      The temperature in fahrenheit
     */

    const fToC = temp =>{
        if(settings.convertTemp){
            return (parseFloat(temp) * 9/5) + 32;
        }
        return temp;
    };

    const getIcon = weather => {
        if(!settings.showIcon) return '';
        const html ='<p>' + '<img src="https://www.weatherbit.io/static/img/icons/' + weather.weather.icon + '.png">' + '</p>';
        console.log(html);
        return html;
    };

    /**
     * Get the description for the current weather conditions
     * @param  {Object} weather The weather object
     * @return {String}         A markup string for the weather description
     */

    const getDescription = weather => {
        return settings.description
            .replace('{{temp}}', fToC((sanitizeHTML(weather.temp))))
            .replace('{{conditions}}', sanitizeHTML(weather.weather.description).toLowerCase())
            .replace('{{city}}', sanitizeHTML(weather.city_name))
            .replace('{{state}}', sanitizeHTML(weather.state_code));
    };

    const renderWeather = weather => {
        app.innerHTML =
            getIcon(weather) +
            '<p>' + getDescription(weather) + '</p>';
    };

    const renderNoWeather = () => {
        app.innerHTML = settings.noWeather;
    };

    if(!settings.apiKey){
        console.warn('Please provide an API key.');
    }

    fetch('https://ipapi.co/json').then(response => {
        return response.json();
    }).then(data => {
        console.log('weather fetch')
        return fetch('https://api.weatherbit.io/v2.0/current?key=' + settings.apiKey + '&lat=' + data.latitude + '&lon=' + data.longitude);
    }).then(response => {
        return response.json();
    }).then(data => {
        renderWeather(data.data[0]);
    }).catch(data => {
        renderNoWeather();
    });
};

getTheWeather({
    apiKey: '93ff4999e0dd4e158d6c9a794d80de1f',
    showIcon: true,
    convertTemp: true,
    description: '{{conditions}}, {{temp}} degrees. Ick.'
});










// document.addEventListener("click", event =>{
//     const subzip = event.target.closest('#zip_submit');
//     if(!subzip){
//         return;
//     }else if(parseInt(zip_input.value) < 10000 || parseInt(zip_input.value) > 100000){
//         return;
//     }else{
//         getWeather('#app', parseInt(zip_input.value));
//     }
// }); 


// init('#app', true, 'f');