var express = require("express");
var router = express.Router();
var md5 = require("md5");
const MongoClient = require("mongodb").MongoClient;

/*Add new user */
router.post("/add", function(req, res, next) {
  const uri =
    "mongodb+srv://tester:1234@cluster0-nfm12.mongodb.net/test?retryWrites=true&w=majority";
  const token= md5(req.body["username"])
  const name = req.body["username"];
  const password = md5(req.body["password"]);
  const responseServer= res;
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dexproject");
   
    dbo
      .collection("users")
      .find({ name: name })
      .toArray(function(err, res) {
        if (err) throw responseServer.send({ state: "down" });
        if (res.length >0) {
          db.close();
          responseServer.send({ state: "fail" });
        }else
        {
          var myobj = { token:token,name: name, password: password,album:['default'] };
          dbo.collection("users").insertOne(myobj, function(err, res) {
            console.log("1 document inserted");
            db.close();
            responseServer.send({ state: "success" });
          });

        } 
      });
   

    
  });
});

/*Log user */

router.post("/log", function(req, res, next) {
  const uri =
    "mongodb+srv://tester:1234@cluster0-nfm12.mongodb.net/test?retryWrites=true&w=majority";
  const name = req.body["username"];
  const password = md5(req.body["password"]);
  const responseServer = res;
  console.log(password)
  console.log(name)
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dexproject");
    dbo
      .collection("users")
      .find({ name: name, password: password })
      .toArray(function(err, res) {
        console.log(res)
        if (err) throw responseServer.send({ state: "fail" });
        db.close();
        if (res.length > 0) {
          responseServer.send({ state: "success",token: res[0]['token'] });
        } else {
          responseServer.send({ state: "fail" });
        }
      });
  });
});

/*Get user info */

router.get("/getinfo/:token", function(req, res, next) {
  const uri =
    "mongodb+srv://tester:1234@cluster0-nfm12.mongodb.net/test?retryWrites=true&w=majority";
  const token= req.params.token
  const responseServer= res;

  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dexproject");
   
    dbo
      .collection("users")
      .find({ token: token })
      .toArray(function(err, res) {
        if (err) throw responseServer.send({ state: "down" });
        console.log(res)
        if (res.length >0) {
          responseServer.send({ state: "success",name: res[0]['name'],albums: res[0]['album'] });
          db.close();
          
        }else{
          responseServer.send({ state: "fail" });
        }
  });

  });
  
})



/*Add new Album to user */
router.post("/addAlbum", function(req, res, next) {
  const uri =
    "mongodb+srv://tester:1234@cluster0-nfm12.mongodb.net/test?retryWrites=true&w=majority";
  const token= req.body["token"]
  const name = req.body["album"];
  
  const responseServer= res;
  
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dexproject");
    dbo

          var myobj = { token:token};
          dbo.collection("users").updateOne(myobj,{$addToSet:{album:name}}, function(err, res) {
            console.log("1 document inserted");
            db.close();
            responseServer.send({ state: "success" });
          });

        
      });
   

    
  });


module.exports = router;
