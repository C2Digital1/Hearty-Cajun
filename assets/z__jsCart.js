/******/ (() => { // webpackBootstrap
  var __webpack_exports__ = {};
  Shopify.theme.jsCart = {
    init: function ($section) {

      // Add settings from schema to current object
      //Shopify.theme.jsCart = $.extend(this, Shopify.theme.getSectionData($section));

      this.$section = $section;

      $(document).on('click', '[data-cart-page-delete]', function (e) {
        e.preventDefault();
        const lineID = $(this).data('line-item-key');
        Shopify.theme.jsCart.removeFromCart(lineID);

        return false;
      });
      $(document).on('click', '.linkedDeleteBtn', function (e) {
        e.preventDefault();
        var lineItemKeyToRemove = $(this).data('line-item-key');
        var thisParentContainer = $(this).attr('data-cart-item-key');
        $(".isLinkedProdItem").addClass("fadeItem");
          $.ajax({
            type: 'POST',
            url: '/cart/change.js',
            data: 'quantity=0&line=' + lineItemKeyToRemove,            
            dataType: 'json',
            success: function (cart) {
              console.log(lineItemKeyToRemove);
              $(thisParentContainer).remove();                  
              Shopify.theme.jsCart.updateView(cart, lineItemKeyToRemove);

              if (typeof Shopify.theme.jsAjaxCart !== 'undefined') {
                Shopify.theme.jsAjaxCart.updateView();
              }
              setTimeout(function() { 
                if ($(".linkedDeleteBtn").length > 0) {
                  $(".linkedDeleteBtn:first").click();
                  console.log("REMAINING"+ $(".linkedDeleteBtn").length);
                }
                else{
                 // Shopify.theme.jsCart.updateView();
                  console.log("REMAINING"+ $(".linkedDeleteBtn").length);
                //  window.location.reload();
                }
              }, 2000);

            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText); // Log error if any
            }
        });
      });



      // Prevent the ajax cart form from being submitted when pressing the "Enter" key
      $('#cart_form').keydown(function (e) {
        if (e.keyCode == 13) {
          e.preventDefault();
          return false;
        }
      });
    },
    removeFromCart: function (lineID) {
      const $cartItem = Shopify.theme.jsCart.$section.find(`[data-line-item="${lineID}"]`);

      $cartItem.css('opacity', '0.5');

      $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: 'quantity=0&line=' + lineID,
        dataType: 'json',
        success: function (cart) {

          $cartItem.addClass('animated zoomOut')
          $cartItem.remove();

          Shopify.theme.jsCart.updateView(cart, lineID);

          if (typeof Shopify.theme.jsAjaxCart !== 'undefined') {
            Shopify.theme.jsAjaxCart.updateView();
          }
        },
        error: function (XMLHttpRequest, textStatus) {
          var response = eval('(' + XMLHttpRequest.responseText + ')');
          response = response.description;
        }
      });
    },
    updateView: function (cart, lineID) {

      if (cart.item_count > 0) {
        $.ajax({
          dataType: "json",
          async: false,
          cache: false,
          dataType: 'html',
          url: "/cart",
          success: function (html) {

            if (lineID !== null) {

              const updatedItems = $(html).find('.cart__item-list .cart__card');
              const currentItems = $('.cart__item-list .cart__card');

              // Checks if BOGO applied and there is a change in the number of line items
              if (updatedItems.length != currentItems.length) {
                const updatedCartList = $(html).find('.cart__item-list');
                // Re-append cart items
                $('.cart__item-list').replaceWith(updatedCartList);
              }

              $(currentItems).each(function (index, element) {
                $(element).attr('data-line-item', (index + 1));
                $(element).find('[data-line-item-key]').attr('data-line-item-key', (index + 1));
              })

              const itemTotal = $(html).find(`[data-line-item="${lineID}"]`).find('.cart__total');
              const quantityInput = $(html).find(`[data-line-item="${lineID}"]`).find('.quantity-input');
              const itemPrice = $(html).find(`[data-line-item="${lineID}"]`).find('.cart__price');

              $(`[data-line-item="${lineID}"]`).find('.cart__total').replaceWith(itemTotal);
              $(`[data-line-item="${lineID}"]`).find('.quantity-input').replaceWith(quantityInput);
              $(`[data-line-item="${lineID}"]`).find('.cart__price').replaceWith(itemPrice);

            }

            const subtotal = $(html).find('.cart__footer');

            $('.cart__footer').replaceWith(subtotal);

            $('[data-bind="itemCount"]').text(cart.item_count);
            // if ($(".linkedDelBtn").length > 0) {
            //   $(".linkedDelBtn:first").click();
            // }
          }
        });

      } else {
        $('.cart__empty-cart-message').removeClass('is-hidden');
        $('.cart__form').addClass('is-hidden');
        $('[data-ajax-cart-trigger]').removeClass('has-cart-count');
        $('[data-bind="itemCount"]').text('0');
      }

    },
    unload: function ($section) {
      // Clear event listeners in theme editor
      $('[data-cart-page-delete]').off();
      $('#cart_form').off();
    }
  }

  /******/
})()
  ;