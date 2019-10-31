import {key} from './config.js'

        const app = document.getElementById('app');
        const nytkey = key();
        
        const getStories = ()=>{
            fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + nytkey)
            .then(response =>{
                if(response.ok){
                    return response.json();
                }else{
                    return Promise.reject.response;
                }                  
            }).then(data => {
                app.innerHTML = "<ul>" + data.results.map(d=>{
                    // if(d.multimedia[2].url !=undefined){
                    //     const pic ="<img src" + d.multimedia[2].url + "alt=" + d.multimedia[2].url + ">";
                    // }
                    const link = "<a href='" + d.url+ "'>" + d.title + "</a>"
                    if(d.multimedia.length > 1){
                        const pic = d.multimedia[1].url;
                        return(
                            "<li><img src='" + pic + "' >" + link
                        );
                    }
                    return(
                        "<li>" + link + "</li>"
                        );
                    }).join('')
                    + "</ul>";
            }).catch(err => {
                console.log("Error logged: ", err);
            });
        }

        getStories();
	