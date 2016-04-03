//Add alt text of each gallery image to cache array
$thumbnails.each(function() {
	cache.push({
		element: this,
		text: this.alt.trim().toLowerCase()
	});
});


var filter = function() {
	//trims and lower-cases search query
	var query = this.value.trim().toLowerCase();

	//for each img element in the cache array
	cache.forEach(function(img) {
		//sets counter to number images in gallery
		var index = 0;
		
		//if there is a search query entered
		if (query) {
			//sets index to be the index of the img whose alt contains the query
			index = img.text.indexOf(query);
			
			//if there is no match
			if (index === -1) {
				//sets display for that img's 
				//thumbnail container div (parent's parent) to none
				img.element.parentNode.parentNode.style.display = 'none';
				
				//else sets display for that img's 
				//thumbnail container div (parent's parent) to default
			} else {
				img.element.parentNode.parentNode.style.display = '';
				
			} 
		
		}
	});
}
