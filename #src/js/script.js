@@include('lazy/closest.js')
@@include('lazy/blazy.min.js')

$( document ).ready(function() {
    // ленивая загрузка
    @@include('blazy.js')

    // sliders
    @@include('sliders/pageMain-firstScreen-sl.js')
    @@include('sliders/pageMain-news-sl.js')
    @@include('sliders/pageMain-popular-sl.js')
    @@include('sliders/pageMain-reviews-sl.js')
    @@include('sliders/pageCardGood-sl.js')
    // end sliders

    //меню
    @@include('menu.js')

    // счетчик кол-во у товара
    @@include('quantity.js')

    // выпадающий список кастомный
    @@include('input-list.js')

    // скрипт для открытия блока с фильтрами в каталоге
    @@include('btn-settings-mobile.js')

    // паказывает и скрывает блок (аккардион)
    @@include('drop-down list.js')

    //фильтер цены
    @@include('filter-price.js')

    //tabs
    @@include('tabs.js')
})
