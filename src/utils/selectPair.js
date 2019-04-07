import React, {useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const MarketPairs = (props) => {
  const [age, setAge] = useState('');
  const [open, setOpen] = useState(false);

  function handleChange(event) {
    setAge(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  const pairList = () => {
    if(props.pairs){
        return props.pairs.slice(0,50).map((pair,index) => {
          return  <MenuItem key={index} value={pair.symbol}>{pair.symbol}</MenuItem>
        })
    } else {
      return <div>Loading...</div>
    }  
  }

  return (
    <div>
        <form autoComplete="off">
        <FormControl>
            <InputLabel htmlFor="demo-controlled-open-select">Select Pair</InputLabel>
            <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={age}
            onChange={handleChange}
            inputProps={{
                name: 'age',
                id: 'demo-controlled-open-select',
            }}
            >
            {pairList()}
            </Select>
        </FormControl>
        </form>
    </div>
  );
}

export default MarketPairs;
