const tokenServices = require ('../services/token.js');

module.exports ={

	verificarAdmin : async (req,res, next)=>{
   try	{
		if (!req.headers.token){  // verifica que el token se haya enviado por el header
			return res.status(404).send({
				mesagge:"token no encontrado Aca caigo admin"
			});

		} else {
			const reponse  = await tokenServices.decode(req.header.token);
			if (response.rol ==="Administrador"){
				next();
			} else {
				return res.status(403).send({
					message:"Usuario sin permisos"
				});
			}
		}


	}

		catch (error){
			next();
		}

	},


	verificarVendedor: async (req, res, next)=>{
	try{
			if (!req.headers.token){  // verifica que el token se haya enviado por el header
			return res.status(404).send({
				mesagge:"token no encontrado aca caigo vendedor"
			});

		} else {
			const reponse  = await tokenServices.decode(req.header.token);
			if (response.rol ==="Administrador" || response.rol ==="Vendedor" ){
				next();
			} else {
				return res.status(403).send({
					message:"Usuario sin permisos"
				});
			}
		}
	}

	 catch(error) {
	 	next();
	}

	}
}