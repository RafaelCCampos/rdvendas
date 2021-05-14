import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import api from 'services/api';
import { SaleSuccess } from 'types/sale';

const BarChart = () => {

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };
    
    type SeriesData = {
        name: string,
        data: number[],
    }

    type BarChart = {
        labels: {
            categories: string[],
        },
        series: SeriesData[],
    }

    const [ chartData, setChartData ] = useState<BarChart>({
        labels: {
            categories: [],
        },
        series: [
            {
                name: '',
                data: [],                  
            }
        ]
    })

    useEffect(() => {
        api.get('/sales/success-by-seller')
            .then(response => {
                const data: SaleSuccess[] = response.data
                const myLabels = data.map(x => x.sellerName)
                const mySeries = data.map(x => Number(((x.deals/x.visited)* 100).toFixed(2)))
                console.log('series', mySeries)
                setChartData({
                    labels: {
                        categories: myLabels,
                    },
                    series: [
                        {
                            name: '% Sucesso',
                            data: mySeries,                  
                        }
                    ],
                })
            })
        }, []
    );

    return (
        <Chart
            options={{...options, xaxis: chartData.labels}}
            series={chartData.series}
            type="bar"
            height="240"
        />
    )
}

export default BarChart;