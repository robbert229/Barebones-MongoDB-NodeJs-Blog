var express = require('express');
var app = express();

var databaseUrl = "main"; // "username:password@example.com/mydb"
var collections = ["posts"]
var db = require('mongojs').connect(databaseUrl, collections);

app.get('/post.js', function(req, res){
	db.posts.find().sort({post:1},function(err,docs){
		console.log("Serving a post");
		if(!err){
			res.send("var data = "+ JSON.stringify(docs) +";");
		} else {
			res.send("");
			console.log("Error Retrieving Data from Mongo!");
			console.log(err);
		}
	});
});
app.get('/', function(req, res){
	res.sendfile('index.html');
});
app.get('/css/*', function(req,res){
	res.sendfile(req.path.slice(1));
});
app.get('/images/*', function(req,res){
	res.sendfile(req.path.slice(1));
});
app.get('/js/*', function(req,res){
	res.sendfile(req.path.slice(1));
});

app.listen(80);