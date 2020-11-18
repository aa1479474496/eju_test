import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import styles from './style.scss';


const EditPage: React.FC = ({global, dispatch}) => {
  let { theme } = global;
  const toggleTheme = () => {
    let _theme = theme == 'light' ? 'dark' : 'light';
    dispatch({
      type: 'global/changeTheme',
      payload: _theme
    });
  }
  return (
    <div className={styles.editWrapper}>
      <p>edit page {theme}</p>
      <Button type="primary" className="test" onClick={toggleTheme}>test</Button>
    </div>
  )
}

export default connect(({ global }) => ({
  global,
}))(EditPage);
