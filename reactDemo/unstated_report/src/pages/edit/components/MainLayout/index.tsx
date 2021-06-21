import React from 'react';
import cls from 'classnames';
import { Rnd } from "react-rnd";


import Details, { ItemDataType } from '@/models/details';

import GridItem from '@/components/Grid/index';

import styles from './index.scss';

// 拖拽组件定义的ts类型
type DraggableData = {
  node: HTMLElement,
  x: number,
  y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};


const MainLayout = () => {

  let detailsContainer = Details.useContainer();
  let { pages, activeIndex } = detailsContainer;
  let curPage = pages[activeIndex] || {};
  let pageDatas: ItemDataType[] = curPage.data || [];

  const onDragStart = (itemData: ItemDataType) => {
    //TODO 设置点击的元件为current
    // console.log('ddddd', itemData);
  }

  const onDragStop = (e: any, data: DraggableData) => {
    // TODO 得到返回的新的x,y 更新pageDatas
    // console.log('eeeee', e);
    // console.log('data', data);
  }

  const onResizeStop = (e: MouseEvent | TouchEvent, dir: string, refToElement:HTMLElement, delta: { width: number, height: number }, position: { x: number, y: number }) => {
    // TODO 改变元件宽高， 更新pageDatas
    // e, dir, refToElement, delta, position
    // width: refToElement.style.width,
    // height: refToElement.style.height,
    // console.log('eeeeeee', e);
    // console.log('dir', dir);
    // console.log('refToElement', refToElement);
    // console.log('delta', delta);
    // console.log('position', position);
    console.log('width', refToElement.style.width);
    console.log('height', refToElement.style.height);
  }



  const RenderGrid = () => {
    // console.log('pageDatas', pageDatas);
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
          bounds="parent"
          default={{
            x: Number(item.x),
            y: Number(item.y),
            width: item.w,
            height: item.h
          }}
          onDragStart={() => onDragStart(item)}
          onDragStop={onDragStop}
          onResizeStop={onResizeStop}
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
