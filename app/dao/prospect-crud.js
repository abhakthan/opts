var crud = require('./base-crud');
var docName = 'prospect';

function select(callback) {
  crud.select(docName, callback);
}

function selectById(id, callback) {
  crud.selectById(docName, id, callback);
}

function selectWithFields(doc, callback) {
  crud.selectWithFields(doc, {
    _id: 0,
    symbol: 1,
    last: 1,
    adp_50: 1,
    adp_100: 1,
    adp_200: 1,
    datetime: 1,
    name: 1,
    'options.ask': 1,
    'options.bid': 1,
    'options.days_to_expiration': 1,
    'options.issue_desc': 1,
    'options.last': 1,
    'options.strikeprice': 1,
    'options.xday': 1,
    'options.xmonth': 1,
    'options.xyear': 1,
    'options.xdate': 1,
    'options.vl': 1,
    'option.pvol': 1,
    'option.incr_vl': 1,
    'option.vwap': 1,
    'options.imp_Volatility': 1,
    'options.idelta': 1,
    'options.igamma': 1,
    'options.itheta': 1,
    'options.ivega': 1
  }, callback);
}

function insertMany(json, callback) {
  crud.insertMany(docName, json, callback);
}

function insertFrom(doc, callback) {
  selectWithFields(doc, function (error, json) {
    crud.insertMany(docName, json, callback);
  });
}

function save(json, callback) {
  crud.save(docName, json, callback);
}

module.exports = {
  insertFrom: insertFrom,
  select: select,
  selectById: selectById,
  save: save
}