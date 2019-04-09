import React, {useState, useEffect } from 'react';
import MarketPairs from '../utils/selectPair';
import {BASE_URI} from '../services';

const Pairs = (props) => {
    
useEffect(() => {
    fetchPairList();
},[]);

const [pairs, setPairs] = useState([])

const fetchPairList = async() => {
    let response = await fetch(`${BASE_URI}exchangeInfo`)
    let list = await response.json()        
    setPairs(list.symbols)
}

return (
    <div className="pairs text-center">
        <MarketPairs pairs={pairs} props={props}/>
    </div>
);
}

export default Pairs;
