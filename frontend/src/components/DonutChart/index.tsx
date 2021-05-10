import Chart from 'react-apexcharts';
import api from 'services/api';
import { SaleSum } from 'types/sale';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    api.get('/sales/sum-by-seller')
        .then(response => {
            const data: SaleSum[] = response.data
            const myLabels = data.map(x => x.sellerName)
            const mySeries = data.map(x => x.sum)

            const chartData = {labels: myLabels, series: mySeries}
            console.log(chartData);
        })

    const mockData = {
        series: [477138, 499928, 444867, 220426, 473088],
        labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    }
    
    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{...options, labels: mockData.labels}}
            series={mockData.series}
            type="donut"
            height="240"
        />
    )
}

export default DonutChart;