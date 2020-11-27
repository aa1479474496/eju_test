import * as React from 'react';
import { Button, Card } from 'antd';
import Counter from '@/store/Counter';

export default () => {
  let counter = Counter.useContainer();
  return (
    <div>
      <Button type="primary" onClick={counter.decrement}>decrement Button</Button>
      <span>{counter.count}</span>
      <Button type="primary" onClick={counter.increment}>increment Button</Button>
    </div>
  )
}