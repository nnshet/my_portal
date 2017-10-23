var express = require("express");
var session = require("express-session");
var app = express();
var path = require("path");
var hogan = require("hogan.js");
var index = require("./route/index");
var bodyParser = require("body-parser");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var mongoClient = require("mongodb").MongoClient;
db = null;
var passport = require('passport')  
app.use(session({ secret: 'keyboard cat' , saveUninitialized: true, // saved new sessions
  resave: false}));
app.use(passport.initialize())  
app.use(passport.session()) 

app.use('/', index);
//mongodb://<dbuser>:<dbpassword>@ds129004.mlab.com:29004/my_portal
//mongoClient.connect("mongodb://localhost:27017/my_portal",function(err,database){
mongoClient.connect("mongodb://neha:12345@ds129004.mlab.com:29004/my_portal",function(err,database){
    
    if(err) console.log("Error connecting databse");
    
    exports.db = database;
    
    const server = app.listen(process.env.PORT || 6710,function(){
    const port = server.address().port;
    console.log('App listening on port'+port);
  });
//    app.listen(8001,function(){
//        console.log("Started server at port number 8001");
//    });
    
});

app.post("/submitData",function(req,res){
    
    db.collection("user").insert({"name":req.body.name,"q1":req.body.answer1,"q2":req.body.answer2},function(err,result){
        if(err) console.log("error inserting in the database");
        
        res.send("Success");
    })
})

app.get("/getData/:name",function(req,res){
    
    var query = {name:req.params.name};
    console.log(req.params.name);
    db.collection("questions").find(query).toArray(function(err,result){
        console.log(result);
        res.send(result[0].name);
    })
    
})

module.exports = app;
