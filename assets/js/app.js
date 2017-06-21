// ================================================================================================== //
// GLOBAL VARIABLES
// ================================================================================================== //
var spaceships = [];
var myCart = [];

$(document).ready(function() {
    // Get data from JSON

   $('#itemAdded').hide();
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
                var containerDiv = $("<div class='col-md-4 col-sm-6 img-portfolio' data-toggle='modal' data-target='#detailView'>");
                containerDiv.attr('data-index', i);
                // Create Panel
                var containerPanel = $("<div class='panel panel-primary'>");
                // panel heading
                var panelHeading = $("<div class='panel-heading'>");
                panelHeading.text(spaceships[i].name);
                // add panel heading to panel
                containerPanel.append(panelHeading);
                // panel body
                var panelBody = $("<div class='panel-body'>");

                // Grid Image Icon
                var imgTag = $("<img class='img-responsive img-hover img-center' style='width:100%'' alt='Image'>");
                imgTag.attr("src", spaceships[i].imgIconSrc);
                // Append Img to panel body
                panelBody.append(imgTag);

                var panelFooter = $("<div class='panel-footer'>");
                panelFooter.text(spaceships[i].class);

                containerPanel.append(panelHeading);
                containerPanel.append(panelBody);
                containerPanel.append(panelFooter);
                containerDiv.append(containerPanel);
                $("#spaceshipsDisplayGrid").append(containerDiv);
            }

        } //Display Result Ends

    // Handle click on the name link tile
    $(document).on('click', '.img-portfolio', function() {
        // Get user id from userid data attr
        var selectedShip = $(this).attr('data-index');
        // $(this).addClass("animated slideOutDown hidden");
        console.log(selectedShip);
        // Get current user data and populate modal 
        populateModal(selectedShip);
    });
    $(document).on("click", "#addToCart", function() {

        var itemPurchased = $("#addToCart").attr("data-item");
        myCart.push(spaceships[itemPurchased]);
        console.log(myCart);
        $("#detailView").modal('toggle');
        $("#shopingCart").text(myCart.length);
        $(window).scrollTop($('#shopingCart'));
        
         $("#itemAdded").show();       

        // $("#shopingCart").focus();

    });
    $('.close').click(function() {
        $('#itemAdded').hide();
    });

    // Bind clicked selectedShip data to modal
    var populateModal = function(selectedShip) {
        $("#addToCart").attr("data-item", selectedShip);
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
