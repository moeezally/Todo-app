const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {getTodos,addTodo,deleteTodo,updateTodo} = require('../controllers/todoController')

router.route('/').get(protect,getTodos).post(protect,addTodo)

router.route('/:id').put(protect,updateTodo).delete(protect,deleteTodo)

module.exports= router   