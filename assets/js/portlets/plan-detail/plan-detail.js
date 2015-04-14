(function ($, undefined) {

    $('#barChartDataSelector').find('a').click(function (e) {
        e.preventDefault();
        var val = $(this).attr('value');
        $("#chartContextValue").text(val);

        // set hidden input value in form to selected value
        
    });

}(jQuery));
