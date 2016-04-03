/* Create an overlay with image container, caption,
left arrow, and right arrow */

var $overlay = $("<div id='overlay'></div>");
var $innerOverlay = $("<div id='inner-overlay'></div>")
var $image = $("<img>");
var $caption = $("<p id='caption'></p>");
var $leftArrow = $("<button class='arrow'>&#10094</button>");
var $rightArrow = $("<button class='arrow'>&#10095</button>");

//variables for 
var $overlay2 = $("<div id='overlayTwo'></div>");
var $youtubeOverlay = $('<iframe id="youtube-canvas" width="560" height="315" src="https://www.youtube.com/embed/8rFG-Uk4hZs" frameborder="0" allowfullscreen></iframe>');

// Variables for search 
var $searchField = $("input.search");
var $thumbnails = $(".thumbnail img");
var cache = [];

// Keep track of image index for prev/next navigation
var $index = 0;

// Get list of gallery images and track length of list
var $galleryLength = $thumbnails.length;


// Add left arrow to inner overlay div
$innerOverlay.append($leftArrow);
// Add image to inner overlay div
$innerOverlay.append($image);
// Add right arrow to overlay
$innerOverlay.append($rightArrow);
// Add a div inside the overlay for flex positioning the img and arrow buttons
$overlay.append($innerOverlay);
// Add caption to overlay
$overlay.append($caption);

$overlay2.append($youtubeOverlay);
// Add overlay to document
$("body").append($overlay);
//Add overlay2 to document
$("body").append($overlay2);

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

// filter function for search field
var filter = function() {
	//sets searchText as whatever is entered in search field
	var query = $searchField.val();
	//for each thumbnail div
	$(".thumbnail").each(function(){
		//sets altText as the alt attribute 
		//of the img child of the anchor child of the thumbnail div
		var altText = $(this).children().children("img").attr("alt");
		//if the search term is 'not not present' in the alt text
		if (altText.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
			//show the thumbnail (including its child a and a's child img)
			$(this).fadeIn();
		//if the search term is 'not present' in the alt text
		} else {
			//hide the thumbnail and its contents
			$(this).fadeOut("fast");
		};
	});
}

// Triggers filter function on keyup in search field
$searchField.keyup(filter);

/* Support additional media types 
like YouTube videos */

$(".video-thumbnail a").click(function(event){
	event.preventDefault();
	$overlay2.slideDown();
});

$overlay2.click(function() {
	$overlay2.slideUp();
});
