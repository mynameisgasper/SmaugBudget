/**
 * https://www.chartjs.org/docs/latest/
 */

var doughnutConfig = {
    type: 'doughnut',
    data: {
        datasets: [{
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
        },
    }
};

function getBackgroundColors(length) {
    var colors = [];

    var current1 = 255;
    var current2 = 200;
    var current3 = 200;
    for (var i = 0; i < length; i++) {
        colors.push("rgb(" + current1 + ", " + current2 + "," + current3 + ")");

        if (current1 < 100) {
            if (current2 < 100) {
                if (current3 < 100) {
                    current1 = 255;
                    current2 = 200;
                    current3 = 200;
                } else {
                    current3 -= 100;
                }
            } else {
                current2 -= 100;
            }
        } else {
            current1 -= 100;
        }
    }

    return colors;
}

function loadGraphs(categories, values, colors) {
    doughnutConfig.data.labels = categories;
    console.log(values);
    console.log(categories);
    console.log(colors);
    doughnutConfig.data.datasets[0].data = values;
    doughnutConfig.data.datasets[0].backgroundColor = colors;

    if (!darkMode.isSet) {
        doughnutConfig.data.datasets[0].borderColor = "#ffffff";
        doughnutConfig.options.legend.labels.fontColor = "#666";
    } else {
        doughnutConfig.data.datasets[0].borderColor = "#2b2b2b";
        doughnutConfig.options.legend.labels.fontColor = "#ffffff";
    }

    var ctx = document.getElementById('doughnut-canvas').getContext('2d');
    window.myPie = new Chart(ctx, doughnutConfig);

}