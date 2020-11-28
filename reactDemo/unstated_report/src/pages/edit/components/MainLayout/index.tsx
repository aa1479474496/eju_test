import React from 'react';
import cls from 'classnames';

import styles from './index.scss';
type MainLayoutProps = {
  curPage: {
    data?: any[];
  }
}

const MainLayout = (props: MainLayoutProps) => {
  let { curPage = {} } = props;
  let { data = [] } = curPage;


  const RenderGrid = () => {
    let grids = data.map((item, index) => (
    <p key={item.type + index}>{item.type}-{index}</p>
    ));
    
    return (
      <>
        {grids}
      </>
    )
  }
  return (
    <div className={styles.edit_main_layout}>
      <div className={styles.middle_content}>
        <div className={styles.dash_main}>
          <p>middle_content</p>
          <RenderGrid />
        </div>
      </div>
    </div>
  )
}

export default MainLayout;

// const renderGrid = data.map((item, index) => (
//   <p key={item.type + index}>{item.type}</p>
// ));
// {renderGrid}
