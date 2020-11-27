/**
 * https://www.chartjs.org/docs/latest/
 */

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
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        legend: {
            labels: {
                fontColor: '#666'
            }
        }
    }
};

function loadGraphs(categories, values) {

    doughnutConfig.data.labels = categories;
    doughnutConfig.data.datasets[0].data = values;

    if (!darkMode.isSet) {
        doughnutConfig.data.datasets[0].borderColor = "#ffffff";
        doughnutConfig.options.legend.labels.fontColor ="#666";
    }
    else {
        doughnutConfig.data.datasets[0].borderColor = "#2b2b2b";
        doughnutConfig.options.legend.labels.fontColor ="#ffffff";
    }

    var ctx = document.getElementById('doughnut-canvas').getContext('2d');
    window.myPie = new Chart(ctx, doughnutConfig);

}