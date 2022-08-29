const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'users'
        },

        task:{
            type: String,
            required:[true,'Please add a task String'],
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Todo',todoSchema)