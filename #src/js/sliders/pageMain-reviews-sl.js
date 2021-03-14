$(function () {

    if ($(".reviews-container").length > 0) {


            var loffset = function loffset() {
                var e = $(window).innerWidth(),
                    n = 0,
                    t = $(".container").innerWidth();

                return n = ((e - t) / 2) + 15;
                n = parseInt(n);
                n;
            };


        $(".reviews-container").each(function () {

            var prsl = new Swiper(this, {

                init: false,

                slidesPerView: 1,
                lazy: true,
                preloadImages: false,
                slideToClickedSlide: 1,
                navigation: {
                    nextEl: '.reviews-button-next',
                    prevEl: '.reviews-button-prev',

                },
                breakpoints: {

                    320: {
                        slidesPerView: 1,
                    },

                    600: {
                        slidesPerView: 1.5,
                    },
                    767: {
                        slidesPerView: 2,
                    },

                    990: {
                        slidesPerView: 2.8,
                        slidesOffsetBefore: loffset(),
                        slidesOffsetAfter: loffset(),
                    },
                    2500: {
                        slidesPerView: 4.5,
                        slidesOffsetBefore: loffset(),
                        slidesOffsetAfter: loffset(),
                    }
                }


            });


            prsl.init();

                $(window).resize(function () {
                    prsl.params.slidesOffsetBefore = loffset();
                    prsl.update(!0);
                });

                $(window).on("orientationchange", function () {
                    prsl.params.slidesOffsetBefore = loffset();
                    prsl.update(!0);

                });

        });
    }
});