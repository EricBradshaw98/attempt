

$(document).ready(function() {

  let orderID = null;

  console.log('app.js loaded!');
  //   $('.addToCartButton').click(function(e) {
  //       addToCart(e);
  //   });
  $('.goToCart').submit(async function(event) {
    event.preventDefault(); // Prevent the default form submission

    try {

      const response = await fetch("/submit", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        }
      });


      if (response.ok) {

        const orderID = $(this).attr('action').split('/')[1];


        window.location.href = `/${orderID}`;
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });
});







  //make a submit event for the form
  $('.addToCartForm').submit(function(event) {
    event.preventDefault();

    //const data = $(this).serialize();
    // console.log(event.target.elements)
    // console.log(data);
    const {menuItemID, userID, quantity} = event.target.elements
    const data = {

      menuItemID : menuItemID.value,
      userID : userID.value,
      quantity : quantity.value,
    };

    if (!orderID){


      $.ajax({
        url: '/orders',
        type: 'POST',
        data: {userID: data.userID},
        success: function(response) {
          orderID = response.order.id;

          $.ajax({
            url: '/cart',
            type: 'POST',
            data: {...data, orderID},
            success: function(response) {





              console.log('Item added to cart successfully!', response);

            },
            error: function(xhr, status, error) {
              console.error('There was a problem adding the item to cart:', error);
            }
          });

        }
      });
    }
  else {

    $.ajax({
    url: '/cart',
    type: 'POST',
    data: {...data, orderID},
    success: function(response) {





      console.log('Item added to cart successfully!', response);

    },
    error: function(xhr, status, error) {
      console.error('There was a problem adding the item to cart:', error);
    }
  });




  }






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
});
