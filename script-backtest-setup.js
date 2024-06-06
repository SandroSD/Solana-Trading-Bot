require("dotenv").config();
const fs = require("fs");

const id = "solana";
const apiUrlHist = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&interval=daily&days=365&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`;

const run = async () => {
  let res, resJson;

  res = await fetch(apiUrlHist, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  resJson = await res.json();
  fs.appendFileSync("prices.csv", "date, price, 7-days moving avg\n");
  resJson.prices.forEach((data, i) => {
    let average = "N/A";
    if (i > 6) {
      let sum = 0;
      for (let j = 1; j < 8; j++) {
        // back in time 7 days before
        sum += resJson.prices[i - j][1];
      }
      average = sum / 7;
    }
    fs.appendFileSync(
      "prices.csv",
      `${data[0].toString()}, ${data[1].toString()}, ${average.toString()}\n`
    );
  });
};

run();
