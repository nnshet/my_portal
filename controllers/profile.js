
var app = require("../app.js");
//var app = express();
var formidable = require('formidable');
var path = require("path");
var fs = require("fs");

exports.getUserProfile = function(req,res,next){


    //app.db.
    var query = {user_id:"neha_shet"};
   // console.log(req.params.name);
    console.log("dashboard page")
    app.db.collection("profile").find(query).toArray(function(err,result){
        console.log(result[0].personal.address.city);
        var data = {};
        data.personal = result[0].personal;
        data.address = result[0].personal.address;
        data.summary = result[0].summary;
        data.caption = result[0].caption;
        data.profile_image = result[0].personal.profile_image;
        console.log("s authenticated")
        console.log(req.session.isAuthenticated)
        res.render("dashboard", {data:data,isAuthenticated:req.session.isAuthenticated, partials:{header: 'header',footer: 'footer'}});
    })
   
    

};
exports.getUserDetails = function(req,res,next) {
    
    var query = {user_id:"neha_shet"};
     app.db.collection("profile").find(query).toArray(function(err,result){
         
         var data = {};
         data.completeResult = result[0];
         data.personal = result[0].personal;
         data.address = result[0].personal.address;
         data.profile_image = result[0].personal.profile_image;
         console.log(req.user);
         if(req.user != undefined) {
             
         }
         res.render("profile", {data:data,isAuthenticated:req.session.isAuthenticated, partials:{header: 'header',footer: 'footer'}});
     });
};
exports.getResumeDetails = function(req,res,next) {
    
    var query = {user_id:"neha_shet"};
     app.db.collection("profile").find(query).toArray(function(err,result){
         
         var data = {};
         data.completeResult = result[0];
         data.personal = result[0].personal;
         data.address = result[0].personal.address;
         data.profile_image = result[0].personal.profile_image;
         
         res.render("resume", {data:data,isAuthenticated:req.session.isAuthenticated,partials:{header: 'header',footer: 'footer'}});
     });
};

exports.editSummary = function(req,res,next){
    
    
    app.db.collection("profile").update({"user_id":"neha_shet"},{ $set:{"summary":req.body.summary}},function(err,result){
        
        if(!err)
            
            res.json({"success":true});
        else
            res.json({"success":false});
        
    })
}

exports.editSkills = function(req,res,next){
    
    
    app.db.collection("profile").update({"user_id":"neha_shet"},{ $set:req.body.data},function(err,result){
        
        if(!err)
            
            res.json({"success":true});
        else
            res.json({"success":false});
        
    })
}

exports.renderEducation = function(req,res,next){
    
    
    var ed_id = req.params.id;
    app.db.collection("profile").findOne({"user_id":"neha_shet","education.id":ed_id},{"education.$":1},function(err,result){
        
        if(!err){
            console.log(result)
             res.render("editEducationModal", {data:result.education[0],layout:false});
        }
        else
            res.json({"success":false});
        
    })
}

exports.editWorkDetails = function(req,res,next) {
    
     console.log(JSON.stringify(req.body.data))
     console.log(req.body.data.work_id)
     var queryString = "";
    var updateDta = '';
     if(req.params.type == "edit") {
         queryString = {"user_id":"neha_shet","work.work_id":req.body.data.work_id};
         updateData = { $set:{"work.$":req.body.data}};
     } else {
          queryString = {"user_id":"neha_shet"}
         updateData = { $addToSet:{"work":req.body.data}};
     }
    app.db.collection("profile").update(queryString,updateData,function(err,result){
        
        console.log("updating...............")
        console.log(result)
        if(!err)
            
            res.json({"success":true});
        else
            res.json({"success":false});
        
    })
    
}

exports.uploadDocument = function(req,res,next) {
    
    var type = req.params.type;
    
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(type == "resume"){
            var oldpath = files.resume.path;
            var file_ext = files.resume.name.split('.').pop()
        } else {
            var oldpath = files.cover.path;
            var file_ext = files.cover.name.split('.').pop()
        }
       
        var newpath = path.join(__dirname, '/..','public/profile/'+type+'/'+req.user+'.'+file_ext);
        console.log(newpath)
          fs.readFile(oldpath, function(err, data) {
                fs.writeFile(newpath, data, function(err) {
                    fs.unlink(oldpath, function(err) {
                        if (err) {
                            res.status(500);
                            res.redirect("");
                        } else {
                            var query = {"user_id":"neha_shet"};
                            if(type == "resume"){
                                var updateData = {resume:'profile/'+type+'/'+req.user+'.'+file_ext};
                            } else {
                                var updateData = {cover_letter:'profile/'+type+'/'+req.user+'.'+file_ext}; 
                            }
                            app.db.collection("profile").update(query,{ $set:updateData},function(err,result){
        
                            console.log("updating...............")
                            console.log(result)
                                if(err)
                                    console.log("there is an error")

                                else

                                    res.redirect("/resume");
                            })
                            
                            
                        }
                    });
                });
            });
    });
}