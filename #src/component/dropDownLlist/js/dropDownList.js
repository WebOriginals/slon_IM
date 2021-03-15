if( $( '.category-filter' ).length ) {
    $(".category-filter").click(function () {
        var elem = this;
        var block = $(elem).next('.wrapper-radio');
        $(block).slideToggle(parameters);
        $(elem).toggleClass("open");
    });
}