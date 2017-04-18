var tickers = require('./tickers.json');
var restApi = require('../api/tradeking');
var qoDao = require('../dao/quotes-options-crud');

function loop(array, position) {
  var ticker = array[position];

  console.log(position + ': ' + ticker);

  if (ticker) {
    restApi.getQuotes(ticker, function (er, data) {
      if (er) {
        console.log(ticker + ': ' + er);
        setTimeout(function () {
          loop(array, ++position);
        }, 1000);
      } else {
        if (Number(data.response.quotes.quote.last) < 50) {
          restApi.getOptions(ticker, function (err, items) {
            if (err) {
              console.log(ticker + ': ' + err);
              setTimeout(function () {
                loop(array, ++position);
              }, 1000);
            } else {
              if (items.response.quotes.quote.length > 0) {
                var json = data.response.quotes.quote;
                json.options = items.response.quotes.quote;
                qoDao.insert(json, function (error, rs) {
                  if (error) {
                    console.log(ticker + ': ' + error);
                  }
                  console.log(ticker);
                  setTimeout(function () {
                    loop(array, ++position);
                  }, 1000);
                });
              } else {
                setTimeout(function () {
                  loop(array, ++position);
                }, 1000);
              }
            }
          });
        } else {
          setTimeout(function () {
            loop(array, ++position);
          }, 1000);
        }
      }
    });
  }
}

function fromFile() {
  loop(tickers.slice(0, 2100), 0);
}

module.exports = {
  fromFile: fromFile
}