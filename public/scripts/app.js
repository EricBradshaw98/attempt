

$(document).ready(function() {
    console.log('app.js loaded!');
    //   $('.addToCartButton').click(function(e) {
    //       addToCart(e);
    //   });

    //make a submit event for the form
    $('.addToCartForm').submit(function(event) {
        event.preventDefault();

        // make a post request using ajax to the backend route
        $.ajax({
            url: '/cart',
            type: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                // rename this file to cart.js
                //   this will hit the backend route
                // check to make sure that this is hitting the backend route.
                // if so then check that it adds to the db
                // neeed to make a backend route that retrieves alll items that are added to the cart  - this will be a get request
                // make a function in this app.js file which calls an ajax request to point to that newly created get request route then take that data and display it on the page
console.log('Item added to cart successfully!', response);

            },
            error: function(xhr, status, error) {
                console.error('There was a problem adding the item to cart:', error);
            }
        });
        //
    });
    //   function addToCart(event) {

    //     const itemId = event.target.getAttribute('data-order-id');
    //       const form = $(`#addToCartForm_${itemId}`);
    //       const quantity = $(`#quantity_${itemId}`).val();
    //       const formData = new FormData(form[0]);
    //       const price = $(`#foodNameAndPrice_${itemId}`).text();

    //       console.log({itemId, form, quantity, formData, price})
    // const stringCart = localStorage.getItem('cart');

    // const cart = JSON.parse(stringCart);

    // //to use

    // const item = {itemId, quantity, price};

    // cart.items.push(item);
    // localStorage.setItem('cart', JSON.stringify(cart));
    // console.log(cart);
    //       $.ajax({
    //           url: form.attr('action'),
    //           type: 'POST',
    //           data: formData,
    //           processData: false,
    //           contentType: false,
    //           success: function(response) {

    //               console.log('Item added to cart successfully!');

    //               window.location.reload();
    //           },
    //           error: function(xhr, status, error) {

    //               console.error('There was a problem adding the item to cart:', error);
    //           }
    //       });
    //   }

    //   const order ={
    //     orderId: 'test',
    //     items:[]
    //     }



    //     // Sample object


    // // Convert object to string and store it in local storage
    // localStorage.setItem('cart', JSON.stringify(order));

    // });

    // //get item

    // //const stringCart = localStorage.getItem('cart');

    // //const cart = JSON.parse(stringCart);
})
