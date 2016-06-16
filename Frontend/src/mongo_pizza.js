    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;
    var url = 'mongodb://localhost:27017/test';

    var insertDocument = function(db, callback) {
       db.collection('pizzas').insertOne( {
        id:1,
        icon:'assets/images/pizza_7.jpg',
        title: "Імпреза",
        type: "М'ясні",
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 99
        },
        big_size:{
            weight: 660,
            size: 40,
            price: 169
        },
        is_new:true,
        is_popular:true

    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the pizzas collection.");
        callback();
      });
    };
    var findPizzas = function(db, callback) {
       var cursor =db.collection('pizzas').find().sort( { title: "Імпреза",type: "М'ясні", } );

       cursor.each(function(err, doc) {
          assert.equal(err, null);
          if (doc != null) {
             console.dir(doc);
          } else {
             callback();
          }
       });
    };
    var updatePizzas = function(db, callback) {
   db.collection('pizzas').updateMany(
      { is_new:true,is_popular:true },
      {
        $set: { cuisine: "Category To Be Determined" },
        $currentDate: { "lastModified": true }
      }
      ,
      function(err, results) {
        console.log(results);
        callback();
   });
        
    };
        var aggregatePizzas = function(db, callback) {
   db.collection('pizzas').aggregate(
     [
       { $group: {  "type": "М'ясні", "count": { $sum: 1 } } }
     ]).toArray(function(err, result) {
     assert.equal(err, null);
     console.log(result);
     callback(result);
   });
};
        
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});