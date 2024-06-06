require("dotenv").config();
const fs = require("fs");
const readline = require("readline");

// After finishing coding, test changing those parameters to get better numbers / percentajes
const TAKEPROFIT = 1.3; // 1.6 // 1.9
const STOPLOSS = 0.9; // 0.8 // 0.7
//const FEES = (bidAskSpread + slippage + tradingFee)
const FEES = (0.005 + 0.001) * 2; // 1.2%

const openOrders = {};
const closedOrders = [];
const pnl = [];

const calculatePnl = (currentPrice) => {
  let openOrdersArr = Object.values(openOrders);

  openOrdersArr = openOrdersArr.map((order) => ({
    ...order,
    pnl: currentPrice / order.buy - 1 - FEES,
  }));

  const allOrders = [...openOrdersArr, ...closedOrders];

  if (allOrders.length === 0) return 0;

  return (
    allOrders.reduce((acc, order) => acc + order.pnl, 0) / allOrders.length
  );
};

const run = async () => {
  const file = readline.createInterface({
    input: fs.createReadStream("prices.csv"),
    output: process.stdout,
    terminal: false,
  });

  let lineNumber = 0,
    firstPrice,
    lastPrice;

  file.on("line", (line) => {
    let [date, price, movingAvg] = line.split(",");

    price = parseFloat(price);
    movingAvg = parseFloat(movingAvg);

    if (lineNumber === 0) {
      lineNumber++;
      return;
    }

    if (lineNumber === 1) {
      firstPrice = price;
    }

    if (lineNumber > 7) {
      if (price > movingAvg) {
        openOrders[date] = {
          buy: price,
          takeProfit: price * TAKEPROFIT,
          stopLoss: price * STOPLOSS,
        };
      }
      const openOrdersArr = Object.values(openOrders);
      openOrdersArr.forEach((order) => {
        if (price >= order.takeProfit) {
          delete openOrders[openOrders.date];
          closedOrders.push({
            ...order,
            pnl: order.takeProfit / order.buy - 1 - FEES,
          });
        }

        if (price <= order.stopLoss) {
          delete openOrders[order.date];
          closedOrders.push({
            ...order,
            pnl: order.stopLoss / order.buy - 1 - FEES,
          });
        }
      });
    }
    // pnl (how much money we gain or we lost with the bot)
    pnl.push([date, calculatePnl(price)]);

    lastPrice = price;
    lineNumber++;
  });

  file.on("close", () => {
    fs.appendFileSync("pnl.csv", "date, pnl\n");
    pnl.forEach((data) => {
      fs.appendFileSync(
        "pnl.csv",
        `${data[0].toString()},${data[1].toString()}\n`
      );
    });
    console.log(
      `PnL long position: ${((lastPrice / firstPrice - 1) * 100).toFixed(2)}%`
    );
    console.log(
      `PnL trading bot: ${(pnl[pnl.length - 1][1] * 100).toFixed(2)}%`
    );
  });
};

run();

/**
 * TODO: Read more about parameters of trading bot in order to see if it is good or not.
 *
 * Other parameters to measure risk:
 *  - Max drawdown: maximum loss (the minimum of the long position of all your days)
 *  - Stdev (stand out deviation): stdev formula excel for instance
 *  - Volatility: sqrt(number of days) * Stdev (our last parameter)
 *  - Sharpe Ratio (how much return you will get per unit of risk): (last PnL long position - 0.053(5.3%)) / Stdev // this result between 1 and 2 is OK, above 2 is BETTER
 */
