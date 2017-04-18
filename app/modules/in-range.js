var fs = require('fs');
var _ = require('lodash');
var tableify = require('tableify');
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/optionsdb';

function process() {
  var doc = 'prospect';
  MongoClient.connect(url, function (err, db) {
    var document = db.collection(doc);

    var rows = document.find({
    }, {
        '_id': 0,
        'symbol': 1,
        'last': 1,
        'adp_50': 1,
        'adp_100': 1,
        'adp_200': 1,
        'options.bid': 1,
        'options.ask': 1,
        'options.last': 1,
        'options.days_to_expiration': 1,
        'options.profit': 1,
        'options.strikeprice': 1,
        'options.imp_Volatility': 1,
        'options.issue_desc': 1,
        'options.vl': 1,
      }).toArray(function (err, data) {
        findInMoney(data, function (items) {
          var css = '<style>' + fs.readFileSync(__dirname + '/style.css') + '</style>';
          fs.writeFile('../in_money.html', css + tableify(items), 'utf8', function () {
            console.log('Created.');
          });
        })

        findOutOfMoney(data, function (items) {
          var css = '<style>' + fs.readFileSync(__dirname + '/style.css') + '</style>';
          fs.writeFile('../out_money.html', css + tableify(items), 'utf8', function () {
            console.log('Created.');
          });
        })

        db.close();
      });
  });
}

function findInMoney(items, callback) {
  var matched = [];
  var profit = 6;
  var days = 300;

  items.forEach(function (item) {
    var newItem = mainData(item);

    item.options.forEach(function (option) {
      if (item.last >= option.strikeprice
        && option.days_to_expiration <= days
        && option.profit >= profit) {

        newItem.options.push(keyData(option));
      }
    }, this);

    if (newItem.options && newItem.options.length > 0) {
      matched.push(newItem);
    }
  }, this);
  callback(matched);
}

function findOutOfMoney(items, callback) {
  var matched = [];
  var profit = 6;
  var days = 300;

  items.forEach(function (item) {
    var newItem = mainData(item);

    item.options.forEach(function (option) {
      if (item.last <= option.strikeprice
        && option.days_to_expiration <= days
        && option.bid >= profit) {

        newItem.options.push(keyData(option));
      }
    }, this);

    if (newItem.options && newItem.options.length > 0) {
      matched.push(newItem);
    }
  }, this);
  callback(matched);
}

function mainData(item) {
  return {
    symbol: item.symbol,
    adp_200: item.adp_200,
    adp_100: item.adp_100,
    adp_50: item.adp_50,
    avg: ((item.adp_50 + item.adp_100 + item.adp_200) / 3).toFixed(2),
    last: item.last,
    options: []
  };
}

function keyData(option) {
  return {
    strikeprice: option.strikeprice,
    days_to_expiration: option.days_to_expiration,
    issue_desc: option.issue_desc,
    bid: option.bid,
    last: option.last,
    ask: option.ask,
    profit: option.profit,
    actual_profit: option.bid,
    vl: option.vl,
    imp_Volatility: option.imp_Volatility,
  };
}

module.exports = {
  process: process
}