import React, { useEffect, createContext, useContext } from 'react';
import cls from 'classnames';

import { Dispatch } from 'umi';
import { connect } from 'dva';
import { Button } from 'antd';
import { GlobalModelState } from '@/models/global';

import styles from './style.scss';

import DetailHeader from '@/components/DetailHeader';

interface EditPageProps {
  global: GlobalModelState;
  dispatch: Dispatch;
}

export type InfoContextType = {
  info: {
    name?: string;
    iCanExport?: number;
  };
  changeInfo:(info: {}) => void;
}
export const InfoContext = createContext<InfoContextType>({
  info: {
    name: '',
    iCanExport: 0
  },
  changeInfo: () => {}
});


const EditPage: React.FC<EditPageProps> = (props) => {
  let { global, dispatch } = props;
  let { theme, info } = global;

  const changeInfo = (info: {}) => {
    dispatch({
      type: 'global/changeInfo',
      payload: info
    })
  }

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
      <InfoContext.Provider value={{info, changeInfo}}>
        <DetailHeader />
      </InfoContext.Provider>
      {/* <p>edit page {theme}</p> */}
      {/* <Button type="primary" className="test" onClick={toggleTheme}>test</Button> */}
    </div>
  )
}

export default connect(({ global }: { global: GlobalModelState }) => ({
  global,
}))(EditPage);
