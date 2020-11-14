import * as React from 'react';
import { Card } from 'antd';
import Counter from '@/store/Counter';

export default () => {
  let counter = Counter.useContainer();
  return (
    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>{counter.count}</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  )
}

