/**
 * https://www.chartjs.org/docs/latest/
 */

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var lineConfig = {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
            label: 'Expenses',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: [
                0,
                0,
                335,
                120,
                0,
            ],
            fill: false,
        }, {
            label: 'Balance',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: [
                0,
                0,
                1135,
                800,
                680,
            ],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: ($(window).width() < 960 ? 1 : 2),
        title: {
            display: true,
            text: 'Expenses by month'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                stacked: true,
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Value in $'
                }
            }]
        }
    }
};

var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

var doughnutConfig = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [
                50,
                40,
                270,
                32,
                63,
            ],
            backgroundColor: [
                window.chartColors.red,
                window.chartColors.orange,
                window.chartColors.yellow,
                window.chartColors.green,
                window.chartColors.blue,
            ],
            label: 'Expenses by category',
            borderColor: "#ffffff"
        }],
        labels: [
            'Gas',
            'Phone',
            'Groceries',
            'Entertainment',
            'Eating out',
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: ($(window).width() < 960 ? 1 : 2),
    }
};

window.onload = function() {
    loadGraphs();
}

function loadGraphs() {
    if (!darkMode.isSet) {
        doughnutConfig.data.datasets[0].borderColor = "#ffffff"
    }
    else {
        doughnutConfig.data.datasets[0].borderColor = "#2b2b2b"
    }

    var ctx = document.getElementById('doughnut-canvas').getContext('2d');
    window.myPie = new Chart(ctx, doughnutConfig);

    var ctx = document.getElementById('line-canvas').getContext('2d');
    window.myLine = new Chart(ctx, lineConfig);

}