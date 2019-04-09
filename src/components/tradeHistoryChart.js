import React, { useState , useEffect } from 'react'
import {Line} from 'react-chartjs-2';
import * as moment from 'moment';
import { defaults } from 'react-chartjs-2'

defaults.global.defaultFontFamily = 'Oswald'
defaults.global.defaultFontColor = '#fff';

export default ({tradeHistory}) => {

    const [chartData, setchartData] = useState({})

    useEffect(() => {
        
        let dataLabels = tradeHistory.map((t) => moment(t.time).format('hh:mm:ss'))
        let priceData = tradeHistory.map((p) => p.price);
        let quantityData = tradeHistory.map((q) => q.qty);

        setchartData({
            labels: dataLabels,
            datasets: [
                {
                    label: 'Price',
                    data: priceData,
                    borderColor: '#5dcdfa',
                    backgroundColor: 'transparent',
                    pointBorderColor: '#5dcdfa'
                },
                {
                    label: 'Quantity',
                    data: quantityData,
                    borderColor: '#b2f1fc',
                    backgroundColor: 'transparent',
                    pointBorderColor: '#b2f1fc'
                }
            ]
        })
    }, [tradeHistory])

    const options = {
        title:{
            display:true,
            fontSize:36,
            text: 'Trade History'
        },
        legend:{
            display: true,
            position: 'top',
            fontSize: 25
        },
        scales: {
            xAxes: [{gridLines: { color: "#165e57", lineWidth:  2 }}],
            yAxes: [{gridLines: { color: "#165e57",  lineWidth:  2 }}]
        }
    }

  return (
    <div className="offset-1 col-sm-10 line-chart">
        <Line
            data={chartData}
            options={options}
        />
    </div>
  )
}
