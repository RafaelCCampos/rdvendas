import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import api from 'services/api';
import { SaleSum } from 'types/sale';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {
    const [chartData, setChartData ] = useState<ChartData>({
        labels: [''],
        series: [0],
    });

    useEffect(() => {
        api.get('/sales/sum-by-seller')
        .then(response => {
            const data: SaleSum[] = response.data
            const myLabels = data.map(x => x.sellerName)
            const mySeries = data.map(x => x.sum)

            setChartData({labels: myLabels, series: mySeries})
        })
    },[])

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{...options, labels: chartData.labels}}
            series={chartData.series}
            type="donut"
            height="240"
        />
    )
}

export default DonutChart;