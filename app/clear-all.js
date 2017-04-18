var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/optionsdb';

function allClear(doc) {
  MongoClient.connect(url, function (err, db) {
    var document = db.collection(doc);
    document.remove();
    document.find({}, { _id: 1 }).toArray(function (err, items) {
      console.log(items.length);
      db.close();
    });
  });
}

allClear('prospect');
allClear('quotes-options');