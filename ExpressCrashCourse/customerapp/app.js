const express = require('express');
const bodyparser = require('body-parser');

var app = express();
app.listen(3000,function(){
	console.log("Server started on port 3000");
});