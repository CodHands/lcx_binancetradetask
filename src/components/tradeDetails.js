import React from 'react'

const TradeDetails = ({tradeInfo}) => {
    return (
        <div className="offset-1 col-sm-10">
            <div className="row">
                <div className="col-sm-4 card">
                <div className="card-box box-1">
                    <p>Price</p> 
                    <h1><b>{tradeInfo.priceChange ? Number(tradeInfo.priceChange).toFixed(6) : <img src="/images/loader.gif" width="80" alt="loader"/>}</b></h1>
                </div> 
                </div>
                <div className="col-sm-4 card">
                    <div className="card-box box-2">
                        <p>24h Price Change</p> 
                        <h1><b>{tradeInfo.askPrice ? Number(tradeInfo.askPrice).toFixed(6)  : <img src="/images/loader.gif" width="80" alt="loader"/>}</b></h1>
                    </div> 
                </div>
                <div className="col-sm-4 card">
                    <div className="card-box box-3">
                        <p>24hr Volume</p> 
                        <h1><b>$ {tradeInfo.volume ? Number(tradeInfo.volume).toFixed(3)  : <img src="/images/loader.gif" width="80" alt="loader"/>}</b></h1>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default TradeDetails;
