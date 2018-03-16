var express = require('express');
var socket = require('socket.io');
var mongodb = require('mongodb');
const bodyParser = require('body-parser');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// server node 
server = app.listen(8080, function(){
    console.log('Server NODE is running on port 8080')
});

// connect to a mongodb server.
const MongoClient = mongodb.MongoClient;

const defaultMaps = [
    { lat: 15.9910177, lng: 108.1443488 , title :' Nhà cho thuê' , price : '1.500.000' },
    { lat: 15.9710189, lng: 108.2293462 , title :' Nhà Nguyên Căn' , price : '3.000.000'},
    { lat: 15.9710122, lng: 108.2413461 , title :' Nhà Trọ Chung Chủ' , price : '4.500.000'},
    { lat: 15.9720182, lng: 108.2453463 , title :' Nhà cấp 4' , price : '2.500.000'},
    { lat: 15.9730185, lng: 108.2433464 , title :' Phòng Nữ ở Ghép' , price : '1.100.000'},
    { lat: 15.9714188, lng: 108.2423462 , title :' Cho thuê Nhà Trọ' , price : '1.300.000'},
    { lat: 15.9716182, lng: 108.2413463 , title :' Nhà Hai Lầu' , price : '1.400.000'},
    { lat: 15.9718189, lng: 108.2495663 , title :' Phòng Trọ Trẻ em' , price : '1.000.000'}
]

var url = 'mongodb://localhost/mapsdb';

MongoClient.connect(url, function (err,database) {
  const db = database.db('mapsdb')
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', 'please start MongoDB first');
  } else {
    console.log('KET NOI MongoDB Thành Công at', url);
    // do some work here with the database.
    var collection = db.collection('maps');
    collection.remove({});
    collection.insert(defaultMaps);
    collection.find().toArray(function (err, result) {
        if (err) {
          console.log(err);
        } else if (result.length) {
          console.log('SETUP MongoDB THÀNH CÔNG!');
        } else {
          console.log('No document(s) found with defined "find" criteria!');
        }
    });
    //Close connection
    database.close();
  }
});

// API GET DATA 
app.get('/', function (req, res) {
    res.send('Phong Trọ Server node running 1')
})
app.get('/maps', function (req, res) {
    MongoClient.connect(url, function (err,database) {
        const db = database.db('mapsdb')
        if (err) {
          console.log('Không kết nối được tới server mongo . Error:', 'please start MongoDB first');
        } else {
          console.log('connecting to MongoDB!')
          var collection = db.collection('maps');
          collection.find().toArray(function (err, result) {
              if (err) {
                console.log(err);
              } else if (result.length) {
                console.log('GET DATA maps MongoDB THÀNH CÔNG!');
              } else {
                console.log('No document(s) found with defined "find" criteria!');
              }
              // send renponse data maps
              res.send(result)
          });
          //Close connection
          database.close();
        }
      });
   
})
app.post('/postitem', function (req, res) {
    MongoClient.connect(url, function (err,database) {
        const db = database.db('mapsdb')
        if (err) {
          console.log('Không kết nối được tới server mongo . Error:', 'please start MongoDB first');
        } else {
          console.log('connecting to MongoDB!')
          var collection = db.collection('maps');
          var lat = parseFloat(req.body.lat);
          var lng = parseFloat(req.body.lng);

          var item = {lat: lat, lng: lng, title: req.body.title, price: req.body.price}
          collection.insertOne(item, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
          });
          //Close connection
          database.close();
        }
      });
    res.send('no permistion')
})

// chat realtime node js
io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});