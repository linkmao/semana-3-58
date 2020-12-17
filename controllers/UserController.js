const {models} = require ('../models');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');


exports.signin = async (req,res, next )=>{
	try{
		//const user = await models.User.findOne({where:{email:req.body.email}});
		const user = await models.user.findOne({where:{email:req.body.email}});
		if (user){
			const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
			if (passwordIsValid){
				const token = jwt.sign({
					id:user.id,
					name:user.name,
					email:user.email,
					rol: user.rol
				},'texto-secreto',{
					expiresIn:3600
				});
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