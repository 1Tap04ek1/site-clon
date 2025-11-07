window.onload = function () {
    "use strict";

    function getUrl() {
        let pathname = window.location.pathname;
        if (pathname[0] === '/') {
            pathname = pathname.slice(1);
        }
        return '/' + pathname.split('/')[0] + '/basket-update';
    }

    let url = getUrl();

    // Добавление
    $('body').on('click', '.product__quantity_plus', function (e) {
        e.preventDefault();

        let input = $(this).parents('.product__quantity').find('.product__quantity_input');
        input.val(parseInt(input.val()) + 1);
    });
    // Удаление
    $('body').on('click', '.product__quantity_minus', function (e) {
        e.preventDefault();

        let input = $(this).parents('.product__quantity').find('.product__quantity_input');
        if (parseInt(input.val()) !== 1) {
            input.val(parseInt(input.val()) - 1);
        }
    });
    // Нажимаем на кнопку
    $('body').on('click', '.product__quantity_btn', function (e) {
        e.preventDefault();

        let input = $(this).parent().parent().find('.product__quantity_input'),
            product = input.attr('data-product'),
            count = input.val();

        $.get(url, {action: 'increment', product: product, count: count}, function (data) {
            $('.header__basket_count').html(data.products);
            $('.header__basket_value').text(data.total + ' р.');
            Swal.fire({
                title: "Товар добавлен в корзину!",
                icon: "success",
                showCloseButton: true,
                confirmButtonText: 'Ок',
                confirmButtonColor: '#bbb37d',
                showCancelButton: true,
                cancelButtonText: '<a href="/arenda/basket">Оформить заказ</a>',
                cancelButtonColor: '#ffffff',
                timer: 2000
            });
        });
    });

    // Вводим кол-во товаров11
    $('body').on('keyup', '.product__quantity_input', function () {
        this.value = this.value.replace(/[^0-9]/, '')
    });
};