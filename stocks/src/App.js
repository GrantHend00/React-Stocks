import React from 'react'

function getStockPrice(ticker) {
  return fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=btc13ff48v6p15lfp93g`)
    .then((res) => res.json())
    .then((data) => {
      return data.c
    })
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ticker: '',
      price: '',
      loading: null
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      ticker: e.target.value.toUpperCase()
    })
    console.log(this.state.ticker)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit: ' + getStockPrice(this.state.ticker))
    this.setState({
      loading: true,
    })
    getStockPrice(this.state.ticker).then(price => this.setState({
      price: price,
      loading: false
    }))
  }

  render() {
    if(this.state.loading === null) {
      return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" placeholder="Stock Ticker" />
          <button type="submit">Get Price</button>
          </form>
        </React.Fragment>
      )
    }
    if(this.state.loading === true) {
      return <div>Loading...</div>
    }
    if(this.state.loading === false) {
      return <div>The stock price for {this.state.ticker} is:  ${this.state.price.toFixed(2)}</div>
    }
  }
}