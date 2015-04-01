
var twoOrMoreItems = function(){
  var cartCount = parseInt ($("#mini-cart").attr("icon-text-attr") );
  return cartCount >= 2;
};

var getImgTags = function($cart){
  return $cart.find( ".item-image img"); // can change the search param as needed if client changes layout
};

var createButtons = function($content){
  var buttons  = $("<div>");
  var cartBTN  = $("<a>");
  var closeBTN = $("<a>"); // I might be breaking the rules of Markup with this

  buttons.attr("id", "bouncex-buttons");

  closeBTN.html('<div>Close</div>');
  closeBTN.attr("id", "bouncex-close")
  closeBTN.attr("href", "#");
  closeBTN.click(function(e){
    e.preventDefault();
    $content.parent().remove();
  });

  cartBTN.html('<div>Cart</div>');
  cartBTN.attr("id", "bouncex-cart");
  cartBTN.attr("href", "/cart");

  closeBTN.attr("id", "bouncex-btn"); // specificity issues here, so i'm using id vs class
  cartBTN.attr( "id", "bouncex-btn");

  styleButtons();

  buttons.append( closeBTN );
  buttons.append( cartBTN );

  $content.append( buttons );
};

var styleOverlay = function($div){
  $div.css({ 'background-color': 'rgba(0,0,0,0.75)',
                     'position': 'fixed',
                      'z-index': '10000', // header has a z-index of 9999...
                        'width': '100%',
                       'height': '100%'
            });
};

var styleContent = function($content){
  $content.css({ 'background-color': 'white',
                            'width': '600px',
                            'color': 'black',
                           'margin': '0 auto',
                         'position': 'relative',
                              'top': '50%',
                        'transform': 'translateY(-50%)',
                       'text-align': 'center',
                    'border-radius': '5px'
                });

  $content.find("img").css({ "margin": "0 20px"


                           });
};

var styleButtons = function(){
  $("#bouncex-btn").css({  "width":"25%",
                            "height":"50%",
                            "display":"inline"



                        });

  $("#bouncex-close").css({"background-color":"red"});
  $("#bouncex-cart").css({"background-color":"green"});

};


var populateDiv = function($overlay){
  $.ajax( {      url: "/cart",
                type: "get",
            dataType: "html"
          }
       ).success( function(data){
          var content = $("<div>");
          var images = getImgTags( $(data) );
          var price  = $("<p>");

          price.text( "$" + cy.VALUE );// modify for different currencies. cy is a var in hompage
          content.attr( "id", "bouncex"); // for debugging

          content.append( images );
          content.append( price );

          $overlay.append( content);

          styleOverlay( $overlay );
          styleContent( content );

          createButtons( content );

          $('body').append( $overlay );

          console.log("SUCCESS!");
       }).fail( function(error){
          console.log("ERROR:\n" + error);
       });
};

var generateOverlay= function(){
  if( twoOrMoreItems() ){
    var overlay = $("<div>");
    overlay.attr( "id", "overlay"); // debug purposes
    populateDiv(overlay); // AJAX request the cart page and populate the div
  } else {
    alert("Not enough items to trigger overlay!");
  }
};
