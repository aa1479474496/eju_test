import React from 'react';
import cls from 'classnames';

import Details from '@/models/details';

import styles from './index.scss';

const MainLayout = () => {

  let detailsContainer = Details.useContainer();
  let { pages, activeIndex } = detailsContainer;
  let curPage = pages[activeIndex] || {};
  let pageDatas = curPage.data || [];

  const RenderGrid = () => {
    let grids = pageDatas.map((item, index) => (
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
