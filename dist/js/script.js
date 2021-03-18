// Polyfill for Element.closest that falls back to Element.matches that falls back to querySelectorAll
// Created for blazy.js 1.8.1 - https://github.com/dinbror/blazy to ensure IE7+ support


(function () {
    if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.matchesSelector || 
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector || 
        Element.prototype.oMatchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;            
        };
	}

	if (!Element.prototype.closest) {
		Element.prototype.closest = Element.prototype.closest ||
		function(selector) {
			var element = this;
	        while (element.matches && !element.matches(selector)) element = element.parentNode;
	        return element.matches ? element : null;
		};
	}
})();
/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
  (function(q,m){"function"===typeof define&&define.amd?define(m):"object"===typeof exports?module.exports=m():q.Blazy=m()})(this,function(){function q(b){var c=b._util;c.elements=E(b.options);c.count=c.elements.length;c.destroyed&&(c.destroyed=!1,b.options.container&&l(b.options.container,function(a){n(a,"scroll",c.validateT)}),n(window,"resize",c.saveViewportOffsetT),n(window,"resize",c.validateT),n(window,"scroll",c.validateT));m(b)}function m(b){for(var c=b._util,a=0;a<c.count;a++){var d=c.elements[a],e;a:{var g=d;e=b.options;var p=g.getBoundingClientRect();if(e.container&&y&&(g=g.closest(e.containerClass))){g=g.getBoundingClientRect();e=r(g,f)?r(p,{top:g.top-e.offset,right:g.right+e.offset,bottom:g.bottom+e.offset,left:g.left-e.offset}):!1;break a}e=r(p,f)}if(e||t(d,b.options.successClass))b.load(d),c.elements.splice(a,1),c.count--,a--}0===c.count&&b.destroy()}function r(b,c){return b.right>=c.left&&b.bottom>=c.top&&b.left<=c.right&&b.top<=c.bottom}function z(b,c,a){if(!t(b,a.successClass)&&(c||a.loadInvisible||0<b.offsetWidth&&0<b.offsetHeight))if(c=b.getAttribute(u)||b.getAttribute(a.src)){c=c.split(a.separator);var d=c[A&&1<c.length?1:0],e=b.getAttribute(a.srcset),g="img"===b.nodeName.toLowerCase(),p=(c=b.parentNode)&&"picture"===c.nodeName.toLowerCase();if(g||void 0===b.src){var h=new Image,w=function(){a.error&&a.error(b,"invalid");v(b,a.errorClass);k(h,"error",w);k(h,"load",f)},f=function(){g?p||B(b,d,e):b.style.backgroundImage='url("'+d+'")';x(b,a);k(h,"load",f);k(h,"error",w)};p&&(h=b,l(c.getElementsByTagName("source"),function(b){var c=a.srcset,e=b.getAttribute(c);e&&(b.setAttribute("srcset",e),b.removeAttribute(c))}));n(h,"error",w);n(h,"load",f);B(h,d,e)}else b.src=d,x(b,a)}else"video"===b.nodeName.toLowerCase()?(l(b.getElementsByTagName("source"),function(b){var c=a.src,e=b.getAttribute(c);e&&(b.setAttribute("src",e),b.removeAttribute(c))}),b.load(),x(b,a)):(a.error&&a.error(b,"missing"),v(b,a.errorClass))}function x(b,c){v(b,c.successClass);c.success&&c.success(b);b.removeAttribute(c.src);b.removeAttribute(c.srcset);l(c.breakpoints,function(a){b.removeAttribute(a.src)})}function B(b,c,a){a&&b.setAttribute("srcset",a);b.src=c}function t(b,c){return-1!==(" "+b.className+" ").indexOf(" "+c+" ")}function v(b,c){t(b,c)||(b.className+=" "+c)}function E(b){var c=[];b=b.root.querySelectorAll(b.selector);for(var a=b.length;a--;c.unshift(b[a]));return c}function C(b){f.bottom=(window.innerHeight||document.documentElement.clientHeight)+b;f.right=(window.innerWidth||document.documentElement.clientWidth)+b}function n(b,c,a){b.attachEvent?b.attachEvent&&b.attachEvent("on"+c,a):b.addEventListener(c,a,{capture:!1,passive:!0})}function k(b,c,a){b.detachEvent?b.detachEvent&&b.detachEvent("on"+c,a):b.removeEventListener(c,a,{capture:!1,passive:!0})}function l(b,c){if(b&&c)for(var a=b.length,d=0;d<a&&!1!==c(b[d],d);d++);}function D(b,c,a){var d=0;return function(){var e=+new Date;e-d<c||(d=e,b.apply(a,arguments))}}var u,f,A,y;return function(b){if(!document.querySelectorAll){var c=document.createStyleSheet();document.querySelectorAll=function(a,b,d,h,f){f=document.all;b=[];a=a.replace(/\[for\b/gi,"[htmlFor").split(",");for(d=a.length;d--;){c.addRule(a[d],"k:v");for(h=f.length;h--;)f[h].currentStyle.k&&b.push(f[h]);c.removeRule(0)}return b}}var a=this,d=a._util={};d.elements=[];d.destroyed=!0;a.options=b||{};a.options.error=a.options.error||!1;a.options.offset=a.options.offset||100;a.options.root=a.options.root||document;a.options.success=a.options.success||!1;a.options.selector=a.options.selector||".b-lazy";a.options.separator=a.options.separator||"|";a.options.containerClass=a.options.container;a.options.container=a.options.containerClass?document.querySelectorAll(a.options.containerClass):!1;a.options.errorClass=a.options.errorClass||"b-error";a.options.breakpoints=a.options.breakpoints||!1;a.options.loadInvisible=a.options.loadInvisible||!1;a.options.successClass=a.options.successClass||"b-loaded";a.options.validateDelay=a.options.validateDelay||25;a.options.saveViewportOffsetDelay=a.options.saveViewportOffsetDelay||50;a.options.srcset=a.options.srcset||"data-srcset";a.options.src=u=a.options.src||"data-src";y=Element.prototype.closest;A=1<window.devicePixelRatio;f={};f.top=0-a.options.offset;f.left=0-a.options.offset;a.revalidate=function(){q(a)};a.load=function(a,b){var c=this.options;void 0===a.length?z(a,b,c):l(a,function(a){z(a,b,c)})};a.destroy=function(){var a=this._util;this.options.container&&l(this.options.container,function(b){k(b,"scroll",a.validateT)});k(window,"scroll",a.validateT);k(window,"resize",a.validateT);k(window,"resize",a.saveViewportOffsetT);a.count=0;a.elements.length=0;a.destroyed=!0};d.validateT=D(function(){m(a)},a.options.validateDelay,a);d.saveViewportOffsetT=D(function(){C(a.options.offset)},a.options.saveViewportOffsetDelay,a);C(a.options.offset);l(a.options.breakpoints,function(a){if(a.width>=window.screen.width)return u=a.src,!1});setTimeout(function(){q(a)})}});

$( document ).ready(function() {
    // ленивая загрузка
    if( $( '.b-lazy' ).length ) {
    var bLazy = new Blazy({
        breakpoints: [{
            width: 420 // Max-width
            , src: 'data-src-small'
        }]
        , success: function (element) {
            setTimeout(function () {
                // We want to remove the loader gif now.
                // First we find the parent container
                // then we remove the "loading" class which holds the loader image
                var parent = element.parentNode;
                parent.className = parent.className.replace(/\bloading\b/, '');
            }, 200);
        }
    });
}

    // sliders
    if ($('.firstScreen-container').length) {
var swiper = new Swiper('.firstScreen-container', {
    lazy: true,
    pagination: {
        el: '.firstScreen-pagination',
        type: 'custom',
        clickable: true,
        renderCustom: function ( bulletClass, current,  total ){
            var pagination_tpl = '<span class="number-left">' + ( '0' + current ).slice( -2 ) + '</span>';
                pagination_tpl += '<span class="nimber-right"> \\  '  +  ( '0' + total ).slice( -2 ) + '</span>';
            return pagination_tpl;
        },
    },

});
};
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

        function updateClasses({ $el, slides, activeIndex }) {
            $el.find('.swiper-slide-next').next().removeClass('dark-slide');
            slides.eq(activeIndex).next().next().addClass('dark-slide');
        }
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
                    // 2500: {
                    //     slidesPerView: 4.5,
                    //     slidesOffsetBefore: loffset(),
                    //     slidesOffsetAfter: loffset(),
                    // }
                },



                on: {
                    init() {
                        updateClasses(this);
                    },
                    slideChange() {
                        updateClasses(this);
                    },
                },


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



    // end sliders


    //component

    // паказывает и скрывает блок (аккардион)
    if( $( '.dropDownList-title' ).length ) {
    $(".dropDownList-title").click(function () {
        var elem = this;
        var block = $(elem).next('.dropDownList-hidden');
        $(block).slideToggle(parameters);
        $(elem).toggleClass("open");
    });
}
    if( $( '.price-text' ).length ) {
    if (window.screen.width <= 1240) {
        $('.select-value').html("ценa ↑");
    }
}

( function( $ ){

    // Настройки

    var settings = {
        select_value : 'select-value',
        action : 'select_edit',
        class_open : 'open',
        class_transfotm : 'transfotm',
        class_wrapper : 'wrapper-input',
        class_block : 'wrapper-size',
        class_buffer : 'input-buffer',
        class_items : 'list__itams',
        class_selector : 'js_size_selector',
        class_disabel : 'list__itams-disabel',
    };


    var hendler = {

        // Инициализация

        construct : function(){
            if( $( "." + settings.class_wrapper ).length ){
                $( "." + settings.class_wrapper ).unbind( "click." + settings.action );
                $( "." + settings.class_wrapper ).bind( "click." + settings.action, function (){
                    hendler.select_action( this );
                });
            }
        },

        // Нажатие на блок селекта

        select_action : function( elem ){

            var input = $( elem ).find( 'input' ); // Инпут блока
            var value = $( elem ).find( '.' + settings.select_value ); // Значение блока
            var block = $( elem ).closest( '.' + settings.class_block ); // Находим общую обертку
            var selector = $( block ).find( '.' + settings.class_selector ); // Находим облок элементов внутри общей обертки
            var items = $( selector ).find( '.' + settings.class_items ).not( '.' + settings.class_disabel ); // Находим все item внутри общей обертки

            // Закрыть селект

            var close_select = function(){
                $( items ).unbind( 'click.' + settings.action ); // Отменяем оброботчик кликов на item
                $( document ).unbind( 'mouseup.' + settings.action ); // Отменяем обработчик клика вне общей обертки
                $( selector ).removeClass( settings.class_open ); // Закрываем блок
                $( block ).removeClass( settings.class_transfotm ); // Изменяем стрелку селекта
            };

            $( selector ).toggleClass( settings.class_open ); // Открываем или скрываем

            // Если открыли блок селекта

            if( $( selector ).hasClass( settings.class_open ) ){

                $( block ).addClass( settings.class_transfotm ); // Изменяем стрелку селекта

                // Определяем обработчик клика на item

                $( items ).unbind( 'click.' + settings.action ).bind( 'click.' + settings.action, function(){

                    $( value ).text( $( this ).text() ); // Берем текст из item и сохраняем в видимое выбраное значение
                    $( input ).val( $( this ).data( 'value' ) || $( this ).text()).trigger("change"); // Берем дата параметр или текст из item и сохраняем в наш input

                    if(window.screen.width<=1023) {
                        $(value).text(value.text().substring(0, 27)); //ограничиваем кол-во символов на строке
                        if ($(value).text().length >= 27) { // считаем сколько символов и если больше или равно 27 добавлять ...
                            $(value).append("...");
                        }
                    } else {
                        $(value).text(value.text().substring(0, 50)); //ограничиваем кол-во символов на строке
                        if ($(value).text().length >= 50) { // считаем сколько символов и если больше или равно 27 добавлять ...
                            $(value).append("...");
                        }
                    }
                    close_select();
                });

                // Определяем обработчик клика вне блока

                $( document ).unbind( 'mouseup.' + settings.action ).bind( 'mouseup.' + settings.action, function( e ){

                    // Если нажали не на нашу общую обертку или не на блок внутри нее

                    if( !$( block ).is( e.target ) && $( block ).has( e.target ).length === 0 ){ close_select(); }
                });

            } else { close_select(); }
        }
    };

    window.obora_selector = hendler;

    $( document ).ready( function(){ hendler.construct(); });

})( jQuery );
    if ($('.tabs').length) {
    let tab = function () {
        let AllBodyTabs = document.querySelectorAll('.tabs');

        AllBodyTabs.forEach(tab=> {

            let tabNav = tab.querySelectorAll('.tabs-nav__item'),
                tabContant = tab.querySelectorAll('.tab-pane'),
                tabName;

            let selectTabContant = function() {

                tabContant.forEach(item=>{
                    item.classList.contains(tabName)? item.classList.add('is-active'): item.classList.remove('is-active');
                })
            }

            tabNav.forEach(item => {
                item.addEventListener('click', function(){

                    tabNav.forEach(item=>{
                        item.classList.remove('is-active')
                    });

                    this.classList.add('is-active');
                    tabName = this.getAttribute('data-tab-name')
                    selectTabContant(tabName);
                })
            })
        });
    }
    tab();
};
    if ($('#map').length) {


    var myMap;

    ymaps.ready(init);

    function init() {

        myMap = new ymaps.Map('map', {

            center: [45.350942, 39.058194],
            controls: [],
            zoom: 13
        }, {
            searchControlProvider: 'yandex#search'
        });

        var myPlacemark = new ymaps.Placemark([45.350942, 39.058194], {}, {
            iconLayout: 'default#image',
            iconImageHref: './../../img/ic/point-map.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-15, -40]
        });

// Размещение геообъекта на карте.
        myMap.geoObjects
            .add(myPlacemark);

// Добавим на карту ползунок масштаба и линейку.
        myMap.controls.add('zoomControl');

//Отключить изменение маштаба колесом и косанием
        myMap.behaviors.disable(['scrollZoom', 'multiTouch', 'drag']);
    }

}
    // end component



    //меню
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



    // счетчик кол-во у товара
    if( $( '.card-info__quantity' ).length ) {
    function countFunc(count) {
        var btnPlus = count.querySelector('.card-info__plus');
        var btnMinus = count.querySelector('.card-info__minus');
        var field = count.querySelector('.card-info__number');
        var fieldValue = parseFloat(field.value, 10);//Прообразовываем к числу

        btnMinus.addEventListener('click', function () {
            if (fieldValue > 1) {
                fieldValue--;
                field.value = fieldValue;
            } else {
                return 1;
            }
        });
        btnPlus.addEventListener('click', function () {
            fieldValue++;
            field.value = fieldValue;
        });

    }

    var counts = document.querySelectorAll('.card-info__quantity');
    counts.forEach(countFunc);
}

    // выпадающий список кастомный
    if( $( '.price-text' ).length ) {
    if (window.screen.width <= 1240) {
        $('.select-value').html("ценa ↑");
    }
}

( function( $ ){

    // Настройки

    var settings = {
        select_value : 'select-value',
        action : 'select_edit',
        class_open : 'open',
        class_transfotm : 'transfotm',
        class_wrapper : 'wrapper-input',
        class_block : 'wrapper-size',
        class_buffer : 'input-buffer',
        class_items : 'list__itams',
        class_selector : 'js_size_selector',
        class_disabel : 'list__itams-disabel',
    };


    var hendler = {

        // Инициализация

        construct : function(){
            if( $( "." + settings.class_wrapper ).length ){
                $( "." + settings.class_wrapper ).unbind( "click." + settings.action );
                $( "." + settings.class_wrapper ).bind( "click." + settings.action, function (){
                    hendler.select_action( this );
                });
            }
        },

        // Нажатие на блок селекта

        select_action : function( elem ){

            var input = $( elem ).find( 'input' ); // Инпут блока
            var value = $( elem ).find( '.' + settings.select_value ); // Значение блока
            var block = $( elem ).closest( '.' + settings.class_block ); // Находим общую обертку
            var selector = $( block ).find( '.' + settings.class_selector ); // Находим облок элементов внутри общей обертки
            var items = $( selector ).find( '.' + settings.class_items ).not( '.' + settings.class_disabel ); // Находим все item внутри общей обертки

            // Закрыть селект

            var close_select = function(){
                $( items ).unbind( 'click.' + settings.action ); // Отменяем оброботчик кликов на item
                $( document ).unbind( 'mouseup.' + settings.action ); // Отменяем обработчик клика вне общей обертки
                $( selector ).removeClass( settings.class_open ); // Закрываем блок
                $( block ).removeClass( settings.class_transfotm ); // Изменяем стрелку селекта
            };

            $( selector ).toggleClass( settings.class_open ); // Открываем или скрываем

            // Если открыли блок селекта

            if( $( selector ).hasClass( settings.class_open ) ){

                $( block ).addClass( settings.class_transfotm ); // Изменяем стрелку селекта

                // Определяем обработчик клика на item

                $( items ).unbind( 'click.' + settings.action ).bind( 'click.' + settings.action, function(){

                    $( value ).text( $( this ).text() ); // Берем текст из item и сохраняем в видимое выбраное значение
                    $( input ).val( $( this ).data( 'value' ) || $( this ).text()).trigger("change"); // Берем дата параметр или текст из item и сохраняем в наш input

                    if(window.screen.width<=1023) {
                        $(value).text(value.text().substring(0, 27)); //ограничиваем кол-во символов на строке
                        if ($(value).text().length >= 27) { // считаем сколько символов и если больше или равно 27 добавлять ...
                            $(value).append("...");
                        }
                    } else {
                        $(value).text(value.text().substring(0, 50)); //ограничиваем кол-во символов на строке
                        if ($(value).text().length >= 50) { // считаем сколько символов и если больше или равно 27 добавлять ...
                            $(value).append("...");
                        }
                    }
                    close_select();
                });

                // Определяем обработчик клика вне блока

                $( document ).unbind( 'mouseup.' + settings.action ).bind( 'mouseup.' + settings.action, function( e ){

                    // Если нажали не на нашу общую обертку или не на блок внутри нее

                    if( !$( block ).is( e.target ) && $( block ).has( e.target ).length === 0 ){ close_select(); }
                });

            } else { close_select(); }
        }
    };

    window.obora_selector = hendler;

    $( document ).ready( function(){ hendler.construct(); });

})( jQuery );

    // скрипт для открытия блока с фильтрами в каталоге
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

    //фильтер цены
    

/*
* список дата атрибутов
* data-width: задает шиину range в px
* data-type: тип: duble - двойной, single - одинарный
* data-units: отображение единиц измерения
* data-value: применяется к max и к min,
* задает максимаьное и минимальное значение диапазона соотетственно
*/

// получаем элементы min, max, fill и самого блока range
if( $( '.filter-slider-price' ).length ) {
    const min = document.querySelector('.min-range-item');
    const max = document.querySelector('.max-range-item');
    const rangeBlock = document.querySelector('.range');
    let fill = document.querySelector('.range-fill');
    const infoBox = document.querySelector('.info');

// блоки для вывода текущих параметров сортировки по цене (min - max)
    let minInfo = document.querySelector('.min-price');
    let maxInfo = document.querySelector('.max-price');

// получаем настройки из data аттрибутов
    const dataWidth = +rangeBlock.dataset.width;
    const dataType = rangeBlock.dataset.type;
    const dataUnits = rangeBlock.dataset.units;
    const dataMinVal = +min.dataset.value;
    const dataMaxVal = +max.dataset.value;

// получаем начальную точку блока range
    const startX = rangeBlock.getBoundingClientRect().x;

// если 2 ползука берём их ширину для расчетов, чтоб не наезжали друг на друга
    let shiftMax = max.clientWidth;
    let shiftMin = min.clientWidth;

// проверяем настрйки типа, если одинарный - убираем минимальный ползунок
    if (dataType === 'single') {
        min.style.display = 'none';
        document.querySelector('.min-box').style.display = 'none';
        shiftMin = 0;
    }
    if (dataType === 'duble') {
        min.style.display = 'block';
        document.querySelector('.min-box').style.display = 'block';
    }

// параметры ползунков
    let minValue = startX;
    let maxValue = startX + dataWidth - shiftMax;

// задаем стили их дата атрибутов
    rangeBlock.style.width = dataWidth + '%';
    infoBox.style.width = dataWidth + '%';
    minInfo.insertAdjacentHTML('beforebegin', dataUnits);
    minInfo.insertAdjacentHTML('afterbegin', dataMinVal);
    maxInfo.insertAdjacentHTML('beforebegin', dataUnits);
    maxInfo.insertAdjacentHTML('afterbegin', dataMaxVal);

// задаем инлайново стили, чтобы потом былм данные
    min.style.left = 0 + '%';
    max.style.left = dataWidth - shiftMax + '%';


    /**
     * запускаем функцию при нажатии кнопки мыши
     * @param event {Event} событие
     */
    const check = (event) => {

        // чтобы не терять таргет - отслеживаем тот ползунок, на котором было событие mousedown
        let targetMain = event.target;

        // корректные значения допустимые для перемещения ползунка, используются дальше
        let currentMaxValue, currentMinValue;

        /**
         * отслеживаем перемещение мыши и вычисляем координаты ползунка)
         * @param event {Event} событие
         */
        const move = (event) => {

            // у touch события массив эвентов, сводим к одной переменой этим условием
            let e;
            (event.type === 'touchmove') ? e = event.touches[0] : e = event;

            // если таргет максимальное значение
            if (targetMain === max) {
                currentMaxValue = maxValue;
                currentMinValue = parseInt(min.style.left) + shiftMin + startX;
            }

            // если таргет минимальное значение
            if (targetMain === min) {
                currentMinValue = minValue;
                currentMaxValue = parseInt(max.style.left) - shiftMax + startX;
            }

            // меняем положение активного ползунка от края и до другого ползунка
            if (e.clientX - (shiftMin / 2) > currentMinValue && e.clientX - (shiftMax / 2) < currentMaxValue) {
                targetMain.style.left = e.clientX - startX - (shiftMax / 2) + '%';
            } else if (e.clientX < currentMinValue && targetMain === min) {
                targetMain.style.left = 0 + '%';
            } else if (e.clientX > currentMaxValue && targetMain === max) {
                targetMain.style.left = dataWidth - shiftMax + '%';
            } else if (e.clientX < currentMinValue && targetMain === max && shiftMin === 0) {
                targetMain.style.left = 0 + '%';
            }

            // изменяем зарисовку между ползунками
            fill.style.left = min.style.left;
            fill.style.width = parseInt(max.style.left) - parseInt(min.style.left) + shiftMax + '%';

            // выводим информацию о выбранном диапазоне цен
            let targetPrice;
            (targetMain === max) ? targetPrice = maxInfo : targetPrice = minInfo;

            targetPrice.textContent = Math.floor(parseInt(targetMain.style.left) * (dataMaxVal - dataMinVal) / (dataWidth - shiftMax) + dataMinVal + '');

        }


        // вешаем слушатель на движение мыши по всему документу
        document.addEventListener('mousemove', move);
        document.addEventListener('touchmove', move);

        /**
         * если отпустили кнопку - удаляем слушатели на перемещение мыши
         */
        let mouseUpFn = () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('touchmove', move);
        }

        // ждем отпускания лкм чтобы убить слушатель движения мыши
        document.addEventListener('mouseup', mouseUpFn);
        document.addEventListener('touchend', mouseUpFn);
    }


    rangeBlock.addEventListener('mousedown', check);
    rangeBlock.addEventListener('touchstart', check);
}



})
