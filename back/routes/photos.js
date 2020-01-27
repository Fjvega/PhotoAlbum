var express = require("express");
var router = express.Router();
var md5 = require("md5");
const MongoClient = require("mongodb").MongoClient;
var multer  = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,String(Date.now())+file.originalname)
    }
  })
const upload = multer({storage: storage})
const dateFormat = require('dateformat');
    


router.post('/add', upload.single('file'), function (req, res, next) {

    const name=req.file['filename']
    const user = JSON.parse(req.body['json'])

  console.log(new Date())
    const uri="mongodb+srv://tester:1234@cluster0-nfm12.mongodb.net/test?retryWrites=true&w=majority";
  const responseServer= res;
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    var dbo = db.db("dexproject");
    var myobj = { filename: name, user: user['user'],
    album:user['album'],date:new Date(),realname:user['filename']};





    dbo.collection("files").insertOne(myobj, function(err, res) {
      if (err) throw  responseServer.send({ state: "fail" });;
      console.log("1 document inserted");
      db.close();
      responseServer.send({ state: "success" });
    
  });
   
  })
})


/** get one image to display */
router.get('/get/:name', function (req, res, next) {

  const name= req.params.name
  const url=__basedir+'/uploads/'+name
    res.sendFile(url);


})


/** get all images*/
router.get('/get/:username/:album', function (req, res, next) {

  const uri =
    "mongodb+srv://tester:1234@cluster0-nfm12.mongodb.net/test?retryWrites=true&w=majority";
  const username = req.params.username
  const album = req.params.album
  const responseServer = res;

  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dexproject");
    dbo
      .collection("files")
      .find({ user: username, album: album })
      .toArray(function(err, res) {
        console.log(res)
        if (err) throw responseServer.send({ state: "crash" });
        db.close();
        if (res.length > 0) {
          responseServer.send({ state: "success",photos: res});
        } else {
          responseServer.send({ state: "fail",photos: res});
        }
      });
  });


})


/* change Album of a image */

router.post("/updateAlbum", function(req, res, next) {
  const uri =
    "mongodb+srv://tester:1234@cluster0-nfm12.mongodb.net/test?retryWrites=true&w=majority";
  const fileStoragename= req.body["name"]
  console.log(fileStoragename)
  const name = req.body["album"];
  
  const responseServer= res;
  
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dexproject");
    dbo

          var myobj = { filename:fileStoragename};
          dbo.collection("files").updateOne(myobj,{$set:{album:name}}, function(err, res) {
            console.log(res)
            console.log("1 document inserted");
            db.close();
            responseServer.send({ state: "success" });
          });

        
      });
   

    
  });

/*Delete image from storage and db */
router.post("/delete", function(req, res, next) {

  const uri =
    "mongodb+srv://tester:1234@cluster0-nfm12.mongodb.net/test?retryWrites=true&w=majority";
  const fileStoragename= req.body["name"]
  const path=__basedir+'/uploads/'+fileStoragename
  console.log(fileStoragename)
  
  
  const responseServer= res;
  
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dexproject");
    dbo

          var myobj = { filename:fileStoragename};
          dbo.collection("files").deleteOne(myobj, function(err, res) {
          
            console.log("1 document deleted");
            try {
              fs.unlinkSync(path)
              console.log('delete one file')
              //file removed
            } catch(err) {
              console.error(err)
            }
            db.close();
            responseServer.send({ state: "success" });
          });

        
      });
   

    
  });

/*get Images with filters */
  router.get('/get/:user/:name/:initdate/:finaldate', function (req, res, next) {

    const uri =
      "mongodb+srv://tester:1234@cluster0-nfm12.mongodb.net/test?retryWrites=true&w=majority";
    const user=req.params.user
    const name = req.params.name
    const initdate = req.params.initdate
    const finaldate= req.params.finaldate
    const responseServer = res;
    var convertDateInit;
    var convertDateFinal;
    console.log(initdate)
    console.log(finaldate)
    if(initdate!=='none')
    {
    convertDateInit= initdate.split('-')
    convertDateFinal= finaldate.split('-')
    }
 

    if(initdate=='none' && finaldate=='none')
    {
    console.log('Entre')
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("dexproject");
      dbo
        .collection("files")
        .find({ user:user,realname: new RegExp(name, 'i') })
        .toArray(function(err, res) {
          console.log(res)
          if (err) throw responseServer.send({ state: "crash" });
          db.close();
          if (res.length > 0) {
            responseServer.send({ state: "success",photos: res});
          } else {
            responseServer.send({ state: "fail",photos: res});
          }
        });
    });
    }else
      {
        MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
          console.log('llegue')
          if (err) throw err;
          var dbo = db.db("dexproject");
          dbo
            .collection("files")
            .find({ user:user,
              realname: new RegExp(name, 'i'),
              date:{
              $gte:new Date(parseInt(convertDateInit[0]),parseInt(convertDateInit[1])-1,parseInt(convertDateInit[2]))
              ,$lt:new Date(parseInt(convertDateFinal[0]),parseInt(convertDateFinal[1])-1,parseInt(convertDateFinal[2]))
 
            }})
            .toArray(function(err, res) {
              console.log(res)
              if (err) throw responseServer.send({ state: "crash" });
              db.close();
              if (res.length > 0) {
                responseServer.send({ state: "success",photos: res});
              } else {
                responseServer.send({ state: "fail",photos: res});
              }
            });
        });
      }
  
  })

module.exports = router;