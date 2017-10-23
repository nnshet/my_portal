var express = require('express');
var router = express.Router();
var profile = require('../controllers/profile')
var app = express();
var session = require('express-session');
var app1 = require("../app.js");
var passport = require('passport');
//var fs = require("fs");
var LocalStrategy = require('passport-local').Strategy;
var formidable = require('formidable');
var path = require("path");
passport.use(new LocalStrategy(  
    
    function(username, password, done) {
          
          process.nextTick(function() {
    // Auth Check Logic

          console.log(username)
        var query = {"user_id":username}
        app1.db.collection("profile").findOne(query, function (err, user) {
            
            console.log("passport module")
            console.log("db password");
            console.log(user.password)
            
            console.log("user given password");
            console.log(password)
          if (err) {
              console.log("error case");
              console.log(err)
            return done(err)
          }
          if (!user) {
              
              console.log("here no user")
            return done(null, false)
          }
          if (password != user.password  ) {
               console.log("here user password not equal")
            return done(null, false)
          }
            //req.session.isAuthenticated = true;
          return done(null, user)
        })
          });
      }
));


router.get('/dashboard',authenticationMiddleware(),function(req, res, next) {
    
    
    profile.getUserProfile(req, res, next);
 
});

router.get('/',authenticationMiddleware(), function(req, res, next) {
    
    res.redirect("/dashboard");
//
});

router.get('/profile',authenticationMiddleware(),function(req,res,next){
   
    profile.getUserDetails(req,res,next);
    
})
//router.get('/profile/:id',authenticationMiddleware(),function(req,res,next){
//   
//    profile.getUserDetails(req,res,next);
//    
//})
router.get('/resume',function(req,res,next){
    
    profile.getResumeDetails(req,res,next);
    
});
router.post('/login',passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' })
                   
);
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post("/editSummary",function(req,res,next){profile.editSummary(req,res,next)});

router.post("/editWorkDetails/:type",function(req,res,next){profile.editWorkDetails(req,res,next)});

router.post("/editSkills",function(req,res,next){profile.editSkills(req,res,next)});
router.post("/uploadDoc/:type",function(req,res,next){
 
    profile.uploadDocument(req,res,next);
})

router.get("/editEducation/:id",function(req,res,next){profile.renderEducation(req,res,next)});


passport.serializeUser(function(user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
//    var query = {"user_id":id}
//  app1.db.collection("profile").findOne(query, function(err, user) {
//    done(err, user);
//  });
    done(null,id)
});

function authenticationMiddleware() {
    
  return function (req, res, next) {
      console.log("here it comes")
    req.session.isAuthenticated = false;
      console.log("authenticatinMiddleware")
      console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        req.session.isAuthenticated = true;
      return next()
    }
      return next();
  }
}
module.exports = router;