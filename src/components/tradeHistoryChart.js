import React, { useState , useEffect } from 'react'
import {Line} from 'react-chartjs-2';
import * as moment from 'moment';
import { defaults } from 'react-chartjs-2'

defaults.global.defaultFontFamily = 'Oswald'
defaults.global.defaultFontColor = '#fff';

export default ({tradeHistory}) => {

    const [chartData, setchartData] = useState({})
    const [isChart, setisChart] = useState(false)

    useEffect(() => {
        setchartData({
            labels: tradeHistory.map((t) => moment(t.time).format('hh:mm:ss')),
            datasets: [
                {
                    label: 'Price',
                    data: tradeHistory.map((p) => p.price),
                    borderColor: '#5dcdfa',
                    backgroundColor: 'transparent',
                    pointBorderColor: '#5dcdfa'
                },
                {
                    label: 'Quantity',
                    data: tradeHistory.map((q) => q.qty),
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

    const changeView = () => {
        setisChart(!isChart)
    }

  return (
    <div className="offset-1 col-sm-10 line-chart">
        <div className="set-view">
            <p onClick={changeView}>{ isChart ? <img src="/images/line-chart.png" title="View in Chart" alt="chart-icon"/>  : <img src="/images/list.png" title="View in Table" alt="table-icon"/> }</p>
        </div>
        {
            isChart ? 
            <div>
                
                <table className="table table-dark table-striped">
                    <thead>
                    <tr>
                        <th>Price</th>
                        <th>Quanity</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                        {tradeHistory.map((trade,index) => {
                            return <tr key={index}>
                                        <td>{trade.price}</td>
                                        <td>{trade.qty}</td>
                                        <td>{moment(trade.time).format('hh:mm:ss')}</td>
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>
            : 
            <Line
                data={chartData}
                options={options}
            />
        }        
    </div>
  )
}
