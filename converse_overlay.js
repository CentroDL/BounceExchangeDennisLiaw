
var twoOrMoreItems = function(){
  var cartCount = parseInt ($("#mini-cart").attr("icon-text-attr") );
  return cartCount >= 2;
};

var getImgTags = function($cart){
  return $cart.find( ".item-image img"); // can change the search param as needed if client changes layout
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
                    'border-radius': '5px',
                          'padding': '15px'
                });
};

var styleImages = function(){};

var styleButtons = function(){
  $("#bouncex-buttons").css({ 'height': '150px'});
  $(".bouncex-btn").css({  "width":"150%",
                          "height": "150%",
                         "display": "inline",
                          "margin": "20px 15px"
                        });

   $(".bouncex-btn").find("div").css({   "width": "150px",
                                        "height": "50px",
                                       "display": "inline"
                                     });

  $("#bouncex-close").css({"background-color":"red"});
  $("#bouncex-cart").css({"background-color":"green"});

};

var createButtons = function($content){
  var buttons  = $("<div>");
  var cartBTN  = $("<a>");
  var closeBTN = $("<a>"); // I might be breaking the rules of Markup with this

  buttons.attr("id", "bouncex-buttons");

  closeBTN.html('<div>Close</div>');
  closeBTN.find("div").attr("id", "bouncex-close")
  closeBTN.attr("href", "#");
  closeBTN.addClass("bouncex-btn");
  closeBTN.click(function(e){
    e.preventDefault();
    $content.parent().remove();
  });

  cartBTN.html('<div>Cart</div>');
  cartBTN.find("div").attr("id", "bouncex-cart");
  cartBTN.attr("href", "/cart");
  cartBTN.addClass( "bouncex-btn");


  buttons.append( closeBTN );
  buttons.append( cartBTN );

  $content.append( buttons );

};

var populateDiv = function($overlay){
  $.ajax( {      url: "/cart",
                type: "get",
            dataType: "html"
          }
       ).success( function(data){
          var content = $("<div>");
          var imageDiv = $("<div>");
          var images = getImgTags( $(data) );
          var price  = $("<p>");

          price.text( "$" + cy.VALUE );// modify for different currencies. cy is a var in hompage
          content.attr( "id", "bouncex"); // for debugging

          imageDiv.attr("id", "bouncex-images");
          imageDiv.append( images );

          content.append( imageDiv );
          content.append( price );

          $overlay.append( content);
          createButtons( content );



          $('body').append( $overlay );

          styleOverlay( $overlay );
          styleContent( content );
          styleButtons();

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
