import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';

function TodoForm(props) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
   // inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    props.onSubmit({
      text: input,
    });

    setInput('');
  };

  return (
    <form className="todo-form" onSubmit={handleSumbit}>
      <input
        type="text"
        placeholder="Add todo"
        name="text"
        value={input}
        className="todo-input"
        onChange={handleChange}
        ref={inputRef}
      />
      <button className="todo-button">Add Todo</button>
    </form>
  );
}

export default TodoForm;
