   const init = ()=>{
        const nodeData = Array.prototype.slice.call(document.querySelectorAll(('h2')));
        const contentList = document.querySelector('#table-of-contents');

        contentList.innerHTML = "<ul>" +
            nodeData.map((section, index) =>{
                //  WALTER'S ORIGINAL SOLUTION
                // if(section.id.length < 1){
                //     section.id = section.textContent.replace(/[^a-z0-9]+/gi, '-');
                //     return{
                //         id: section.id,
                //         name: section.textContent
                //     }
                // }else{
                //     return{
                //         id: section.id,
                //         name: section.textContent
                //         };
                // }
                
                if(section.id.length < 1){
                    section.id = section.textContent.replace(/[^a-z0-9]+/gi, '-');
                }
                console.log(section.textContent);
                return '<input class="content-links f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black"" type="button" onclick="location.href=`#' 
                    + section.id + '`;" value="' + section.textContent + '"/>'
            }).join('') + "</ul>";
    };
        // WALTER'S ORIGINAL SOLUTION
        // contentList.innerHTML = "<ul>" +
        //     data.map((sect, index) =>{
        //         return '<input class="content-links f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black"" type="button" onclick="location.href=`#' + sect.id + '`;" value="' + sect.name + '"/>'
        //     }).join('') + "</ul>";
//    };
init();