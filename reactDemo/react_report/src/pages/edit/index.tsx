import React, {useEffect} from 'react';
import cls from 'classnames';

import { Dispatch } from 'umi';
import { connect } from 'dva';
import { Button } from 'antd';
import { GlobalModelState } from '@/models/global';

import styles from './style.scss';

interface EditPageProps {
  global: GlobalModelState;
  dispatch: Dispatch;
}

const EditPage: React.FC<EditPageProps> = (props) => {
  let { global, dispatch } = props;
  let { theme } = global;
  const toggleTheme = () => {
    let _theme = theme == 'light' ? 'dark' : 'light';
    dispatch({
      type: 'global/changeTheme',
      payload: _theme
    });
  }

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'global/loadData',
      });
    }
  }, []);

  return (
    <div className={cls('comContainer', styles.editWrapper)}>
      <p>edit page {theme}</p>
      <Button type="primary" className="test" onClick={toggleTheme}>test</Button>
    </div>
  )
}

export default connect(({ global }: { global: GlobalModelState }) => ({
  global,
}))(EditPage);
