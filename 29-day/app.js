const nodeData = Array.prototype.slice.call(document.querySelectorAll(('h2')));
const contentList = document.querySelector('#table-of-contents');

const data = nodeData.map((section, index) =>{
    if(section.id.length < 1){
        section.id = section.textContent.split(' ').join('-');
        return{
            id: section.id,
            name: section.textContent
        }
    }else{
        return{
            id: section.id,
            name: section.textContent
            };
    }
    
    });
console.log(data);

contentList.innerHTML = "<ul>" +
    data.map((sect, index) =>{
        return '<input class="content-links f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black"" type="button" onclick="location.href=`#' + sect.id + '`;" value="' + sect.name + '"/>'
    }).join('') + "</ul>"