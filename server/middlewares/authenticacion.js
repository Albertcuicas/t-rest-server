const jwt = require('jsonwebtoken');

/******* verificar token ***********/

let verifyToken = (req, res, next) => {
	
	let token = req.get('token');
	// console.log(token);
	
	jwt.verify(token, process.env.TOKEN_SEED, (err, decoded)=> {
		if (err){
			return res.status(401).json({
				ok: false,
				err: {
					message: 'Token inválido'
				}
			});
		}
		
		req.usuario = decoded.usuario;
		next();
		
	});
	
};

let verifyRole = (req, res, next) => {
	
	let usuario = req.usuario;
	
	if ( usuario.role === 'ADMIN_ROLE') {
		next();
		return;
	}
	
	return res.status(401).json({
		ok: false,
		err: {
			message: 'Token inválido'
		}
	});
	
};


module.exports = {
	verifyToken,
	verifyRole
};