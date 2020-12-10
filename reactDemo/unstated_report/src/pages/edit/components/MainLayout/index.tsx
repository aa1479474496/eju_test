import React from 'react';
import cls from 'classnames';

import Details, { ItemDataType } from '@/models/details';

import GridItem from '@/components/Grid/index.tsx';

import styles from './index.scss';

const MainLayout = () => {

  let detailsContainer = Details.useContainer();
  let { pages, activeIndex } = detailsContainer;
  let curPage = pages[activeIndex] || {};
  let pageDatas = curPage.data || [];

  const RenderGrid = () => {
    console.log('pageDatas', pageDatas);
    const getStyle = (item:ItemDataType):React.CSSProperties => {
      let { x, y, w ,h } = item;
      return {
        position: 'absolute',
        width: `${w}px`,
        height: `${h}px`,
        left: `${x}px`,
        top: `${y}px`,
        border: '1px solid #2f54eb'
      }
    }
    let grids = pageDatas.map((item, index) => (
      <div style={getStyle(item)} key={item.type + index}>
      {/* <div style={{'border': '1px solid #2f54eb'}} key={item.type + index}> */}

        <GridItem type={item.type}  item={item}/>
      </div>
      // <p key={item.type + index}>{item.type}-{index}</p>
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
