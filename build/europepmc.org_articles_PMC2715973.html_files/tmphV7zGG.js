/*
	RELATED ARTICLES EXPANSION AND CONTRACTION

	showHideRelatedClick is called when a "Show all items" link is clicked
	on Citations, BioEntities or Related Articles tabs. Or any tab that has
	links wrapped in a .showHideRelated holder. It is not nearly as well 
	documented as the checkHeights function below, but it's pretty basic.	
	So use your noggin, buddy.

	Actually I take it back. I just went through and documented it. I'm your
	coding pal from the past, looking out for you! Pay it forward. ;)

	Change the variable "debugging" to true in order to enable
	debug logging. console.log throws errors in older versions of 
	Internet Explorer and is not recommended for live builds,
	so debugging should be set to false in that scenario.

*/

// When a "Show all items" link is clicked...
$(".showHideRelated a").live('click', function() { // We use .live('click') because jQuery cannot use .click on content loaded via ajax

	// IE7 cannot pull scrollHeight reliably and generally sucks and has a low market share 
	// (~1% as of Sept. 2012). Thus we don't do anything if the user is on IE7. 
	// ie7 variable is set in the HTML head in a if IE 7 statement.
	if (!ie7) {
		// Call the showHideRelatedClick function, pass the parent's ID and class,
		// and the grandparent's ID (for determining what section we're in).
		// AND the great-grandparent's ID (for the related articles tab, which requires
		// this b/c that's the only way we can differentiate between the two different
		// content containers).
		showHideRelatedClick($(this).parent().parent().attr('id'),$(this).parent().parent().attr('class'),$(this).parent().parent().parent().attr('id'),$(this).parent().parent().parent().parent().attr('id'));
	}
});

