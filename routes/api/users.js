const router = require ('express').Router();
const models = require('../../models');
const bcrypt = require('bcryptjs');
const UserController = require ('../../controllers/UserController.js');
const auth = require ('../../middlewares/auth.js');


/* acalo nuevo es que antes de pasar a los controladores se haran uso de uno middleware para hacer verificacines de los
roles de usuario y permitir o no su gesion 

tamien la logica del analisis del token se hara a traves de la carpeta que llamamos services con el archivo, toke.js

*/


 router.get('/list', auth.verificarVendedor, UserController.list);
 router.post ('/register', auth.verificarAdmin, UserController.register); 
 router.post('/update', auth.verificarAdmin, UserController.update);





router.post('/signin', UserController.signin);	
module.exports = router;