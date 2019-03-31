const MongoDBClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbname = 'restaurant';
const url = 'mongodb://localhost:27017/';

MongoDBClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('connected correctly to the mongo-server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({ "name": "Vadonut", "description": "combination of urad dhall and spices" }, (err, result) => {
        assert.equal(err, null);

        console.log('After Insert');
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
            console.log('Found:\n');
            console.log(docs);

            db.dropCollection('dishes',(err,result) => {
                assert.equal(err,null);

                client.close();
            });

        });
    });


});