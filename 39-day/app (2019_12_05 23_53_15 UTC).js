var walter = (function () {
    /*
        //todo: convert a nodelist to an array
        //todo: get the first matching element in the dom
        //todo: add a class to all elements in an array
        //todo: remove a class from all elements in an array
    */
    var methods = {};

    // * Item #1: Convert a nodelist to an array
    methods.nodeArr = (selector) => {
        if(!selector){
            console.warn(selector + ' does not exist with in the page');
            return;
        }
        const arr = Array.prototype.slice.call(document.querySelectorAll(selector));
        return arr;
    };

    methods.getFirst = (selector) => {
        const list = methods.nodeArr(selector);
        return list[0];
    };

    methods.addClass = (selector, addedClass) => {
        const arr = methods.nodeArr(selector);
        arr.map(a => {
            if(a.classList.contains(addedClass)){
                console.warn(addedClass + ' already exists in one or more of these elements');
                console.warn(a);
                return;
            }
                return a.classList.add(addedClass);
            });
        return arr;
    };

    methods.removeClass = (selector, removClass) => {
        const arr = methods.nodeArr(selector);
        arr.map(a => {
            if(!a.classList.contains(removClass)){
                console.warn(removClass + ' does not exist in one or more of these elements');
                console.warn(a);
                return;
            }
                return a.classList.remove(removClass);
            });
        return arr;
    };

    return methods;

})();

const hello = 'hello'

