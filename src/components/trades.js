import React, { useState , useEffect } from 'react'
import * as moment from 'moment';
import {Line} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'
import {BASE_URI} from '../services';

defaults.global.defaultFontFamily = 'Oswald'
defaults.global.defaultFontColor = '#fff';

// var WebSocketClient = require('websocket').w3cwebsocket;


export default (props) =>  {

    const [tradeHistory, settradeHistory] = useState([])
    const [pairDetails, setpairDetails] = useState({})
    const [chartData, setchartData] = useState({})

    const symbol = props.match.params.id;

    useEffect(() => {
        fetchTrades();
        fetchDetails();
    },[tradeHistory])

    const fetchTrades = async () => {
            // console.log(moment(1554718424843).format('hh:mm:ss'));
            let tradesList = await fetch(`${BASE_URI}trades?symbol=${symbol}`)
            let json = await tradesList.json();
            settradeHistory(json.slice(0,10))
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
    }

    const fetchDetails = async () => {
        let tradeDetails = await fetch(`${BASE_URI}ticker/24hr?symbol=${symbol}`)
        let list = await tradeDetails.json();
        setpairDetails(list)
    }

    const fetchTradeHistory = (binanceWS) => {        
        /* binanceWS.onmessage = function(e) {
            let data = JSON.parse(e.data);
            data['price'] = data['p'];
            delete data['p'];
            // console.log(data,tradeHistory);
            let newData = [data, ...tradeHistory]           
            settradeHistory(newData);
        }; */
    }    

    const getTrades = () => {
        if(tradeHistory.length){
            return tradeHistory.map((trade,index) => {
                return <h1 key={index}>{trade['price']}</h1>
            })
        }
    }  
    
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
    <div className="trade-history-container">
            <div className="container">
                <div className="row mb-2">
                    <div className="offset-1 col-sm-10">
                        <div className="row">
                            <div className="col-sm-4 card">
                            <div className="card-box box-1">
                                <p>Price</p> 
                                <h1><b>{pairDetails.priceChange ? Number(pairDetails.priceChange).toFixed(6) : <img src="/images/loader.gif" width="80" alt="loader"/>}</b></h1>
                            </div> 
                            </div>
                            <div className="col-sm-4 card">
                                <div className="card-box box-2">
                                    <p>24h Price Change</p> 
                                    <h1><b>{pairDetails.askPrice ? Number(pairDetails.askPrice).toFixed(6)  : <img src="/images/loader.gif" width="80" alt="loader"/>}</b></h1>
                                </div> 
                            </div>
                            <div className="col-sm-4 card">
                                <div className="card-box box-3">
                                    <p>24hr Volume</p> 
                                    <h1><b>$ {pairDetails.volume ? Number(pairDetails.volume).toFixed(3)  : <img src="/images/loader.gif" width="80" alt="loader"/>}</b></h1>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-1 col-sm-10 line-chart">
                        <Line
                            data={chartData}
                            options={options}
                        />
                        </div>
                </div>
            </div>
        {/* {getTrades()} */}
    </div>
    )
}

