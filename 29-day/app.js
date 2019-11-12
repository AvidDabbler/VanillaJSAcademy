const nodeData = Array.prototype.slice.call(document.querySelectorAll(('h2')));
const contentList = document.querySelector('#table-of-contents');

const data = nodeData.map((section, index) =>{
    return{
        id: section.id,
        name: section.textContent
        };
    });


contentList.innerHTML = "<ul>" +
    data.map((sect, index) =>{
        return '<input class="content-links f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black"" type="button" onclick="location.href=`#' + sect.id + '`;" value="' + sect.name + '"/>'
    }).join('') + "</ul>"