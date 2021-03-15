if ($('.slider-large-container').length) {
    var sliderLlittle = new Swiper('.slider-little-container', {
        slidesPerView: 3,
        spaceBetween: 15,
        loop: true,
        lazy: true,
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            320: {
                spaceBetween: 15,
            },
            1024: {
                spaceBetween: 30,
            },
        }
    });


    var sliderLarge = new Swiper('.slider-large-container', {
        lazy: true,
        thumbs: {
            swiper: sliderLlittle
        }
    });

};


