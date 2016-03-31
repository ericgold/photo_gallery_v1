/* Create an overlay with image container, caption,
left arrow, and right arrow */

var $overlay = $("<div id='overlay'></div>");
var $image = $("<img>");
var $caption = $("<p id='caption'></p>");
var $leftArrow = $("<button class='arrow'>&#10094</button>");
var $rightArrow = $("<button class='arrow'>&#10095</button>");

// Variables for search 
var $searchField = $("input.search");
var $thumbnails = $(".thumbnail img");
var cache = [];

// Keep track of image index for prev/next navigation
var $index = 0;

// Get list of gallery images and track length of list
var $galleryLength = $thumbnails.length;


// Add left arrow to overlay
$overlay.append($leftArrow);
// Add image to overlay
$overlay.append($image);
// Add right arrow to overlay
$overlay.append($rightArrow);
// Add caption to overlay
$overlay.append($caption);
// Add overlay to document
$("body").append($overlay);

/* Update image function 
(use for initial overlay and overlay navigation)*/

var updateImage = function(imageLocation, imageCaption) {
	$image.attr("src", imageLocation);
	$caption.text(imageCaption);
}


// On image link click
$(".thumbnail a").click(function(event){
	// Prevent default click behavior
	event.preventDefault();
	// Set imageLocation as clicked image's href
	var imageLocation = $(this).attr("href");
	// Get child's alt attribute and set caption
	var imageCaption = $(this).children("img").attr("alt");
	// Update index to current selected image
	$index = $(this).parent().index();
	// call updateImage function
	updateImage(imageLocation, imageCaption);
	// Show overlay
	$overlay.slideDown(imageLocation);
});

// Overlay nav button function
var prevNext = function(prev) {
	//when prev is false, increase index
	//when prev is true, decrease index
	if (!prev) {
		$index++;
	} else {
		$index--;
	}

	// enables overlay navigation wraparound
	if ($index < 0) {
		$index = $galleryLength-1;
	} else if ($index > $galleryLength-1) {
		$index = 0;
	}

	//Get element by index and get its link
	var newImgSelected = $(".thumbnail").get($index).getElementsByTagName("a");

	//Get link info
	var imageLocation = $(newImgSelected).attr("href");
	var imageCaption = $(newImgSelected).children("img").attr("alt");

	//Update overlay
	updateImage(imageLocation, imageCaption);
}

//Cycles through images in overlay on arrow clicks
$leftArrow.click(function(event){
	prevNext(true);
});

$rightArrow.click(function(event){
	prevNext();
});

//Cycles through images in overlay on keyboard arrow press
$(document).bind('keydown', function(event) {
	if(event.keyCode == 37) {
		prevNext(true);
	} else if(event.keyCode == 39) {
		prevNext();
	}
});

// On overlay click
$overlay.click(function(event){
	// Hide overlay
	if(event.target.id == "overlay")
	$(this).slideUp("fast");
});


/* Enable search, dynamically hiding photos whose
captions do not include the inputted string and 
updating for each character entered */

// Add alt text of each gallery image to cache array
$thumbnails.each(function() {
	cache.push({
		element: this,
		text: this.alt.trim().toLowerCase()
	});
});

// Compare input string to captions
// For each caption
		// if the caption contains string
			// Show corresponding image (to be animated)
		// if caption does not contain string
			// Hide corresponding image	(to beanimated)

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
			var $thumbnailDiv = $('img.element.parentNode.parentNode');
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

// Triggers filter function on keyup in search field
$searchField.keyup(filter);

/* Support additional media types 
like YouTube videos */

