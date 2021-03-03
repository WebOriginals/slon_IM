parameters = {
    duration: 1500,
}

if( $( '.body-header' ).length ) {
    $(".cmn-toggle-switch__htx").click(function () {
        $(this).toggleClass("active");
        if (this.classList.contains("active") === true) {
            $('.wrapper-menu').addClass("active");
            $('body').addClass('no-scroll');
            $(".wrapper-gamburger").addClass('menu-hover');
        } else {
            $('.wrapper-menu').removeClass("active");
            $('body').removeClass('no-scroll');
            $(".wrapper-gamburger").removeClass('menu-hover');
            //это для ст контакты скрывает настройки при клике на гамбургер
            $('.wrapper-sidebar').removeClass("settings-open");
            $('.btn-settings').removeClass("active");
        }
    });

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        $(".second-menu").click(function () {

            var elem = this;
            var block = $(elem).closest('.link-menu');
            var items = $(block).find('.second-menu');
            var ul = $(block).find('ul');
            $(block).toggleClass("open");
            $(ul).slideToggle(parameters);

        });
    }
}

