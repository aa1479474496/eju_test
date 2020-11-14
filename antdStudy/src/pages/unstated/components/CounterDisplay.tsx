import * as React from 'react';
import { Button, Card } from 'antd';
import Counter from '@/store/Counter';

export default () => {
  let counter = Counter.useContainer();
  return (
    <div>
      <Button type="primary" onClick={counter.decrement}>Default Button</Button>
      <span>{counter.count}</span>
      <Button type="primary" onClick={counter.increment}>Default Button</Button>
    </div>
  )
}