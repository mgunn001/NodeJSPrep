const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongojs = require('mongojs')
var app = express();

var db = mongojs('mycustomers', ['customers']);

// view engine 

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


/*// middle ware for simple logger 
var logger = function(req,res,next){
	console.log("logging");
	next();
}
app.use(logger);*/


// body parser middleware can be found on body parers website 
// parse application/json 
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));


// set static path 
app.use(express.static(path.join(__dirname,'client')));


/*
	//simple way of  pusing the json to client 
var ppl = [
	{ 
		name: 'Mahi',
		age: 26
	},
	{ 
		name: 'Thag',
		age: 30
	},
	{ 
		name: 'Rola',
		age: 24
	}
];

app.get('/json', function(req,res){
	res.json(ppl);
});*/

/* // to just send this text to browser as a text/html
app.get('/', function(req,res){
	res.send ("Hello People !!");
});*/


var ppl = [
	{ 
		id : 1,
		name: 'Mahi',
		age: 26
	},
	{ 
		id : 2,
		name: 'Thag',
		age: 30
	}
];

app.get('/', function(req,res){
		// find everything 
		db.customers.find(function (err, docs) {
		    // docs is an array of all the documents in mycollection 
		    console.log(docs);
		    ppl = docs;
		    res.render ('index',{
			title : 'Super',
			customers : ppl

		});
	})
	
});

app.post('/customer/add', function(req,res){
		var newCust = {
			name: req.body.name,
			age: req.body.age
		}
		console.log("new cust details sent :"+ JSON.stringify(newCust));
		db.customers.insert(newCust, function(err, res){
			if(err){
				console.log(err);
			}
				res.redirect('/');
		});
});


app.listen(3000,function(){
	console.log("Server started on port 3000");
});

