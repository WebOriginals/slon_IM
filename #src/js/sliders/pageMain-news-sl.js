if( $( '.news-main-container' ).length ) {
    var swiper = new Swiper('.news-main-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        lazy: true,

        breakpoints: {

            320: {
                slidesPerView: 1,
                spaceBetween: 15,
            },

            600: {
                slidesPerView: 1.5,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 30,
            },

            990: {
                slidesPerView: 3,

            },
            1350: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        }
    });
}