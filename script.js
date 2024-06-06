require("dotenv").config();
const ccxt = require("ccxt");

/**
 * ORIGINAL URL: https://pro-api.coingecko.com/api/v3/coins/{id}/market_chart
 * for free tier version you have to remove 'pro-'
 */

const id = "solana";

const apiUrlHist = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&interval=daily&days=7&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`;
const apiUrlPrice = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`;

// CREATE ORDER priviliges, quite granular similar to AWS
const exchange = new ccxt.binance({
  apiKey: process.env.BINANCE_API_KEY,
  secret: process.env.BINANCE_API_SECRET,
});
const symbol = "SOL/USD";
const type = "limit";
const side = "buy";
const amount = 5;

const run = async () => {
  let res, resJson;
  res = await fetch(apiUrlHist, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  resJson = await res.json();
  console.log(resJson);
  resJson.prices.pop();
  const average =
    resJson.prices.reduce((sum, el) => sum + el[1], 0) / resJson.prices.length;

  res = await fetch(apiUrlPrice, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  resJson = await res.json();
  const currentPrice = resJson.solana.usd;
  console.log("CUR: ", currentPrice);

  if (currentPrice > average) {
    // buy above 2% of the current price
    const limitPrice = currentPrice & 1.02; // BITWISE AND
    /*
        We create an order where we "protect the money" in case the price is lower than expected.
        Otherwise, we are going to sell it trying to get 30% of profit.
    */
    const params = {
      stopLoss: {
        triggerPrice: currentPrice * 0.9,
      },
      takeProfit: {
        triggerPrice: currentPrice * 1.3,
      },
    };

    const order = await exchange.createOrder(
      symbol,
      type,
      side,
      amount,
      limitPrice,
      params
    );
    console.log(
      `Buy order created. ${amount} ${symbol} - Limit @ ${limitPrice} - Take profit @ ${params.takeProfit} - Stop loss @ ${params.stopLoss}`
    );
    console.log(order);
  }
};

const init = setInterval(run, 86400 * 1000); // every day

init();
