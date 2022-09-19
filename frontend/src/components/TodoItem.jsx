import { useDispatch } from 'react-redux'
import { deleteTodo } from '../features/todo/todoSlice'

function TodoItem({ todo }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(todo.createdAt).toLocaleString('en-US')}</div>
      <h4><strong>{todo.task}</strong></h4>
      <button onClick={() => dispatch(deleteTodo(todo._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default TodoItem