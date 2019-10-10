import $ = require('jquery');
import Chart from './Chart';

const chart = new Chart(),
    id = Math.random() * 1000,
    name = `id#${id}`;

$('body').append(chart.run(name));
