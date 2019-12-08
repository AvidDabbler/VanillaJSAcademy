/*
    todo: Get an array of items from the DOM.
    todo: Get the first and last matching items from the DOM.
    todo: Add and remove a class to all matching elements.
*/


const $ = (function(){
    const copy = arr => arr.slice();

    var Constructor = function(selector){
        this.elems = document.querySelectorAll(selector);
    };

    Constructor.prototype.items = function() {
        return Array.prototype.slice.call(this.elems);
    };

    Constructor.prototype.first = function(){
        return this.elems[0];
    };

    Constructor.prototype.last =  function(){
        return this.elems[this.elems.length-1];
    };

    Constructor.prototype.addClass =  function (className){
        this.items().forEach(function (elems) {
                elems.classList.add(className);
            });
        return this;
    };

    Constructor.prototype.removeClass = function (className) {
        this.items().forEach(function (elem) {
            elem.classList.remove(className);
        });
        return this;
    };
    return Constructor;
})();

const buttons = new $('button');
const list = new $('ul');

console.log(list.last());
console.log(buttons.first());

buttons.addClass('btn-purple').removeClass('btn-blue');

