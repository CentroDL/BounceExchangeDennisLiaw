# Converse Ad Overlay

Hello Bounce Exchange! This is a solution to the code challenge Angela sent me for the integrations engineer opening. Below is the prompt for the problem:

> Go to converse.com and add at least 2 products to your cart. Then return to the home page.
>
> Write a javascript snippet that can be run in the console of a browser that does the following:
>
> Extract the number of items in the cart, the cart total, and item images from the page. Store them in javascript variables.
>
> The trigger should show a centered overlay on top of the site that displays the information gathered above and two buttons. One button closes the overlay and the other takes the user to the cart page. It should have a style consistent with the website. Design matters.
>
> Behind the overlay add a semi-transparent black background that obscures the site. The overlay should be able to trigger multiple times if dismissed.
>
> BONUS
>
> 1. The overlay should only fire if the user is "logged in".
>
> 2. Describe some other ways you might be able to obtain the information needed for the overlay (think generally, not specific to THIS website).


# To Run

1. Go to the www.converse.com and add at least 2 items to your cart.
2. Copy and paste the code in converse_overlay.js into your browser's javascript console, then run the command:

	`generateOverlay()`

# The Approach

My initial approach was to dig through the site's source to see where the internal resources were coming from. I was specifically looking for any AJAX calls to internal APIs so that I could pull the content from the cart page and parse it. Some elements were available though and I did burn a lot of time trying to analyze the initialization methods in their WebEvent.js file. For time's sake I'm going to stick with the AJAX call method and if time allows I'll attempt to load the cart contents using the converse page's methods. The template.html and overlay.css files were just used for workflow since writing styles in a really fat AJAX call can get tedious.

BONUS:

1. There's a variable `cy`, most likely a cookie, that identifies users as a guest. I  can just add a check for it in the same boolean that check if there's two+ items in the cart.

2. The code that decrpyts the session cookie is in the site's source. It also gives you the items in your cart. One could use it in place of an AJAX call.
