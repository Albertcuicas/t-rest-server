require('./config/config');
const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB,{ useNewUrlParser: true, useCreateIndex: true},(err,res)=>{
	if(err){
		throw err;
	}
	console.log('BD mongo ready');
});

app.listen(process.env.PORT, () => {
	console.log("listening port", process.env.PORT);
});