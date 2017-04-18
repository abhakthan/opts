var crud = require('./base-crud');
var docName = 'quotes-options';

function select(callback) {
  crud.select(docName, callback);
}

function insert(json, callback) {
  crud.insert(docName, json, callback);
}

module.exports = {
  insert: insert,
  select: select
}