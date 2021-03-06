import {key} from './config.js'


// SECTION VARIABLES
const home = document.getElementById('home');
const tech = document.getElementById('tech');
const world = document.getElementById('world');
const politics = document.getElementById('politics');


// SANITIZE API'S DATA FUNCTION
var sanitizeHTML = function (str) {
    var temp = document.createElement('div')
    temp.textContent = str
    return temp.innerHTML
  }
  

// PULL IN NYT KEY
const nytkey = key();


// RENDER FUNCTION NYT ARITCLE
const render=(articles, section)=>{
    section[1].innerHTML = "<h1>" + section[2] + "</h1>" + articles.map(d=>{
        const link = "<a href='" + sanitizeHTML(d.url)+ "'><h2>" + sanitizeHTML( d.title) + "</h2></a>";
        if(d.multimedia.length > 1){
            const pic = sanitizeHTML(d.multimedia[2].url);
            return(
                "<div class='container' id='" + sanitizeHTML(d.url) + "'><div class='about'><div class='pic'><img src='" 
                + pic +
                "' ></div><div class='headline'>" + link + "<h3>" 
                +  sanitizeHTML(d.byline) + "</h3><p>" + sanitizeHTML(d.abstract) + "</p></div></div></div>"
            );
        }
        return(
            "<div class='container' id='" +  sanitizeHTML(d.url) + "'><h2>"
            + link + "</h2><h3>" +  sanitizeHTML(d.byline) + "</h3><p>" +  sanitizeHTML(d.abstract) + "</p></div></div>"

            );
        }).join('');
}


// BUILT LIST FOR NYT SECTIONS
const list = [['home', home, "Top News"],['technology', tech, "Technology News"],['world', world, "World News"],['politics', politics, "Political News"]];
    


// PULL API DATA AND RUN RENDER FUNCTION FOR EACH SECTION
list.forEach(s=>{
    fetch('https://api.nytimes.com/svc/topstories/v2/' + s[0] + '.json?api-key=' + nytkey)
        .then(response =>{
            if(response.ok){
                return response.json();
            }else{
                return Promise.reject(response);
            }                  
        }).then(data => {
            render(data.results, s);
        }).catch(err => {
            console.log("Error logged: ", err);
        });
});




// TOGGLE SECTIONS BASED ON SECTION BUTTONS
const sectDisp = (tab)=>{
    home.style.display='none';
    tech.style.display='none';
    world.style.display='none';
    politics.style.display='none';

    tab.style.display = 'block';
}



// CLICK EVENTS FOR SECTIONS
homeBtn.addEventListener('click', event => sectDisp(home), false)
techBtn.addEventListener('click', event => sectDisp(tech), false)
worldBtn.addEventListener('click', event => sectDisp(world), false)
politicsBtn.addEventListener('click', event => sectDisp(politics), false)



// INITIALIZE PAGE WITH HOME SECTION ARTICLES
sectDisp(home);