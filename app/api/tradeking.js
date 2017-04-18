var OAuth = require('oauth').OAuth;
var config = require('./config.json');

// var tradeking_consumer = new oauth.OAuth(
//   "https://developers.tradeking.com/oauth/request_token",
//   "https://developers.tradeking.com/oauth/access_token",
//   config.consumer_key,
//   config.consumer_secret,
//   "1.0",
//   "http://mywebsite.com/tradeking/callback",
//   "HMAC-SHA1");

function callRestService(url, callback) {
  var oa = new OAuth(null, null, config.consumer_key, config.consumer_secret, "1.0", null, "HMAC-SHA1");

  oa.get(url, config.access_token, config.access_secret,
    function (error, data, response) {
      if (error) {
        console.log(error);
      }
      callback(error, JSON.parse(data));
    }
  );
}

function getQuotes(symbol, callback) {
  var url = config.api_url + '/market/ext/quotes.json?symbols=' + symbol;

  callRestService(url, function (error, data) {
    callback(error, data);
  });
}

function getOptions(symbol, callback) {
  var url = config.api_url + '/market/options/search.json?symbol=' + symbol + '&query=xyear-eq:2017ANDxmonth-gt:04ANDput_call-eq:call';

  callRestService(url, function (error, data) {
    callback(error, data);
  });
}

module.exports = {
  getQuotes: getQuotes,
  getOptions: getOptions
}