// ================================================================================================== //
// GLOBAL VARIABLES
// ================================================================================================== //
var spaceships = [];
var myCart = [];

$(document).ready(function() {
    // Hide alert
    $('#itemAdded').hide();

     //Get Json data  
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
                //Display Results Grid
                displayResultsGrid();
            });

        } // getSpaceShipList Ends
    // Get data from JSON
    getSpaceShipList();

    // Handle click on the grid image and bind data to popup modal
    $(document).on('click', '.img-portfolio', function() {
        // Get user id from userid data attr
        var selectedShip = $(this).attr('data-index');
        // $(this).addClass("animated slideOutDown hidden");
        console.log(selectedShip);
        // Get current user data and populate modal 
        populateModal(selectedShip);
    });

    // Handle add to cart button click and 
    $(document).on("click", "#addToCart", function() {
        // get item data attribute
        var itemPurchased = $("#addToCart").attr("data-item");
        // Push selected item to myCart array.
        myCart.push(spaceships[itemPurchased]);
        // console.log(myCart);
        
        // close modal
        $("#detailView").modal('toggle');
        // update item count in shopping cart icon
        $("#shopingCart").text(myCart.length);
        // scroll to link location
        $(window).scrollTop($('#shopingCart'));
        // show success alert
        $("#itemAdded").show();
        // focus on shoping cart link
        $("#shopingCart").focus();
    });
    // Handle click on link for Shopping cart
    $(document).on("click", "#cartLink", function() {
        // empty cart div
        $("#myCart").empty();
        // if items in cart array
        console.log(myCart.length);
        if (myCart.length > 0) {
            // display items
            displayShopList();
        } else {
            // Show message that the cart is empty
            $("#myCart").html("<h3>Your Cart is empty!!! Continue Shopping.</h3>");
        }
    });
    // Handle alert message close button click
    $('.close').click(function() {
        $('#itemAdded').hide();
    });
   
    // Display results 
    var displayResultsGrid = function() {
            console.log(spaceships);
            //For each item object create a div tag
            for (var i = 0; i < spaceships.length; i++) {
                // Container div
                var containerDiv = $("<div class='col-md-4 col-sm-6 col-xs-6  img-portfolio' data-toggle='modal' data-target='#detailView'>");
                containerDiv.attr('data-index', i);
                // Create Panel
                var containerPanel = $("<div class='panel panel-primary animated zoomIn'>");
                // panel heading
                var panelHeading = $("<div class='panel-heading'>");
                panelHeading.text(spaceships[i].name);
                // add panel heading to panel
                containerPanel.append(panelHeading);
                // panel body
                var panelBody = $("<div class='panel-body'>");

                // Grid Image Icon
                var imgTag = $("<img class='img-responsive img-hover img-center' style='width:100%' alt='Image'>");
                imgTag.attr("src", spaceships[i].imgIconSrc);
                // Append Img to panel body
                panelBody.append(imgTag);
                // panel footer
                var panelFooter = $("<div class='panel-footer'>");
                panelFooter.text(spaceships[i].class);
                // append panel sections to continer panel
                containerPanel.append(panelHeading);
                containerPanel.append(panelBody);
                containerPanel.append(panelFooter);
                // append panel to container div
                containerDiv.append(containerPanel);
                // append grid to parent div 
                $("#spaceshipsDisplayGrid").append(containerDiv);
            }

        } //Display Result Ends

    // Display shopping list 
    var displayShopList = function() {
            // for each item in shopping list
            for (var i = 0; i < myCart.length; i++) {
                // create container div
                var containerDiv = $("<div class='col-md-3 col-sm-6 col-xs-6 well'>");
                containerDiv.attr('data-index', myCart[i].id - 1);
                // Grid Image Icon
                var imgTag = $("<img class='img-responsive img-hover img-small' style='width:100%'' alt='Image'>");
                imgTag.attr("src", myCart[i].imgIconSrc);
                // Append Img to container div
                containerDiv.append(imgTag);
                // append item name
                containerDiv.append("<h4>" + myCart[i].name + "</h4>");
                // append container div to parent div
                $("#myCart").append(containerDiv);

            }
        }
    
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
