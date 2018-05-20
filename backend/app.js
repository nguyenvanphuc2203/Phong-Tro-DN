var express = require('express');
var socket = require('socket.io');
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
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
    { 
      lat: 15.9910177, 
      lng: 108.1443488 , 
      title :' Nhà cho thuê' , 
      price : '1.500.000',
      phone: "0989080987",
      user_id: "559506321087723",
      status:false,
      service: [
        {
          id: "WIFI",
          text: "Wifi Miễn Phí"
        },
        {
          id: "Chung chủ",
          text: "Chung chủ"
        }
      ],
      comments: [
        {
          user_image:"https://lookaside.facebook.com/platform/profilepic/?asid=559506321087723&height=50&width=50&ext=1526706816&hash=AeRRd_x0PhNNukg2",
          comment:"nhà trọ đẹp quá!"
        },
        {
          user_image:"https://lookaside.facebook.com/platform/profilepic/?asid=559506321087723&height=50&width=50&ext=1526706816&hash=AeRRd_x0PhNNukg2",
          comment:"Rộng rãi thoáng mát :D!"
        }
      ]
    },
    { 
      lat: 15.9710189, 
      lng: 108.2293462 , 
      title :' Nhà Nguyên Căn' , 
      price : '3.000.000',
      phone: "0989080987",
      user_id: "559506321087723",
      status:true,
      service: [
        {
          id: "WIFI",
          text: "Wifi Miễn Phí"
        },
        {
          id: "Chung chủ",
          text: "Chung chủ"
        }
      ],
      comments: [
        {
          user_image:"https://lookaside.facebook.com/platform/profilepic/?asid=559506321087723&height=50&width=50&ext=1526706816&hash=AeRRd_x0PhNNukg2",
          comment:"nhà trọ đẹp quá!"
        },
        {
          user_image:"https://lookaside.facebook.com/platform/profilepic/?asid=559506321087723&height=50&width=50&ext=1526706816&hash=AeRRd_x0PhNNukg2",
          comment:"Rộng rãi thoáng mát :D!"
        }
      ]
    }
]

const url = 'mongodb://localhost/mapsdb';
var db

// init database mongo 
MongoClient.connect(url, function (err,database) {
  db = database.db('mapsdb')
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', 'please start MongoDB first');
  } else {
    console.log('KET NOI MongoDB Thành Công at', url);
    // do some work here with the database.
    var collection = db.collection('maps');
    var collection_users = db.collection('users');
    collection.remove({});
    collection.insert(defaultMaps);
    collection_users.remove({});
    collection.find().toArray(function (err, result) {
        if (err) {
          console.log(err);
        } 
    });
  }
});

// API GET DATA 
app.get('/', function (req, res) {
    res.send('Phong Trọ Server node running 1')
})
app.get('/maps', function (req, res) {
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
   
})

app.get('/history/:user_id', function (req, res) {
    console.log('connecting to MongoDB! History User :'+req.params.user_id)
    var collection = db.collection('maps');
    collection.find({"user_id":req.params.user_id}).toArray(function (err, result) {
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
 
})

app.post('/postitem', function (req, res) {
    var collection = db.collection('maps');
    var lat = parseFloat(req.body.lat);
    var lng = parseFloat(req.body.lng);
    var item = { 
      lat: lat, 
      lng: lng, 
      title: req.body.title, 
      price: req.body.price,
      phone: req.body.phone,
      user_id: req.body.user_id,
      status: req.body.status,
      service: req.body.service,
      comments: []
    }
    collection.insertOne(item, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
    res.send('no permistion')
})
// post user info 
app.post('/adduser', function (req, res) {
    var collection = db.collection('users');
    var item = req.body.user;
    var id_user = req.body.user.id;
    console.log(id_user)
    collection.find({"id":id_user}).toArray(function (err, result) {
      if (result.length < 1) {
        collection.insertOne(item, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
        });
      } else {
        console.log('User exits!');
      }
      // send renponse data maps
      res.send(result)
    });
    
})
// get users
app.get('/users', function (req, res) {
  var collection = db.collection('users');
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
})
// add comment ...
// update status 
app.post('/addcomment', function (req, res) {
  var collection = db.collection('maps');
  console.log(req.body.id,req.body.status)
  collection.update({"_id": ObjectID(req.body.id)}, { $push: { comments: {user_image:req.body.user_image,comment:req.body.comment} }},function(err, result){
    if (err) {
        console.log('Error updating object: ' + err);
        res.send({'error':'An error has occurred'});
    } else {
        console.log('' + result + ' document(s) updated');
    };
  })
  res.send('no permistion')
})

// update status 
app.post('/updatestatus', function (req, res) {
  var collection = db.collection('maps');
  console.log(req.body.id,req.body.status)
  collection.update({"_id": ObjectID(req.body.id)}, { $set: { "status": req.body.status}},function(err, result){
    if (err) {
        console.log('Error updating object: ' + err);
        res.send({'error':'An error has occurred'});
    } else {
        console.log('' + result + ' document(s) updated');
    };
  })
  res.send('no permistion')
})
// delete post item 
app.post('/delete-history', function (req, res) {
  var collection = db.collection('maps');
  collection.remove({"_id": ObjectID(req.body.id)},function(err, result){
    if (err) {
        console.log('Error updating object: ' + err);
        res.send({'error':'An error has occurred'});
    } else {
        console.log('' + result + ' document(s) delete');
    };
  })
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