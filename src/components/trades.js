import React, { useState , useEffect } from 'react'
import {BASE_URI} from '../services';
import TradeDetails from './tradeDetails';
import TradeHistoryChart from './tradeHistoryChart';

// var WebSocketClient = require('websocket').w3cwebsocket;


export default (props) =>  {

    const [tradeHistory, settradeHistory] = useState([])
    const [pairDetails, setpairDetails] = useState({})
    const symbol = props.match.params.id;

    useEffect(() => {
        fetchTrades();
        fetchDetails();
    },[tradeHistory])

    const fetchTrades = async () => {
        try {
            let tradesList = await fetch(`${BASE_URI}trades?symbol=${symbol}`)
            let json = await tradesList.json();
            if(json){
                settradeHistory(json.slice(0,10))            
            }
        } catch (e){
            console.log(e);
        }
    }

    const fetchDetails = async () => {
        try{
            let tradeDetails = await fetch(`${BASE_URI}ticker/24hr?symbol=${symbol}`)
            let list = await tradeDetails.json();
            if(list){
                setpairDetails(list)
            }
        } catch(e){
            console.log(e);
        }
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
    
    return (
            <div className="trade-history-container">
                    <div className="container">
                        <div className="row mb-2">
                            <TradeDetails tradeInfo={pairDetails} />
                        </div>
                    </div>
                    <div className="row">
                        {tradeHistory.length ? <TradeHistoryChart tradeHistory={tradeHistory}/> : null}
                    </div>
                {/* {getTrades()} */}
            </div>
    )
}

