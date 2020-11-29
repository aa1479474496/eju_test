import React, { useEffect, createContext, useContext } from 'react';
import cls from 'classnames';

import { Dispatch } from 'umi';
import { connect } from 'dva';
import { Button } from 'antd';
import { GlobalModelState } from '@/models/global';

import Details from '@/models/details';

import styles from './style.scss';

import DetailHeader from '@/components/DetailHeader';
import SideBar from './components/SideBar';
import MainLayout from './components/MainLayout';
import DashAttr from '@/components/DashAttr';

interface EditPageProps {
  global: GlobalModelState;
  dispatch: Dispatch;
}

const EditPage: React.FC<EditPageProps> = (props) => {
  let { global, dispatch } = props;
  let { theme, info, tables, maps, activeKey, data } = global;

  let curPage = data.pages[activeKey] || {}; // ppt当前页

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
    <div className={cls('com_container')}>
      <Details.Provider>
        <DetailHeader />
        <div className={styles.dash_edit_pages}>
          <SideBar/>
          <MainLayout curPage={curPage} />
          <DashAttr />
        </div>

        {/* <p>edit page {theme}</p> */}
        {/* <Button type="primary" className="test" onClick={toggleTheme}>test</Button> */}
      </Details.Provider>
    </div>
  )
}

export default connect(({ global }: { global: GlobalModelState }) => ({
  global,
}))(EditPage);
