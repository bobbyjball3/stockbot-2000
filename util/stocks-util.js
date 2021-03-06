'ues strict'
const request = require('request-promise-native')

async function getStockPrice(stockSymbol = '') {
  try {
    
    let url = `https://finance.google.com/finance?q=NASDAQ:${stockSymbol}&output=json`
    let stockDataString = await request(url)
    // Google includes a double forward-slash on their JSON, so we need to strip it before parsing
    let stockData = JSON.parse(stockDataString.substring(3))[0]
    let tradingPrice = `${stockData.l}USD`
    let companyName = stockData.name
    
    return { tradingPrice, companyName }

  } catch (err) {
    
    let message = `Unable to retrieve stock data for symbol ${stockSymbol}`
    let error = new Error(message)
    error.stack += '\ncausedBy:\n'+err.stack
    
    throw error
  
  }
}

module.exports = getStockPrice