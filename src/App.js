import React, { useState, useEffect, useRef, Component } from 'react';
import './App.css';
import Select from "react-dropdown-select";
import styles from './App.module.scss'


function App() {

  const inputRef = useRef(null);
  const [result, setResult] = React.useState('')
  const [toEur, setEur] = React.useState(0.25);
  const [toUsd, setUsd] = React.useState(0.22);
  const [toUah, setUah] = React.useState(8.27);
  const [toPln, setPln] = React.useState(1)

  const [firstCurrency, setFirstCurrency] = React.useState(0)
  const [secondCurrency, setSecondCurrency] = React.useState(0);
  

  const options = [
    { 
      value: toEur,
      label: "EUR"
    },
    {
      value:  toUsd,
      label: "USD"
    },
     {
       value: toPln,
       label: "PLN"
     },
    {
      value: toUah,
      label: 'UAH'
    }

  ];

 

  function Request() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "sBJsC5v5LT5IZ9m7Bu6CLCN85yCsuH1s");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch("https://api.apilayer.com/fixer/latest?symbols=EUR%2CUSD%2CUAH&base=PLN", requestOptions)
      .then(response => response.json())
      .then(result => {
        setEur(result.rates.EUR)
        setUsd(result.rates.USD)
        setUah(result.rates.UAH)
        setPln(1)

      })
      .catch(error => console.log('error', error));
  }

  const switchValues = () =>{
    inputRef.current.value = result;
    exchange()
  }

const exchange = () =>{
  let value = inputRef.current.value;
  var res = 0
  switch (firstCurrency[0].label){
    case "PLN": switch (secondCurrency[0].label){
                  case "PLN":
                    res = value * toPln;
                    break;
                  case "EUR":
                    res = value * toEur;
                    break;
                  case "USD":
                    res = value * toUsd;
                    break;
                  case "UAH":
                    res = value * toUah;
                    break;
                 }
    break;
    case "EUR": switch (secondCurrency[0].label){
                  case "PLN":
                    res = value / toEur;
                    break;
                  case "EUR":
                    res = value;
                    break;
                  case "USD":
                    res =  (value / toEur) * toUsd;
                    break;
                  case "UAH":
                    res = (value / toEur) * toUah;
                    break;
                  }
    break;
    case "USD": switch (secondCurrency[0].label){
                  case "PLN":
                    res = value / toUsd;
                    break;
                  case "EUR":
                    res = (value / toUsd) * toEur;
                    break;
                  case "USD":
                    res =  value;
                    break;
                  case "UAH":
                    res = (value / toUsd) * toUah;
                    break;
                  }
    break;
    case "UAH": switch (secondCurrency[0].label){
                  case "PLN":
                    res = value / toUah;
                    break;
                  case "EUR":
                    res = (value / toUah) * toEur;
                    break;
                  case "USD":
                    res =  (value / toUah) * toUsd;
                    break;
                  case "UAH":
                    res = value;
                    break;
                  }
    break;

    
    
  }
  
  setResult(res)
}

function changeFirst (value) {
  
  
  
}


  return (
    <div   
  
    className="App">
      <h3 className={styles.parent}> EUR: {toEur} USD: {toUsd} UAH: {toUah}</h3>
      <div className={styles.main}>
        <div className={"inline-block w-60 p-3"}>
            <Select options={options} 
                    className={styles.selector}
                    searchable={false}
                    placeholder="First currency"
                    onChange={(value) => {setFirstCurrency(value)}}/>
        </div>  
        <div className='inline-block w-60'>
            <Select options={options} 
                    className={styles.selector}
                    searchable={false}
                    placeholder="Second currency"
                    onChange={(value) => {setSecondCurrency(value)}}  />
        </div>     
      </div>
          
        <div className={styles.main}>
          <input className={styles.input} type="number" onChange={exchange} placeholder="Amount" ref={inputRef}></input>
        
          <button className={styles.butt} onClick={switchValues}>↻</button>

          <input className={styles.input} value={result} placeholder='Result' readOnly></input>
        </div>    
      
      
      
      

      
    </div>
  );
}

export default App;



//sBJsC5v5LT5IZ9m7Bu6CLCN85yCsuH1s