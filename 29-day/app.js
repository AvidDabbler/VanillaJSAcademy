const nodeData = Array.prototype.slice.call(document.querySelectorAll(('h2')));
const contentList = document.querySelector('#table-of-contents');

const data = nodeData.map((section, index) =>{
    return{
        id: section.id,
        name: section.textContent
        }
    });

console.log(data);

contentList.innerHTML = "<ul>" +
    data.map((sect, index) =>{
        return '<li><button><a href="#' + sect.id + '">' + sect.name + '</a></li>'
    }).join('') + "</ul>"