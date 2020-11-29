import React, { useEffect, createContext, useContext } from 'react';
import cls from 'classnames';

import Details from '@/models/details';

import styles from './style.scss';

import DetailHeader from '@/components/DetailHeader';
import SideBar from './components/SideBar';
import MainLayout from './components/MainLayout';
import DashAttr from '@/components/DashAttr';

const EditPage: React.FC = () => {

  // const toggleTheme = () => {
  //   let _theme = theme == 'light' ? 'dark' : 'light';

  // }

  return (
    <div className={cls('com_container')}>
      <Details.Provider>
        <DetailHeader />
        <div className={styles.dash_edit_pages}>
          <SideBar/>
          <MainLayout/>
          <DashAttr />
        </div>

        {/* <p>edit page {theme}</p> */}
        {/* <Button type="primary" className="test" onClick={toggleTheme}>test</Button> */}
      </Details.Provider>
    </div>
  )
}

export default EditPage;
