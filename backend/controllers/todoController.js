const asyncHandler = require ('express-async-handler')
const Todo =require('../models/todoModel')
const User =require('../models/userModel')



// @desc    Get Todos
// @route   GET /api/todos
// @access  Public
const getTodos = asyncHandler(async(req, res) => {

    const todos = await Todo.find({user:req.user.id})
    res.status(200).json(todos)
})


// @desc    Add Todo
// @route   POST /api/todos
// @access  Private
const addTodo = asyncHandler(async(req, res) => {

    if(!req.body.todo){
        res.status(400).json({message:"Todo missing from request body"})
    }

    const todo = await Todo.create({
        task:req.body.todo.task,
        user:req.user.id
    })

    res.status(200).json(todo)
})

// @desc    Update Todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = asyncHandler(async(req, res) => {
    const todo = await Todo.findById(req.params.id)

    if(!todo){
        res.status(400)
        throw new Error('Todo not found!')
    }

    

    //check user
    if(!req.user){
        res.status(401)
        throw new Error('User not found!')
    }

    //logged in user is same as todo user?
    if(todo.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('User not authorized!')
    }

    const toBeUpdatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body.todo,{new:false})
    const updatedTodo = await Todo.findById(req.params.id)
    res.status(200).json({old:toBeUpdatedTodo, new:updatedTodo})
})

// @desc    Delete Todo
// @route   Delete /api/todos/:id
// @access  Private
const deleteTodo = asyncHandler(async(req, res) => {
    const todo = await Todo.findById(req.params.id)

    if(!todo){
        res.status(400)
        throw new Error('Todo not found!')
    }

    

    //check user
    if(!req.user){
        res.status(401)
        throw new Error('User not found!')
    }

    //logged in user is same as todo user?
    if(todo.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('User not authorized!')
    }

    await todo.delete()

    res.status(200).json({id:req.params.id})
})

module.exports={
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
}