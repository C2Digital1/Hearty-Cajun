/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
Shopify.theme.jsSlideshowClassic = {
	init: function($section) {

    // Add settings from schema to current object
    Shopify.theme.jsSlideshowClassic = $.extend(this, Shopify.theme.getSectionData($section));

    // Selectors
    const $slideshowClassicEl = $section.find('[data-slideshow-classic]').removeClass('is-hidden');    
    const $textSlideshowEl = $section.find('[data-text-slideshow]').removeClass('is-hidden');

    const $slideshowClassic = $slideshowClassicEl.flickity({
      wrapAround: true,
      adaptiveHeight: true,
      prevNextButtons: this.number_of_slides > 1 ? this.show_arrows : false,
      pageDots: this.number_of_slides > 1 ? this.show_nav_buttons : false,
      draggable: true,
      cellAlign: 'center',
      imagesLoaded: true,
      fade: this.image_transition == 'fade' ? true : false,
      autoPlay: this.image_slideshow_speed * 1000,
      arrowShape: arrowShape
    });
    const $textSlideshow = $textSlideshowEl.flickity({
      autoplay: false,
      contain: true,
      imagesLoaded: true,
      lazyload: 4,
      prevNextButtons: false,
      pageDots: this.number_of_slides > 1 ? this.show_nav_buttons : false,
      draggable: false,
      on: {
        ready: function () {
          const $currentTextSlide = $textSlideshowEl.find('.is-selected .text-slideshow__content');
          Shopify.theme.animation.slideTransition($currentTextSlide, textTransition);
        }
      }
    });

    // Resize flickity when the slider is settled
    $slideshowClassicEl.on( 'settle.flickity', function() {
      $slideshowClassicEl.flickity('resize');
    })

    $slideshowClassic.on('change.flickity', function (event, index) {
      $textSlideshow.flickity('select', index, true, true);

      const $currentTextSlide = $textSlideshowEl.find('.is-selected .text-slideshow__content');
      Shopify.theme.animation.slideTransition($currentTextSlide, textTransition);

    });

    $textSlideshow.on('change.flickity', function (event, index) {
      $slideshowClassic.flickity('select', index, true, false);
    });

  },
  blockSelect: function($section, blockId) {
    const $slider = $section.find('[data-image-slideshow]');
    const $sliderIndex = $('#shopify-section-' + blockId).data('slide-index');

    $slider.flickity('select', $sliderIndex, true, true);

  },
	unload: function($section) {

	}
}

/******/ })()
;