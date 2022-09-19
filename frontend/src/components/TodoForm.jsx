import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from '../features/todo/todoSlice'
import Spinner from "./Spinner";

function TodoForm() {
  const [text, setText] = React.useState("");

  const dispatch = useDispatch();

  const{isLoading} = useSelector((state)=>state.todo)

  const onSubmit = (e) => {
    e.preventDefault();
    let todo={task:text}
    dispatch(createTodo({todo}))
    setText('')
  };

  if(isLoading){
    return <Spinner/>
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter New Todo"
          />
        </div>
        <div className="form-group">
            <button className="btn btn-block" type="submit">
                Add Todo
            </button>
        </div>
      </form>
    </section>
  );
}

export default TodoForm;