function showHideRelatedClick(clickedItemParent,collapsedStatus,clickedItemGrandParent,clickedItemGreatGrandParent) {

	// To display debug messages, set this variable to true.
	var debugging = false;

	if (debugging) {
		console.log('clickedItemParent = ' + clickedItemParent);
		console.log('clickedItemGrandParent = ' + clickedItemGrandParent);
		console.log('clickedItemGreatGrandParent = ' + clickedItemGreatGrandParent);
		console.log('collapsedStatus = ' + collapsedStatus);
	}

	// If the clickedItemGrandParent is 'citations' then we're in either the
	// Citations or Related Articles tabs. In that case, grab the scrollheight of the
	// #citations_listing div.
	if (clickedItemGrandParent == 'citations') {

		// Check if we're on the Related Articles tab. If so, the only way we can 
		// differentiate between the two content containers is by looking at their
		// great grandparent's ID.
		if (clickedItemGreatGrandParent == 'related_reviews_id' || clickedItemGreatGrandParent == 'other_related_articles_id') {
			// If we are, grab the scrollHeight of the #citations_listing element which is
			// the ancestor of the clickedItemGreatGrandParent.
			// The [0] is in there because to use scrollHeight we need to grab the DOM element,
			// not the jQuery object.
			var fullHeight = $('#' + clickedItemGreatGrandParent + ' #citations_listing')[0].scrollHeight;
		}
		// If we're not on the Related Articles tab, we're on the Citations tab,
		// in which case we don't need to use the great grandparent.
		else {
			// Grab the #citations_listing's scrollHeight so we know how tall it needs to be.
			// The [0] is in there because to use scrollHeight we need to grab the DOM element,
			// not the jQuery object.
			var fullHeight = $('#' + clickedItemParent + ' #citations_listing')[0].scrollHeight;
			if (debugging) { 
				console.log(clickedItemParent + 's #citations_listing div has a scrollHeight of ' + fullHeight);
			}
		}
	}
	// If clickedItemGrandParent is not 'citations', we're in the BioEntities tab, 
	// so grab the scrollHeight of #relartsdiv
	else {
		// Grab the #relartsdiv's scrollHeight so we know how tall it needs to be.
		// The [0] is in there because to use scrollHeight we need to grab the DOM element,
		// not the jQuery object.
		var fullHeight = $('#' + clickedItemParent + ' #relartsdiv')[0].scrollHeight;
	}
	

	// If the holder has the "collapsed" class (which it does by default, 
	// and when it has previously been collapsed), run the expansion functions.
	if (collapsedStatus == 'collapsed') {

		// If the clickedItemGrandParent is 'citations' then we're in either
		// the Citations or Related Articles tab. In that case, we need to
		// animate #citations_listing
		if (clickedItemGrandParent == 'citations') {
			
			// For the Related Articles tab, we can only differentiate between the two
			// content containers by looking at their great grandparent's ID. Thus,
			// we perform a check to see if we're on that tab.
			if (clickedItemGreatGrandParent == 'related_reviews_id' || clickedItemGreatGrandParent == 'other_related_articles_id') {
				// Animate the holder open, by setting its max-height CSS value
				// to the height of its content.
				$('#' + clickedItemGreatGrandParent + ' #citations_listing').animate({
					maxHeight: fullHeight
				}, 500, function() {
					// And change its link's text so that when the user sees it
					// again, it's telling them to collapse instead of expand
					$('#' + clickedItemGreatGrandParent + ' .showHideRelated a').html('Show fewer items');
				});		

				// Swap classes so on the next click it collapses instead of expanding
				$('#' + clickedItemGreatGrandParent + ' #citationsHolder').removeClass('collapsed');
				$('#' + clickedItemGreatGrandParent + ' #citationsHolder').addClass('expanded');		
			}

			// Otherwise, if the great grandparent isn't one of those two items,
			// we're on the Citations tab, and we don't need to worry about the 
			// great grandparent. We can just animate normally.
			else {
				// Animate the holder open, by setting its max-height CSS value
				// to the height of its content.
				$('#' + clickedItemParent + ' #citations_listing').animate({
					maxHeight: fullHeight
				}, 500, function() {
					// And change its link's text so that when the user sees it
					// again, it's telling them to collapse instead of expand
					$('#' + clickedItemParent + ' .showHideRelated a').html('Show fewer items');
				});

				// Swap classes so on the next click it collapses instead of expanding
				$('#' + clickedItemParent).removeClass('collapsed');
				$('#' + clickedItemParent).addClass('expanded');
			}
		}
		
		// If clickedItemGrandParent is not 'citations', we're in the BioEntities tab, 
		// so we need to animate #relartsdiv
		else {
			// Animate the holder open, by setting its max-height CSS value
			// to the height of its content.
			$('#' + clickedItemParent + ' #relartsdiv').animate({
				maxHeight: fullHeight
			}, 500, function() {
				// And change its link's text so that when the user sees it
				// again, it's telling them to collapse instead of expand
				$('#' + clickedItemParent + ' .showHideRelated a').html('Show fewer items');
			});

			// Swap classes so on the next click it collapses instead of expanding
			$('#' + clickedItemParent).removeClass('collapsed');
			$('#' + clickedItemParent).addClass('expanded');
		}
	}
	
	// If the holder does not have the "collapsed" class (which it only looses when
	// it has been expanded previously), run the contraction functions.
	else {

		// If the clickedItemGrandParent is 'citations' then we're in either
		// the Citations or Related Articles tab. In that case, we need to
		// animate #citations_listing
		if (clickedItemGrandParent == 'citations') {

			// For the Related Articles tab, we can only differentiate between the two
			// content containers by looking at their great grandparent's ID. Thus,
			// we perform a check to see if we're on that tab.
			if (clickedItemGreatGrandParent == 'related_reviews_id' || clickedItemGreatGrandParent == 'other_related_articles_id') {
				// Animate the holder closed by setting its max-height CSS value
				// to the standard height of 220.
				$('#' + clickedItemGreatGrandParent + ' #citations_listing').animate({
					maxHeight: 220
				}, 500, function() {
					// And change its link's text so that when the user sees
					// it again, it's telling them to expand instead of contract
					$('#' + clickedItemGreatGrandParent + ' .showHideRelated a').html('Show all items');
				});	

				// Swap classes so on the next click it expands instead of contracting
				$('#' + clickedItemGreatGrandParent + ' #citationsHolder').removeClass('expanded');
				$('#' + clickedItemGreatGrandParent + ' #citationsHolder').addClass('collapsed');
			}

			// If clickedItemGrandParent is not 'citations', we're in the BioEntities tab, 
			// so we need to animate #relartsdiv
			else {
				// Animate the holder closed by setting its max-height CSS value
				// to the standard height of 220.
				$('#' + clickedItemParent + ' #citations_listing').animate({
					maxHeight: 220
				}, 500, function() {
					// And change its link's text so that when the user sees
					// it again, it's telling them to expand instead of contract
					$('#' + clickedItemParent + ' .showHideRelated a').html('Show all items');
				});	
				
				// Swap classes so on the next click it expands instead of contracting
				$('#' + clickedItemParent).removeClass('expanded');
				$('#' + clickedItemParent).addClass('collapsed');
			}
		}
		
		// If clickedItemGrandParent is not 'citations', we're in the BioEntities tab, 
		// so we need to animate #relartsdiv
		else {
			// Animate the holder closed by setting its max-height CSS value
			// to the standard height of 220.
			$('#' + clickedItemParent + ' #relartsdiv').animate({
				maxHeight: 220
			}, 500, function() {
				// And change its link's text so that when the user sees
				// it again, it's telling them to expand instead of contract
				$('#' + clickedItemParent + ' .showHideRelated a').html('Show all items');
			});	

			// Swap classes so on the next click it expands instead of contracting
			$('#' + clickedItemParent).removeClass('expanded');
			$('#' + clickedItemParent).addClass('collapsed');
		}
	}
}




