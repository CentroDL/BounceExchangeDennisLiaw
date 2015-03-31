
var twoOrMoreItems = function(){
  var cartCount = parseInt ($("#mini-cart").attr("icon-text-attr") );
  return cartCount >= 2;
}

var getCartTotal = function(){
  return parseFloat( cy.VALUE );
}

//Check to see if we have more than 2 items
//pull elements from page
//render overlay
