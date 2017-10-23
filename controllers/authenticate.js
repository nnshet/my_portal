const passport = require('passport')  
const LocalStrategy = require('passport-local').Strategy

var app = require("../app.js");



exports.authenticationMiddleware = function() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}