const { signup, login, delUser, updateUser, userFind } = require("../Controllers/AuthController");
const { signupVaidation, loginVaidation } = require("../Middlewares/AuthValidation");



const router = require("express").Router();

router.post("/signup", signupVaidation, signup);
router.post("/login", loginVaidation, login);
router.delete('/del:id',delUser)
router.put('/update:id',updateUser)
router.get('/userFind/:id',userFind)



module.exports = router;
