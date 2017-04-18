var prospectDao = require('../dao/prospect-crud');

function profit(price, strike, bid, last) {
  if (price < strike && bid > 1.0) {
    return bid;
  } else if (price >= strike) {
    return strike + bid - price;
  } else {
    return strike + last - price;
  }
}

function loop(ids, position) {
  var id = ids[position];
  console.log(id);

  if (id) {
    prospectDao.selectById(id, function (error, row) {
      row.adp_100 = Number(row.adp_100);
      row.adp_200 = Number(row.adp_200);
      row.adp_50 = Number(row.adp_50);
      row.last = Number(row.last);

      for (var i = 0; i < row.options.length; i++) {
        var option = row.options[i];

        option.ask = Number(option.ask);
        option.bid = Number(option.bid);
        option.days_to_expiration = Number(option.days_to_expiration);
        option.last = Number(option.last);
        option.strikeprice = Number(option.strikeprice);
        option.xday = Number(option.xday);
        option.xmonth = Number(option.xmonth);
        option.xyear = Number(option.xyear);
        option.imp_Volatility = Number(option.imp_Volatility);
        option.idelta = Number(option.idelta);
        option.igamma = Number(option.igamma);
        option.itheta = Number(option.itheta);
        option.ivega = Number(option.ivega);

        option.profit = Number(profit(row.last, option.strikeprice, option.bid, option.last).toFixed(2));
      }

      prospectDao.save(row, function (err, rs) {
        loop(ids, ++position);
      });
    })
  }
}

function start() {
  prospectDao.insertFrom('quotes-options', function (error, rs) {
    loop(rs.insertedIds, 0);
  });
}

module.exports = {
  start: start
}