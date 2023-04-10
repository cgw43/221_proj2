import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import Popup from './Popup';
import Banner from './Banner';
import TodoTable from './TodoTable';
import Popup from './Popup';
import TodoList from './TodoList';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState({
    tError: false,
    TEText: '',
    dsError: false,
    dlError: false,
    pError: false,
  });

  const test = [
    { title: 'Cheese', desc: 'd' },
    { title: 'Ranger', desc: 'Gussy' },
  ];
  // adds new task to list
  const addTask = (task) => {
    const newTodos = [task, ...todos];
    setTodos(newTodos);
    toastr.options = {
      'closeButton': true,
      'positionClass': 'toast-bottom-right',
      'preventDuplicates': false,
      'showDuration': '750',
      'hideDuration': '750',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut',
    }
    toastr.success("Task Successfully Added");
    console.log(task, ...todos);
    resetErrors();
  };

  const resetErrors = () => {
    setErrors({
      tError: false,
      TEText: '',
      dsError: false,
      dlError: false,
      pError: false});
  };

  // Sets isComplete var based on input
  const setIsComplete = (id, val) => {
    const newTodos = todos.map((t) =>
      id === t.title
        ? {
            title: t.title,
            desc: t.desc,
            deadline: t.deadline,
            priority: t.priority,
            isComplete: val,
          }
        : t
    );
    setTodos(newTodos);
    console.log('set');
  };

  const updateTasks = (id, newValue) => {
    setTodos((prev) =>
      prev.map((item) => (item.title === id ? newValue : item))
    );
    toastr.options = {
      'closeButton': true,
      'positionClass': 'toast-bottom-right',
      'preventDuplicates': false,
      'showDuration': '750',
      'hideDuration': '750',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut',
    }
    toastr.success("Task Successfully Updated");
    resetErrors();
  };

  const deleteTask = (id) => {
    const newTasks = [...todos].filter((todo) => todo.title !== id);
    setTodos(newTasks);
    toastr.options = {
      'closeButton': true,
      'positionClass': 'toast-bottom-right',
      'preventDuplicates': false,
      'showDuration': '750',
      'hideDuration': '750',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut',
    }
    toastr.success("Task Successfully Deleted");
  };
  // returns true on invalid input
  const isInvalidInput = (task) => {
    console.log('Checking brah');
    resetErrors();
    let res =
      isNotDistinctTitle(task.title) ||
      isEmptyInput(task.title, task.desc, task.deadline, task.priority);
    console.log(res);
    return res;
  };

  // returns true if title isn't unique
  const isNotDistinctTitle = (id) => {
    if (todos.some((t) => t.title === id)) {
      //const newErrors = {...errors, tError: true, TEText: 'Title must be unique'}
      //setErrors(newErrors);
      setErrors({
        tError: true,
        TEText: 'Title must be unique',
        dsError: false,
        dlError: false,
        pError: false,
      });
      return true;
    } else {
      return false;
    }
  };
  // return true if there is empty input
  const isEmptyInput = (id, ds, dl, pr) => {
    setErrors({
      tError: !id,
      TEText: !id ? 'Title is required' : '',
      dsError: !ds,
      dlError: !dl,
      pError: !pr,
    });
    return !!(!id || !ds || !dl || !pr);
  };

  return (
    <div>
      <Banner
        tasks={todos}
        addTask={addTask}
        errors={errors}
        isInvalidInput={isInvalidInput}
        resetErrors={resetErrors}
      />
      <TodoTable
        tasks={todos}
        setIsComplete={setIsComplete}
        updateTasks={updateTasks}
        deleteTask={deleteTask}
        errors={errors}
        isInvalidInput={isInvalidInput}
        resetErrors={resetErrors}
      /> 
    </div>
  );
}

export default TodoList;
