import React from 'react';

import Todos from './models';

import TodoList from './components/todolist';

const Todo = () => {
  return (
    <Todos.Provider>
      <TodoList />
    </Todos.Provider>
  )
}


export default Todo;