//https://www.daterangepicker.com/
$(function() {
    $('input[name="daterange"]').daterangepicker({
        showDropdowns: true,
        minYear: 2019,
        maxYear: 2020,
        autoApply: true,
        opens: 'left',
        locale: {
            format: "DD/MM/YYYY",
            separator: " - ",
            applyLabel: "Apply",
            cancelLabel: "Cancel",
            fromLabel: "From",
            toLabel: "To",
            customRangeLabel: "Custom",
            weekLabel: "W",
            daysOfWeek: [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
            ],
            monthNames: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            firstDay: 1,
            startDate: "10/15/2020",
            endDate: "10/21/2020",
            drops: "auto"
        }

    }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('DD/MM/YYYY') + ' to ' + end.format('DD/MM/YYYY'));
    });
});