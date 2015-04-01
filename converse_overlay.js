
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

  $content.find("p").css({ "font-size": "24px",
                              "margin": "15px 0px"
                         });
};

var styleImages = function(){}; //stub just in case

var styleButtons = function(){
  $(".bouncex-btn").css({         'margin': '20px 20px',
                          'vertical-align': 'middle',
                                  'height': '25px',
                                 'display': 'inline-block',
                                 'padding': '15px',
                               'font-size': '24px',
                              'text-align': 'center',
                                   'color': 'white',
                        'background-color': 'black',
                              'font-style': 'bold',
                                  'border': '1px solid black',
                                   'width': '150px'
                        });

  $(".bouncex-btn").find("a").css("color", "white");

};

var createButtons = function($content){
  var buttons  = $("<div>");
  var cartBTN  = $("<div>");
  var closeBTN = $("<div>");

  buttons.attr("id", "bouncex-buttons");

  closeBTN.html('<a href="#">CLOSE</a>');
  closeBTN.attr("id", "bouncex-close")
  closeBTN.addClass("bouncex-btn");
  closeBTN.find("a").click(function(e){
    e.preventDefault();
    $content.parent().remove();
  });

  cartBTN.html('<a href="/cart">CART</a>');
  cartBTN.attr("id", "bouncex-cart");
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

          price.text( "Just $" + cy.VALUE );// modify for different currencies. cy is a var in hompage
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
