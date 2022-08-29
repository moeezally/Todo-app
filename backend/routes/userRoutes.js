const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {registerUser,updateUser,getMe,loginUser} = require('../controllers/userController')

router.route('/').post(registerUser)

router.route('/:id').put(updateUser)

router.route('/me').get(protect,getMe)

router.route('/login').post(loginUser)

module.exports= router