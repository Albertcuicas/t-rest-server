

/*+++++++++++++++ Port*************/
process.env.PORT = process.env.PORT || 3000;


/*************** Entonrno *************/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



/*************** Entonrno *************/
let urlDB;

if(process.env.NODE_ENV === 'dev'){
	urlDB = 'mongodb://localhost:27017/test';
} else {
	urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;