import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

export default () => {
  return (
    <div>
      <Button type="primary">Default Button</Button>
      <h1 className={styles.title}>Welcome to Page index</h1>
    </div>
  );
}
