const express= require('express');
const router= express.Router();
const {registeredUser,authuser,allUsers}=require("../controllers/userControllers");
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(registeredUser).get(protect,allUsers);
router.route("/login").post(authuser);
module.exports=router;