/* 
	LINK HIDER

	checkHeights is a looping function which is called the first 
	time on load. It checks for .showHideRelated a's, and when it
	finds them, it does various checks on their parent's content
	container's heights. If the container's height is less
	than the value set in epmc.css (220px), the link is hidden.

	This function loops because it can only run when the user actually
	clicks on a tab. Before that, the content has been loaded through
	ajax and while it's in the DOM, it hasn't been rendered, and thus
	it does not have a height. A nice next step would be to code a 
	cleanup function so that when the user has clicked every possible
	tab, it stops running. However pretty lightweight so it should not
	bog things down too much.

	Change the variable "debugging" to true in order to enable
	debug logging. console.log throws errors in older versions of 
	Internet Explorer and is not recommended for live builds,
	so debugging should be set to false in that scenario.
*/

function checkHeights() {

	// To display debug messages, set this variable to true.
	var debugging = false;

	if (debugging) {
		console.log('== checkHeights() CALLED ==');
	}

	// BUG FIXING:
	// Call bioEntitiesFixer() to see if there are any double content box instances
	// that'll need to have their buttons swapped out.
	bioEntitiesFixer();

	$('.showHideRelated a').each(function() {
		if (debugging) {
			console.log('== FOR EACH ==');
		}
		

		// Find the holder element's ID
		var parentID = $(this).parent().parent().attr('id');
		if (debugging) {
			console.log("parentID = " + parentID);
		}

		// Then grab the parent's conent container's height and scrollHeight
		var containerHeight = $('#' + parentID + ' #relartsdiv').height();
		
		// If the containerHeight is null or 0, it means the user hasn't clicked into
		// a tab yet. If they haven't done so, checking the scrollHeight in IE
		// throws an error and stops the function from running. So we wrap the
		// scrollHeight in an if statement to avoid that.
		if (containerHeight > 0) {
			if (debugging) {
				console.log(parentID + 's content containers height is > 0. Grab scrollHeight.');
			}
			var containerScrollHeight = $('#' + parentID + ' #relartsdiv')[0].scrollHeight;
			if (debugging) {
				console.log(parentID + 's content container is ' + containerHeight + 'px tall.');
				console.log(parentID + 's content containers scrollHeight is ' + containerScrollHeight + 'px.');
			}
		}
		else {
			if (debugging) {
				console.log(parentID + 's content containers height is 0. Do not grab srollHeight.');
			}
		}
		
		// Now check if the link is hidden or not. If it hasn't been hidden yet...
		if ($('#' + parentID + ' .showHideRelated a').is(":visible")) {
			if (debugging) {
				console.log('Found a visible link.');
				console.log(containerScrollHeight + ' ?? 220');
			}
			
			// ... if the content contanier's height is shorter than 
			// the set height (set in CSS)
			if (containerScrollHeight <= 220) {
				if (debugging) {
					console.log('Visible links content is shorter than 220px. Hiding link.');
				}
				
				// Hide the link.
				$('#' + parentID + ' .showHideRelated a').hide();
				
				if (debugging) {
					console.log(parentID + 's link has been hidden.');
				}
			}
			else {
				if (debugging) {
					console.log('Container is taller than 220px. Link should not be hidden.');
				}
			}
		}
		if (debugging) {
			console.log('== END EACH ==');
		}
	});

	// Set the timeout to run checkHeights again, 
	// as this has to run the first time a user clicks into
	// a new tab.
	setTimeout('checkHeights()', 1000);
}


