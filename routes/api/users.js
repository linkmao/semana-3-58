const router = require ('express').Router();
const models = require('../../models');
const bcrypt = require('bcryptjs');
const UserController = require ('../../controllers/UserController.js');

router.get('/', async (req,res)=>{
	 const user = await models.user.findAll();
	 res.status(200).json(user);
	
	console.log("estoy en api/auth");
});


router.post ('/register', async(req,res)=>{
	req.body.password= await bcrypt.hashSync(req.body.password, 10);
	const user = await models.user.create(req.body);
	res.status(200).json(user);
	console.log("estoy en api/register");
});


router.post('/signin', UserController.signin);
	
module.exports = router;