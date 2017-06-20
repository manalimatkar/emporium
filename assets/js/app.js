// ================================================================================================== //
// GLOBAL VARIABLES
// ================================================================================================== //
var spaceships = [];

$(document).ready(function() {
    // Get data from JSON

    var getSpaceShipList = function() {
            var apiUrl = "https://demo7475333.mockable.io/spaceships";
            $.ajax({ url: apiUrl, method: 'GET' }).done(function(response) {
                var imgNum;
                spaceships = response.products;
                console.log(spaceships);
                // add icon and png image urls to result items
                for (var i = 0; i < spaceships.length; i++) {
                    imgNum = i + 1;
                    var imgIconSrc = "assets/img/icons/" + imgNum + ".ico";
                    var imgSrc = "assets/img/icons_lg/" + imgNum + ".png";
                    var profileImg = "assets/img/profile_img/" + imgNum + ".gif";
                    spaceships[i].imgIconSrc = imgIconSrc;
                    spaceships[i].imgSrc = imgSrc;
                    spaceships[i].imgProfile = profileImg;
                    spaceships[i].id = imgNum;
                    // console.log(spaceships[i]);
                }
                displayResultsGrid();
            });

        } // getSpaceShipList Ends
    getSpaceShipList();
    // Display results 
    var displayResultsGrid = function() {
            console.log(spaceships);

            for (var i = 0; i < spaceships.length; i++) {
                // Container div
                var containerDiv = $("<div class='col-md-3 col-sm-6 img-portfolio' data-toggle='modal' data-target='#detailView'>");
                containerDiv.attr('data-index', i)
                    // Grid Image Icon
                var imgTag = $("<img class='img-responsive img-hover img-center'>");
                imgTag.attr("src", spaceships[i].imgIconSrc);
                // Append Img to container div
                containerDiv.append(imgTag);
                // Ship Name
                containerDiv.append("<p class='text-center'><strong>" + spaceships[i].name + "</strong></p>");
                // Ship Class 
                containerDiv.append("<h4>" + spaceships[i].class + "</h4>");

                $("#spaceshipsDisplayGrid").append(containerDiv);
            }

        } //Display Result Ends

    // Handle click on the name link tile
    $(document).on('click', '.img-portfolio', function() {
        // Get user id from userid data attr
        var selectedShip = $(this).attr('data-index');
        console.log(selectedShip);
        // Get current user data and populate modal 
        populateModal(selectedShip);
    });

    // Bind clicked selectedShip data to modal
    var populateModal = function(selectedShip) {

        // Name
        var shipClass = spaceships[selectedShip].class;
        var shipImgSrc = spaceships[selectedShip].imgProfile;
        var techData = spaceships[selectedShip].techspecs;
        // Set Modal Title to uppercase full name
        // $("#modalTitle").text(shipClass);
        $("#modalTitle").html("<h3>" + spaceships[selectedShip].name + "</h3><h4>Manufacturer: " + spaceships[selectedShip].manufacturer + "</h4>");
        //Add Image
        $("#shipImage").empty();
        var imgTag = $("<img class='img-responsive img-hover img-side'>");
        imgTag.attr("src", shipImgSrc);
        $("#shipImage").append(imgTag);
        //add list items for each key in technical specifications
        $("#techSpec").empty();
        for (var data in techData) {
            var item = $("<li class='list-group-item'>").html("<span class='label-text'>" + data + ": </span>" + techData[data]);
            $("#techSpec").append(item);
        }
        // Show Modal on page
        $('#detailView').modal('show');
    }  
}); //Document Ready Ends