/* 
	MULTIPLE CONTENT BOX BUG FIX

	Certain elements within the bioentities tab (eg. Genes & Proteins) can potentially
	generate TWO content boxes instead of one. However these boxes are generated
	at a deeper code level than where the expand/collapse button is generated, so
	the end result is two expandable boxes with only one button. Obviously this won't work.

	In order to fix this bug we could move the buttons deeper into the code, though that would
	require rewriting pretty much all of the existing code above. So instead we apply a bug fix.
	
	bioEntitiesFixer() is called by checkHeights(). It looks to see if an element exists on the
	page with the id "bxref1" (containing element which is only generated if there are two 
	content boxes, otherwise it gets the id "btmsmr"). If it finds one, it removes the default
	button and inserts two new ones.

	Change the variable "debugging" to true in order to enable
	debug logging. console.log throws errors in older versions of 
	Internet Explorer and is not recommended for live builds,
	so debugging should be set to false in that scenario.

*/

/* 
	Variable declaration
*/

// Define an array to hold the names of items we've already applied the fix to.
// Allows us to ensure that we don't apply the fix multiple times to a single item.
var fixedArray = new Array();

function bioEntitiesFixer() {

	var debugging = false;

	// Look for divs with the id bxref1 within the #fragment-related-bioentities holder.
	// If we find any, perform some functions.
	if ($("#fragment-related-bioentities").find("#bxref1")) {

		if (debugging) {
			console.log("== begin bioEntitiesFixer() ==");
		}

		// We found at least one instance of #bxref1. Perform functions on each instance of
		// it AND #bxref2.
		$("#bxref1").each(function() {
				if (debugging) {
					console.log("Found an instance of #bxref1.");
				}

				// Grab the 5th ancestor so we know which specific section this #bxref1 is in.
				var fifthAncestor = $(this).parent().parent().parent().parent().parent().attr('id')

				if (debugging) {
					console.log("Fifth ancestor (holder) for #bxref1 = " + fifthAncestor);
				}

				// Check if we've already performed the function on this container.
				// If we haven't, fifthAncestor will NOT be in the array, and 
				// inArray() will return -1, which tells us we need to apply the fix.
				if ($.inArray(fifthAncestor, fixedArray) == -1) {

					if (debugging) {
						console.log("Applying fix to containers within " + fifthAncestor + ", adding to fixedArray.");
					}

					// First, add the fifthAncestor the array so we don't run functions on
					// this same item again.
					fixedArray.push(fifthAncestor);
					
					// Now remove the single button.
					$("#" + fifthAncestor + " .showHideRelated").remove();
					
					if (debugging) {
						console.log("Removed bugged button for " + fifthAncestor + ".");
					}

					// Now that it's removed, ADD IN two new buttons.
					// Append them to the tail end both bxref1 and 2.
					$("#" + fifthAncestor + " #bxref1, #" + fifthAncestor + " #bxref2").append('<div class="showHideRelated"><a>Show all items</a></div>');
					if (debugging) {
						console.log("Appended a new button to #bxref1 and #bxref2.");
					}

					// We also need to give #bxref1 and 2 the class "collapsed"
					// or else the user will have to click on the expand / collapse button
					// twice before it works.
					$("#bxref1, #bxref2").addClass("collapsed");
				}
				else {
					
					// Otherwise we have already performed the function, so log it 
					// and do nothing else.
					if (debugging) {
						console.log("Fix already applied to containers within " + fifthAncestor + ". Skipping.");
					}
				}
		});
	}
}



/* 
	INIT

	Call checkHeights for the first time to set off the whole shebang.

*/
$(document).ready(function(){

	// IE7 cannot pull scrollHeight reliably and generally sucks and has a low market share 
	// (~1% as of Sept. 2012). Thus we don't do anything if the user is on IE7. 
	// ie7 variable is set in the HTML head in a if IE 7 statement.
	if (!ie7) {
		checkHeights();
	}
});