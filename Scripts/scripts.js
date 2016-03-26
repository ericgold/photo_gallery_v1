/* Create an overlay with image container, caption,
left arrow, and right arrow */

// Add image to overlay
// Add caption to overlay

// On image link click
	// Prevent default click behavior
	// Show overlay
	// Get child's alt attribute and set caption
// On overlay click
	// Hide overlay
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