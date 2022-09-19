import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import TodoForm from '../components/TodoForm'
import Spinner from '../components/Spinner'
import { getTodos, reset } from '../features/todo/todoSlice'
import TodoItem from '../components/TodoItem'

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} =useSelector((state)=>state.auth)
  const {todos, isLoading, isError, message} = useSelector((state)=>state.todo)

  React.useEffect(() => {
    if(isError){
      console.log(message);
    }
    if (!user){
      navigate('/login')
      return;
    }
    dispatch(getTodos())

    return()=>{
      dispatch(reset())
    }
  }, [user,navigate, 
    isError,message,dispatch
  ])
  

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Todo Setter Dashboard</p>
    </section>
    <TodoForm/>
    <hr />
    <div>
      <h3> Current Todos : {todos.length}</h3>
    </div>
    <section className="content">
      {todos.length>0?(
          <div className="goals">
          {todos.map((todo)=>(
            <TodoItem key={todo._id} todo={todo}/>
          ))}
          </div>
      ):(
        <h4>You have not set any Todos yet.</h4>
      )}
    </section>

    </>
  )
}

export default Dashboard