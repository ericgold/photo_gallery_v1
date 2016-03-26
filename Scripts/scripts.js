/* Create an overlay with image container, caption,
left arrow, and right arrow */

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

// Add left arrow to overlay
// Add image to overlay
$overlay.append($image);
// Add right arrow to overlay
// Add caption to overlay
$overlay.append($caption);
// Add overlay to document
$("body").append($overlay);

// On image link click
$(".thumbnail a").click(function(event){
	// Prevent default click behavior
	event.preventDefault();
	var imageLocation = $(this).attr("href");
	// Update overlay with linked image
	$image.attr("src", imageLocation);
	// Show overlay
	$overlay.show();
	// Get child's alt attribute and set caption
	var captionText = $(this).children("img").attr("alt");
	$caption.text(captionText);
});

// On overlay click
$overlay.click(function(){
	// Hide overlay
	$overlay.hide();
});
// On right arrow click OR right arrow keypress
	// Advance to next photo
// On left arrow click OR left arrow keypress
	// Go back to last photo


/* Enable search, dynamically hiding photos whose
captions do not include the inputted string and 
updating for each character entered */

// When search input is emtpy, show all images
// On character input (keyup)
	// Capture input string
	// Compare input string to captions
	// For each caption
		// if the caption contains string
			// Show corresponding image (animated)
		// if caption does not contain string
			// Hide corresponding image	(animated)

/* Support additional media types 
like YouTube videos */


/*  LIGHTBOX PLUGIN OPTIONS

lightbox.option({
	showImageNumberLabel: false,
	positionFromTop: 200,
	maxWidth: 960,
	maxHeight: 600,
	resizeDuration: 550,
});

*/