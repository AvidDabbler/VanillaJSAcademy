
        //todo: get data to check for key
        //todo: add key to data with new data
        //todo: overwrite data that already exists


		let nodelist = Array.prototype.slice.call(document.querySelectorAll('.save'));
		const getId = (field) => {
			if(field.id.length > 0){
				return field.id;
			}else if(field.name.length > 0){
				return field.name;
			}
			return null;
        };
        

        var addToLocalStorageObject = function (name, key, value) {

            // Get the existing data
            var existing = localStorage.getItem(name);
        
            // If no existing data, create an array
            // Otherwise, convert the localStorage string to an array
            existing = existing ? JSON.parse(existing) : {};
        
            // Add new data to localStorage Array
            existing[key] = value;
        
            // Save back to localStorage
            localStorage.setItem(name, JSON.stringify(existing));
        
        };


		const saveData = () =>{
            let id = getId(event.target);
            if(!event.target.closest('#save-me')) return;
			if(!id) return;
            
            // nodelist.map(item => {
			// 	localStorage.setItem("localstorage_item_" + item.id, item.value);
			// 	console.log('localStorage map');
            // })
            nodelist.map(item => {
                addToLocalStorageObject('data', item.id, item.value);
            });                
		};

		const clearData = (event) =>{
			if(!event.target.closest('#clear')){
				console.log('not clear');
				return;
			};
			nodelist.forEach(el => {
				localStorage.removeItem(el.id);
				el.value = '';
			});
		}
		document.addEventListener('input', saveData, false);
		document.addEventListener('click', clearData, false);
		const init = () =>{
			nodelist.forEach(el => {
				el.value = localStorage.getItem(el.id)
			});
		};
		init();