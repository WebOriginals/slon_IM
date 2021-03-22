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


    //component

    // паказывает и скрывает блок (аккардион)
    @@include('../component/dropDownLlist/js/dropDownList.js')
    @@include('../component/InputList/js/InputList.js')
    @@include('../component/Tabs/js/Tabs.js')
    @@include('../component/map/js/map.js')
    @@include('../component/Modals/js/modal.js')
    // end component



    //меню
    @@include('menu.js')

    // счетчик кол-во у товара
    @@include('quantity.js')

    // выпадающий список кастомный
    @@include('input-list.js')

    // скрипт для открытия блока с фильтрами в каталоге
    @@include('btn-settings-mobile.js')

    //фильтер цены
    @@include('filter-price.js')

    //поиск в шапке
    @@include('header-serch.js')



})
