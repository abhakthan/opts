var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/optionsdb';

function select(doc, callback) {
  MongoClient.connect(url, function (err, db) {
    var document = db.collection(doc);
    document.find({}).toArray(function (error, items) {
      db.close();
      callback(error, items);
    });
  });
}

function selectById(doc, id, callback) {
  MongoClient.connect(url, function (err, db) {
    var document = db.collection(doc);
    document.findOne({ _id: ObjectId(id) }, function (error, items) {
      db.close();
      callback(error, items);
    });
  });
}

function selectWithFields(doc, fields, callback) {
  MongoClient.connect(url, function (err, db) {
    var document = db.collection(doc);
    document.find({}, fields).toArray(function (error, items) {
      db.close();
      callback(error, items);
    });
  });
}

function selectAndSort(doc, param, callback) {
  MongoClient.connect(url, function (err, db) {
    var document = db.collection(doc);
    document.find({}).sort(param).toArray(function (error, items) {
      db.close();
      callback(error, items);
    });
  });
}

function insert(doc, json, callback) {
  MongoClient.connect(url, function (err, db) {
    var document = db.collection(doc);

    document.insert(json, function (er, rs) {
      if (er) {
        console.log(er);
      }
      db.close();
      callback(er, rs);
    });
  });
}

function insertMany(doc, json, callback) {
  MongoClient.connect(url, function (err, db) {
    var document = db.collection(doc);

    document.insertMany(json, function (er, rs) {
      if (er) {
        console.log(er);
      }
      db.close();
      callback(er, rs);
    });
  });
}

function save(doc, json, callback) {
  MongoClient.connect(url, function (err, db) {
    var document = db.collection(doc);

    document.save(json, function (er, rs) {
      if (er) {
        console.log(er);
      }
      db.close();
      callback(er, rs);
    });
  });
}

function update(doc, json, callback) {
  MongoClient.connect(url, function (err, db) {
    var document = db.collection(doc);

    document.update({
      symbol: { $eq: json.symbol }
    }, json, {
        upsert: true
      });
    db.close();
    callback();
  });
}

module.exports = {
  insert: insert,
  insertMany: insertMany,
  update: update,
  save: save,
  select: select,
  selectById: selectById,
  selectAndSort: selectAndSort,
  selectWithFields: selectWithFields
}