if( $( '.popular-container' ).length ) {
    var swiper = new Swiper('.popular-container', {
        slidesPerView: 1,
        spaceBetween: 15,
        lazy: true,
        navigation: {
            nextEl: '.popular-button-next',
            prevEl: '.popular-button-prev',

        },
        breakpoints: {

            320: {
                slidesPerView: 1,
                spaceBetween: 15
            },

            600: {
                slidesPerView: 1.5,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 30
            },

            990: {
                slidesPerView: 3,

            },
            1350: {
                slidesPerView: 4,
                spaceBetween: 30
            },
        }
    });
};