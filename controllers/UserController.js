const models = require ('../models');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const userToken= require ('../services/token');


exports.signin = async (req,res, next )=>{
	try{
		//const user = await models.User.findOne({where:{email:req.body.email}});
		const user = await models.user.findOne({where:{email:req.body.email}});
		if (user){
			const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
			if (passwordIsValid){
				const token = await userToken.encode(user) ;
				res.status(200).send({
					auth:true,
					accessToken:token,
					user:user
				});
			}else{
				res.status(401).json({
					error: "error en el usuario o contraseña (contraseña no encontrado)"
				});

			}
		} else {
			res.status(404).json({
					error: "error en el usuario o contraseña (usuario no encontrado)"
				});

		}


	}
	catch (error) {
		res.status(500).send({message: 'Error'});
		next (error);


	}
};

exports.register = async (req,res)=>{
	try{
	req.body.password= await bcrypt.hashSync(req.body.password, 10);
	const user = await models.user.create(req.body);
	res.status(200).json(user);
	console.log("estoy en api/register");
	}
	catch{

	}	
};



exports.list = async (req,res)=>{
	try{
	const user = await models.user.findAll();
	 res.status(200).json(user);
	console.log("estoy en api/auth");
	res.status(200).send("Hola mundo vivo en /api/auth. 14 dic");
	console.log("****HOLA SE HA HECHO LA PETICION A API/auth");

	}
	catch{
	}
	
};


exports.update = async (req,res, next)=>{
	try {
		const user = await models.user.findOne({where:{email: req.body.email}});
		if (user){
			const user = await models.user.update({name: req.body.name},
			{
				where:{
					email:req.body.email
				},
			});
			res.status(200).json(user);

		}else{
			res.status(404).send({message: 'Usuario no encontrado' });

		}

	}
	catch (error){
		res.status(500).send({message:'Error'});
		next(error);

	}

} ;
