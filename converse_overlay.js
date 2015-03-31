
var twoOrMoreItems = function(){
  var cartCount = parseInt ($("#mini-cart").attr("icon-text-attr") );
  return cartCount >= 2;
}

var getCartTotal = function(){
  return parseFloat( cy.VALUE );
}

var getImgTags = function($cart){
  return $cart.find( ".item-image img");
}


var populateDiv = function($div, totalPrice){
  $.ajax( {      url: "/cart",
                type: "get",
            dataType: "html"
          }
       ).success( function(data){
          var images = getImgTags( $(data) );
          var price = $("<p>");
          price.text( "$" + totalPrice );//modify for different currencies
          $div.append( images );
          $('body').append( $div );
          $('body').append( price );
          console.log("SUCCESS!");
       }).fail( function(error){
          console.log("ERROR:\n" + error);
       });
}

var generateOverlay= function(){
  if( twoOrMoreItems() ){
    var total = getCartTotal();
    var overlay = $("<div>");
    populateDiv(overlay, total); //AJAX the cart page and populate the div
  } else {
    alert("Not enough items to trigger overlay!");
  }
}
