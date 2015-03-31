
var twoOrMoreItems = function(){
  var cartCount = parseInt ($("#mini-cart").attr("icon-text-attr") );
  return cartCount >= 2;
}

var getImgTags = function($cart){
  return $cart.find( ".item-image img");
}


var populateDiv = function($div){
  $.ajax( {      url: "/cart",
                type: "get",
            dataType: "html"
          }
       ).success( function(data){
          var images = getImgTags( $(data) );
          var price  = $("<p>");
          price.text( "$" + cy.VALUE );//modify for different currencies. cy is a var in hompage
          $div.append( images );
          $div.append( price );
          $('body').append( $div );
          console.log("SUCCESS!");
       }).fail( function(error){
          console.log("ERROR:\n" + error);
       });
}

var generateOverlay= function(){
  if( twoOrMoreItems() ){
    var overlay = $("<div>");
    overlay.addClass("bouncy");
    populateDiv(overlay); //AJAX the cart page and populate the div
  } else {
    alert("Not enough items to trigger overlay!");
  }
}
