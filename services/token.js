const jwt = require('jsonwebtoken');
const models = require ('../models');


// Este modulo de toke, tendra dos metodos, el encode y el decode

module.exports ={
	encode: async (user)=>{

		
		const token = jwt.sign({
					id:user.id,
					name:user.name,
					email:user.email,
					rol: user.rol,
					status:user.estado
				},'texto-secreto',{
					expiresIn:3600
					});
		return token;



	},


	decode: async (token)=>{

		try{
			const {id} = await jwt.verify(token,'texto-secreto');
			const user = await models.user.findOne({where:{
				id:id,
				estado:1
			}});
			if (user){
				return user;
			}else{
				return false;
			}
		}catch (error){
			const newToken = await checkToken(token); // en caso de no encontrarse el token se hara una validacion adiconal en un metodo interno que se construye aca
		

		}

	}


}


const checkToken = async (token)=>{
	let localID = null;
	try{
		const {id}= token.decode(token);
		localID= id;


	}catch (error) {

	}
	const user = await models.user.findOne({where:{
				id:localID,
				estado:1
			}});
	if (user) {  // si el usuario existe se le renueva el token
		const token = encode(user);
		return {
			token,
			rol:user.rol
		}

	} else {
		return false;
	}
}