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
       			 		console.log(spaceships[i]);
       			 	}
        		 });

}// getSpaceShipList Ends
getSpaceShipList();
// Display results from
}); //Document Ready Ends
