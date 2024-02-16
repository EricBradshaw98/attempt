

$(document).ready(function() {

  let orderID = null;

  console.log('app.js loaded!');
  //   $('.addToCartButton').click(function(e) {
  //       addToCart(e);
  //   });
  $('.removeItemAjax').submit(function(e) {
    e.preventDefault();
    console.log
    const newURL = $(this).attr("action");
    const values = $(this).serialize();


    $.ajax({
      type: "POST",
      url: newURL,
      data: values,
      success: (jsonData) => {
        const currentSubtotal = jsonData.subtotal;
        const newHTML = `<p>SUBTOTAL : $${currentSubtotal}</p>`;
        $("subtotalTarget").empty().append(newHTML);
      }
  });
  });

  $('.goToCart').click(function(e) {
    e.preventDefault();

    const orderID = Cookies.get("order")
//ajax
//Cookies.remove('name')
//non ajx
//res.clearCookie("order")
  $.ajax({
    url: `/cart/${orderID}`,
    type: 'POST',
    //data: {...data, orderID},
    success: function(response) {





      console.log('posted to orderid', response);
      window.location.href = `http://localhost:8080/cart/${orderID}`

    },
    error: function(xhr, status, error) {
      console.error('There was a problem adding the item to cart:', error);
    }
  });
  });

  $('.submitBar').click(function(e) {
    e.preventDefault();


//ajax
//Cookies.remove('name')
//non ajx
//res.clearCookie("order")
$.ajax({
  url: '/cart/insert/${orderID}',
  type: 'POST',
  data: {...data, orderID},
  success: function(response) {

    console.log('Item added to cart successfully!', response);



      console.log('posted to orderid', response);
      window.location.href = `http://localhost:8080/cart/${orderID}`

    },
    error: function(xhr, status, error) {
      console.error('There was a problem adding the item to cart:', error);
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

});
