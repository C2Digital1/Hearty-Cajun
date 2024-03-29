/******/ (() => { // webpackBootstrap
  var __webpack_exports__ = {};
  Shopify.theme.jsFeaturedCollection = {
    init: function ($section) {

      // Add settings from schema to current object
      Shopify.theme.jsFeaturedCollection = $.extend(this, Shopify.theme.getSectionData($section));

      let $sliderEl = $section.find('[data-slider]');

      if (this.collection_style == 'slider') {
        this.createSlider($sliderEl);
      }
    },
    createSlider: function ($sliderEl) {

      const slideData = {
        products_per_slide: this.products_per,
        products_available: this.products_available,
        products_limit: this.products_limit,
        enableCenterMode: this.enableCenterMode,
      }
      var alignmode = "left";
      var wrapAround = false;
      if ($(window).width() > 991) {
        if (slideData.enableCenterMode) {
          alignmode = "center";
          wrapAround = true;
        }
      }
      const slider = $sliderEl.flickity({
        lazyLoad: 2,
        freeScroll: false,
        imagesLoaded: true,
        draggable: true,
        cellAlign: alignmode,
        wrapAround: wrapAround,
        pageDots: true,
        contain: false,
        prevNextButtons: slideData.products_limit > slideData.products_per_slide ? true : false,
        initialIndex: 0,
        watchCSS: false,
        arrowShape: arrowShape
      });
      slider.on('settle.flickity', function () {
        slider.flickity('resize');
      });

    },
    unload: function ($section) {
      let $slider = $section.find('.flickity-enabled');
      $slider.flickity('destroy');
    }
  }

  /******/
})()
  ;