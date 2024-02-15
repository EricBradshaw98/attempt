

$(document).ready(function() {
  $('.addToCartButton').click(function() {
      addToCart($(this));
  });

  function addToCart(button) {
      const itemId = button.data('item-id');
      const form = $(`#addToCartForm_${itemId}`);
      const quantity = $(`#quantity_${itemId}`).val();
      const formData = new FormData(form[0]);
const stringCart = localStorage.getItem('cart');

const cart = JSON.parse(stringCart);



      // $.ajax({
      //     url: form.attr('action'),
      //     type: 'POST',
      //     data: formData,
      //     processData: false,
      //     contentType: false,
      //     success: function(response) {

      //         console.log('Item added to cart successfully!');

      //         window.location.reload();
      //     },
      //     error: function(xhr, status, error) {

      //         console.error('There was a problem adding the item to cart:', error);
      //     }
      // });
  }

  const order ={
    orderId: 'test',
    items:[]
    }



    // Sample object


// Convert object to string and store it in local storage
localStorage.setItem('cart', JSON.stringify(order));

});

//get item

//const stringCart = localStorage.getItem('cart');

//const cart = JSON.parse(stringCart);
