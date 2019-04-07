import React, {useState, useEffect } from 'react';
import MarketPairs from '../utils/selectPair';

const Pairs = () => {
    
useEffect(() => {
    fetchPairList();
},[]);

const [pairs, setPairs] = useState([])

const fetchPairList = async() => {
    let response = await fetch('https://www.binance.com/api/v1/ticker/allPrices');
    let list = await response.json()
    setPairs(list)
    console.log(list);
}

return (
    <div className="pairs text-center">
        <MarketPairs pairs={pairs}/>
    </div>
);
}

export default Pairs;
