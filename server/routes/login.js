
const express = require('express');

const bcrypt =  require('bcrypt');

const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req,res) => {
	
	Usuario.count({}, (err, conteo) => {
		
		let body = req.body;
		
		Usuario.findOne({email: body.email}, (err, usuarioDB) => {
			
			if (err) {
				return res.status(500).json({
					ok: false,
					err
				});
			}
			
			if(!usuarioDB){
				return res.status(400).json({
					ok: false,
					err: {
						message: "Usuario o contraseña incorrectos"
					}
				});
			}
			if	(!bcrypt.compareSync(body.password, usuarioDB.password)) {
				return res.status(400).json({
					ok: false,
					err: {
						message: "contraseña o usuario incorrectos"
					}
				});
			}
			
			let token = jwt.sign({
				usuario: usuarioDB
			}, process.env.TOKEN_SEED,
				{ expiresIn: process.env.TOKEN_EXPIRATION});
			
			res.json({
				ok: true,
				usuario: usuarioDB,
				token: token
			});
			
		});
		
	});

});


module.exports = app;