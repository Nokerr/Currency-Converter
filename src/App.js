import './App.css';
import { useEffect, useState } from 'react'


function App() {

  const [coursData, setData] = useState([])
  const [currValue, setCurrValue] = useState('usd')
  const [Uah, setUah] = useState('')
  const [cur, setCur] = useState('')

  useEffect(() => {

    (async () => {

      const response = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json")
      const exchange = await response.json()
      setData(rateOfExchange(exchange))

    })()

  }, [])

  useEffect(() => {

    setUah('')
    setCur('')

  }, [currValue])

  const rateOfExchange = (arr) => {

    let data = {
      usd: 0,
      gbp: 0,
      try: 0,
      pln: 0,
    }

    arr.forEach(item => {

      const currencyTitle = item.cc.toLowerCase()

      if (data[currencyTitle] === 0) {

        data[currencyTitle] = item.rate

      }

    });

    return data
  }

  const inputChange = (e) => {

    setUah(e.target.value)
    setCur((+e.target.value / coursData[currValue]).toFixed(2))

  }

  const outputChange = (e) => {

    setCur(e.target.value)
    setUah((+e.target.value * coursData[currValue]).toFixed(2))

  }


  return (

    <div className="app" >
      <div className="header">Exchange Rate</div>
      <div className="currency__name">
        <div>UAH</div>
        <div>{currValue.toUpperCase()}</div>
      </div>
      <div className="currency">
        <input
          className='counter uah'
          type="number"
          value={Uah}
          onInput={inputChange}
        />
        <input
          className='counter currency'
          type="number"
          value={cur}
          onInput={outputChange}
        />
      </div>
      <div className="controls">
        <button onClick={() => { setCurrValue('usd') }}>USD</button>
        <button onClick={() => { setCurrValue('gbp') }}>GBP</button>
        <button onClick={() => { setCurrValue('try') }}>TRY</button>
        <button onClick={() => { setCurrValue('pln') }}>PLN</button>
      </div>
    </div >
  )
}

export default App;
