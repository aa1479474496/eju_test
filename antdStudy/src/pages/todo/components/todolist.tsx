import React from 'react';
import { Input, Button, Row, Col } from 'antd';

import Todos from '../models';


const TodoList = () => {
  let todosContainer = Todos.useContainer();
  let { todos, todo, addTdo, handleInput } = todosContainer;
  return (
    <div>
      <h3>todo list</h3>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Input
            placeholder="Basic usage"
            onChange={handleInput}
            value={todo}
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <Button type="primary" onClick={addTdo}>add todo</Button>
        </Col>
      </Row>


      <div>
        {todos.map(todo => (
          <p key={todo.todo}>{todo.todo}</p>
        ))}
      </div>


    </div>
  )
}

export default TodoList;