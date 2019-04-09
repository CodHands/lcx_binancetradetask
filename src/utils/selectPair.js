import React from 'react';

const MarketPairs = (props) => {

  const handleChange = (symbol) => {
    props.props.history.push(`/trades/${symbol}`);    
  }

  const pairList = () => {
    if(props.pairs){
        return props.pairs.slice(0,60).map((pair,index) => {
          return <div className="col-sm-2" onClick={() => handleChange(pair.symbol)} key={index}>
                    <div className="card mb-2">
                        <h6><img src="/images/blockchain.png" width="16" alt="crypto-icon"/>&nbsp;&nbsp;{pair.baseAsset}/{pair.quoteAsset}</h6>
                    </div>
                  </div>
        })
    } else {
      return <div>Loading...</div>
    }  
  }

  return (
    <div>
      <h1 className="mb-4">Choose Pair</h1>
      <div className="row tickers">
        {pairList()}
      </div>
    </div>
  );
}

export default MarketPairs;
