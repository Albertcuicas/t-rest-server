const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verifyToken, verifyRole } = require('../middlewares/authenticacion');

app.get('/usuario', verifyToken,(req, res) => {
	
/*	return res.json({
		usuario: req.usuario,
		nombre: req.usuario.nombre,
		email: req.usuario.email,
	});*/
	
	let desde = req.query.desde || 0;
	let limite = req.query.limite || 0;
	desde = Number(desde);
	limite = Number(limite);
	Usuario.find({status: true}, 'nombre email role status img')
	.skip(desde)
	.limit(limite)
	.exec((err, usuarios) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				msg: err
			})
		}
		Usuario.countDocuments({}, (err, conteo) => {
			res.json({
				ok: true,
				usuarios,
				count: conteo
			});
		});
	});
});

app.post('/usuario', [verifyToken],function (req, res) {
	let body = req.body;
	
	let usuario = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),
		role: body.role
	});
	
	usuario.save((err, userDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				msg: err
			})
		}
		res.json({
			ok: true,
			usuario: userDB
		})
	});
});

app.put('/usuario/:id', [verifyToken, verifyRole],function (req, res) {
	let id = req.params.id;
	let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'status']);
	
	Usuario.findByIdAndUpdate(id, body, {new: true, runValidator: true}, (err, userDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
		res.json({
			ok: true,
			usuario: userDB
		});
	});
	
});

app.delete('/usuario/:id', [verifyToken, verifyRole],function (req, res) {
	
	let id = req.params.id;
	Usuario.findByIdAndUpdate(
		id,
		{status: false},
		{new: true},
		(err, deletedUser) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}
			
			if (!deletedUser) {
				return res.status(400).json({
					ok: false,
					err: {
						message: "recurso no encontrado"
					}
				})
			}
			
			res.json({
				ok: true,
				usuario: deletedUser
			});
			
		});
	
});

module.exports = app;