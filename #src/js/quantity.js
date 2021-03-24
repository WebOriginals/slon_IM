if( $( '.card-info__quantity' ).length ) {
    function countFunc(count) {
        var btnPlus = count.querySelector('.card-info__plus');
        var btnMinus = count.querySelector('.card-info__minus');
        var field = count.querySelector('.card-info__number');
        var fieldValue = parseFloat(field.value, 10);//Прообразовываем к числу

        var max = field.getAttribute("data-max")

        btnMinus.addEventListener('click', function () {
            if (fieldValue > 1) {
                fieldValue--;
                field.value = fieldValue;
            } else {
                return 1;
            }
        });
        btnPlus.addEventListener('click', function () {
            if(fieldValue < max){
                fieldValue++;
                field.value = fieldValue;
            }

        });

        field.addEventListener('keyup', function () {
            console.log(this.value);
            fieldValue = this.value || 0;
            if(fieldValue > max){
                this.value = max;
            }else if(fieldValue == 0){
                this.value = 1;
            }
        });

    }

    var counts = document.querySelectorAll('.card-info__quantity');
    counts.forEach(countFunc);
}