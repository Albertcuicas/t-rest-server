

/*+++++++++++++++ Port*************/
process.env.PORT = process.env.PORT || 3000;


/*************** Entonrno *************/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



/*************** Mongo *************/
let urlDB;

if(process.env.NODE_ENV === 'dev'){
	urlDB = 'mongodb://localhost:27017/test';
} else {
	urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;

/*************** token *************/

process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'secret-dev';
	
process.env.TOKEN_EXPIRATION = 60*60*24*30;
