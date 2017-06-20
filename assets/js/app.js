// ================================================================================================== //
// GLOBAL VARIABLES
// ================================================================================================== //
var spaceships = [];

$(document).ready(function(){
// Get data from JSON

var getSpaceShipList = function(){
		var apiUrl = "http://demo7475333.mockable.io/spaceships";
		$.ajax({ url: apiUrl, method: 'GET'}).done(function(response) {
       			 	var imgNum;
       			 	spaceships = response.products;       			 	
       			 	console.log(spaceships);
       			 	// add icon and png image urls to result items
       			 	for (var i = 0; i < spaceships.length; i++) {
       			 		imgNum = i+1;
       			 		var imgIconSrc = "assets/img/icons/" + imgNum +".ico";
       			 		var imgSrc = "assets/img/icons_lg/" + imgNum +".png";       			 		
       			 		spaceships[i].imgIconSrc = imgIconSrc;
       			 		spaceships[i].imgSrc = imgSrc;
       			 		spaceships[i].id = imgNum;
       			 		// console.log(spaceships[i]);
       			 	}
       			 	displayResultsGrid();
        		 });

}// getSpaceShipList Ends
getSpaceShipList();
// Display results 
var displayResultsGrid = function(){
	console.log(spaceships);

	for (var i = 0; i < spaceships.length; i++) {		
	// Container div
	var containerDiv = $("<div class='col-md-4 col-sm-6 img-portfolio'>");
	// Grid Image Icon
	var imgTag = $("<img class='img-responsive img-hover img-center'>");
	imgTag.attr("src", spaceships[i].imgIconSrc);	
	// Append Img to container div
	containerDiv.append(imgTag);
	// Ship Name
	containerDiv.append("<p class='text-center'><a href='#'><strong>" + spaceships[i].name + "</strong></a></p>");
	// Ship Class 
	containerDiv.append("<h4>" + spaceships[i].class + "</h4>");
	
	$("#spaceshipsDisplayGrid").append(containerDiv);
}
	
}
}); //Document Ready Ends
