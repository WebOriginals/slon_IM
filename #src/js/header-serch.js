if( $( '.ic-btn__search' ).length ) {
    $(".ic-btn__search").click(function () {
        $(this).toggleClass("active");
        if (this.classList.contains("active") === true) {
            $('.body-header__bottom').addClass("body-header__bottom-open");
        } else {
            $('.body-header__bottom').removeClass("body-header__bottom-open");
        }
    });
    $(".wrapper-search-header__close").click(function () {
        $('.search-header').removeClass("active");
        $('.body-header__bottom').removeClass("body-header__bottom-open");
    });
}
