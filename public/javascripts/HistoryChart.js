/**
 * https://www.chartjs.org/docs/latest/
 */

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
        aspectRatio: 2,
        title: {
            display: true,
            text: 'Expenses by month',
            fontColor: '#666'
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

                },
                ticks: {
                    beginAtZero: true,
                    fontColor: '#666'
                },
                gridLines: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }],
            yAxes: [{
                stacked: true,
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value in $'
                },
                ticks: {
                    beginAtZero: true,
                    fontColor: '#666'
                },
                gridLines: {
                    display: true ,
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }]
        },
        legend: {
            labels: {
                fontColor: '#666'
            }
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
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: ($(window).width() < 960 ? 1 : 2),
        legend: {
            labels: {
                fontColor: '#666'
            }
        }
    }
};

function loadGraphs(categoryData) {
    doughnutConfig.data.datasets[0].data = extractValues(categoryData);
    doughnutConfig.data.labels = extractNames(categoryData);

    lineConfig.options.aspectRatio = ($(window).width() < 960 ? 1 : 2);

    if (!darkMode.isSet) {
        doughnutConfig.data.datasets[0].borderColor = "#ffffff";
        doughnutConfig.options.legend.labels.fontColor ="#666";
        lineConfig.options.legend.labels.fontColor ="#666";
        lineConfig.options.title.fontColor ="#666";
        lineConfig.options.scales.xAxes[0].ticks.fontColor ="#666";
        lineConfig.options.scales.yAxes[0].ticks.fontColor ="#666";
        lineConfig.options.scales.xAxes[0].gridLines.color ="rgba(0, 0, 0, 0.1)";
        lineConfig.options.scales.yAxes[0].gridLines.color ="rgba(0, 0, 0, 0.1)";
    }
    else {
        doughnutConfig.data.datasets[0].borderColor = "#2b2b2b";
        doughnutConfig.options.legend.labels.fontColor ="#ffffff";
        lineConfig.options.legend.labels.fontColor ="#ffffff";
        lineConfig.options.title.fontColor ="#ffffff";
        lineConfig.options.scales.xAxes[0].ticks.fontColor ="#ffffff";
        lineConfig.options.scales.yAxes[0].ticks.fontColor ="#ffffff";
        lineConfig.options.scales.xAxes[0].gridLines.color ="#999999";
        lineConfig.options.scales.yAxes[0].gridLines.color ="#999999";
    }

    var ctx = document.getElementById('doughnut-canvas').getContext('2d');
    window.myPie = new Chart(ctx, doughnutConfig);

    var ctx = document.getElementById('line-canvas').getContext('2d');
    window.myLine = new Chart(ctx, lineConfig);
}

function extractNames(data) {
    const names = [];
    for (let entry of data) {
        names.push(entry.name);
    }
    return names;
}

function extractValues(data) {
    const values = [];
    for (let entry of data) {
        values.push(entry.sum);
    }
    return values;
}