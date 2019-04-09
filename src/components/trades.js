import React, { useState , useEffect } from 'react'
import {BASE_URI} from '../services';
import TradeDetails from './tradeDetails';
import TradeHistoryChart from './tradeHistoryChart';

let WebSocketClient = require('websocket').w3cwebsocket;


export default (props) =>  {
    const isMounted = React.useRef(true)
    const [tradeHistory, settradeHistory] = useState([])
    const [pairDetails, setpairDetails] = useState({})
    const symbol = props.match.params.id;

    useEffect(() => {
        isMounted.current = true;
        fetchTrades();
        fetchDetails();
        new WebSocketClient(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`)
        return () => {
            isMounted.current = false;
        }
    },[tradeHistory])

    const fetchTrades = async () => {
        try {
            let tradesList = await fetch(`${BASE_URI}trades?symbol=${symbol}`)
            let json = await tradesList.json();
            if(json.length &&  isMounted.current){
                settradeHistory(json.slice(0,10))            
            }
        } catch (e){
            throw e
        }
    }

    const fetchDetails = async () => {
        try{
            let tradeDetails = await fetch(`${BASE_URI}ticker/24hr?symbol=${symbol}`)
            let list = await tradeDetails.json();
            if(list && isMounted.current){
                setpairDetails(list)
            }
        } catch(e){
            throw e
        }
    } 
    
    return (
            <div className="trade-history-container">
                    <div className="row mb-2">
                        <TradeDetails tradeInfo={pairDetails} />
                    </div>
                    <div className="row">
                        {tradeHistory.length ? <TradeHistoryChart tradeHistory={tradeHistory}/> : null}
                    </div>
                {/* {getTrades()} */}
            </div>
    )
}

