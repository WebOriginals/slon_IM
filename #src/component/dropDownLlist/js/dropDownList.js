if( $( '.dropDownList-title' ).length ) {
    $(".dropDownList-title").click(function () {
        var elem = this;
        var block = $(elem).next('.dropDownList-hidden');
        $(block).slideToggle(parameters);
        $(elem).toggleClass("open");
    });
}