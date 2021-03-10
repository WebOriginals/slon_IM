if( $( '.sorting-settings-block__settings-wr' ).length ) {
    $(".sorting-settings-block__settings-wr").click(function () {

        $('.saitbar').addClass("settings-open");
        $('.btn-close-sitings').addClass("btn-close-sitings-open");
        $('body').addClass('no-scroll');
    });
    $(".btn-close-sitings").click(function () {

        $('.btn-close-sitings').removeClass("btn-close-sitings-open");
        $('.saitbar').removeClass("settings-open");
        $('body').removeClass('no-scroll');
    });
}