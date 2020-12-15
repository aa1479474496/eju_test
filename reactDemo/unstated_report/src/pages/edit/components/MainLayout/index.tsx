import React from 'react';
import cls from 'classnames';
import { Rnd } from "react-rnd";


import Details, { ItemDataType } from '@/models/details';

import GridItem from '@/components/Grid/index.tsx';

import styles from './index.scss';

const MainLayout = () => {

  let detailsContainer = Details.useContainer();
  let { pages, activeIndex } = detailsContainer;
  let curPage = pages[activeIndex] || {};
  let pageDatas: ItemDataType[] = curPage.data || [];

  const RenderGrid = () => {
    console.log('pageDatas', pageDatas);
    const getStyle = (item: ItemDataType): React.CSSProperties => {
      return {
        position: 'absolute',
        border: '1px solid #2f54eb'
      }
    }
    let grids = pageDatas.map((item, index) =>
      (
        <Rnd
          style={getStyle(item)}
          key={item.type + index}
          default={{
            x: Number(item.x),
            y: Number(item.y),
            width: item.w,
            height: item.h
          }}
        >
          <GridItem type={item.type} item={item} />
        </Rnd>
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
