import React, { useState } from 'react';
import { createContainer } from "unstated-next";

type TodoType = {
  todo: string | number;
}
type TodosType = TodoType[];



function useToods() {
  let [todos, setTodo] = useState<TodosType>([]);
  let [todo, setTodoItem] = useState('');

  const handleInput:React.ReactEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;

    console.log('target.value', target.value);
    setTodoItem(target.value)
  }

  const addTdo = (e:React.MouseEvent) => {
    e.preventDefault();
    setTodo([...todos, {todo}]);
    setTodoItem("");
  }

  return {
    todos,
    todo,
    addTdo,
    handleInput
  }

}

let Todos = createContainer(useToods);
export default Todos;