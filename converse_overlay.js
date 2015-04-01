
  var twoOrMoreItems = function(){
    var cartCount = parseInt ($("#mini-cart").attr("icon-text-attr") );
    return cartCount >= 2;
  };

  var getImgTags = function($cart){
    return $cart.find( ".item-image img"); //can change the search param as needed if client changes layout
  };

  var styleOverlay = function($div){
    $div.css({ 'background-color': 'rgba(0,0,0,0.75)',
                       'position': 'fixed',
                        'z-index': '10000', //header has a z-index of 9999...
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
  };

  var styleButtons = function(){
        $("bounceEX-BTN").css({  "width":"25%",
                                 "height":"50%"



                              });
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
            var closeBTN = $("<div>");
            var cartBTN = $("<a>");

            closeBTN.attr("id", "bouncexClose")
            cartBTN.html('<div id="bouncexCart"></div>');

            closeBTN.addClass("bounceEX-BTN");
            cartBTN.addClass( "bounceEX-BTN");

            price.text( "$" + cy.VALUE );// modify for different currencies. cy is a var in hompage
            content.attr( "id", "bouncex"); // for debugging

            content.append( images );
            content.append( price );
            $overlay.append( content);

            styleButtons();
            styleOverlay( $overlay );
            styleContent( content );

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
      populateDiv(overlay); //AJAX the cart page and populate the div
    } else {
      alert("Not enough items to trigger overlay!");
    }
  };
