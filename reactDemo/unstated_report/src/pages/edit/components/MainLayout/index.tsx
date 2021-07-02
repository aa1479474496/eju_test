import React, { memo, useMemo } from 'react';
import cls from 'classnames';
import { Rnd } from "react-rnd";

// models
import Details, { ItemDataType } from '@/models/details';
import { useEditItem } from '@/models/editItem';

// component
import GridItem from '@/components/Grid/index';

// style
import styles from './index.scss';

// 拖拽组件定义的ts类型
type DraggableData = {
  node: HTMLElement,
  x: number,
  y: number,
  deltaX: number, 
  deltaY: number,
  lastX: number, 
  lastY: number
};

const _MainLayout = () => {
  let detailsContainer = Details.useContainer();
  const { modItem } = useEditItem();

  let { pages, activeIndex } = detailsContainer;
  let curPage = pages[activeIndex] || {};
  let pageDatas: ItemDataType[] = curPage.data || [];


  console.log('curPage', curPage);

  const onDragStart = (itemData: ItemDataType) => {
    //TODO 设置点击的元件为current
    // console.log('ddddd', itemData);
  }

  const onDragStop = (e: any, data: DraggableData, itemData: ItemDataType) => {
    // TODO 得到返回的新的x,y 更新pageDatas
    // console.log('eeeee', e);
    // console.log('data', data);
    // console.log('pages', pages);

    let { x, y } = data;
    let newItem = {
      ...itemData,
      x,
      y
    }
    modItem(newItem);
  }

  let _onResizeStop = (e: MouseEvent | TouchEvent, dir: string, refToElement:HTMLElement, delta: { width: number, height: number }, position: { x: number, y: number }, itemData: ItemDataType) => {
    let { width, height } = refToElement.style;
    let newItem = {
      ...itemData,
      w: parseFloat(width),
      h: parseFloat(height)
    }
    modItem(newItem);
  }

  let onResizeStop = useMemo(() => _onResizeStop, [pageDatas]);

  // const onResizeStop = useMemo(() => {

  // }, [pageDatas])



  const RenderGrid = useMemo(() => {
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
          key={item.i}
          bounds="parent"
          default={{
            x: Number(item.x),
            y: Number(item.y),
            width: item.w,
            height: item.h
          }}
          onDragStart={() => onDragStart(item)}
          onDragStop={(e,data) => onDragStop(e,data,item)}
          onResizeStop={(e,dir,refToElement,data,position) => onResizeStop(e,dir,refToElement,data,position,item)}
        >
          <GridItem type={item.type} item={item} />
        </Rnd>
      ));

    return (
      <>
        {grids}
      </>
    )
  },[pageDatas]);


  return (
    <div className={styles.edit_main_layout}>
      <div className={styles.middle_content}>
        <div className={styles.dash_main}>
          {RenderGrid}
          {/* <RenderGrid /> */}
        </div>
      </div>
    </div>
  )
}
const MainLayout = memo(_MainLayout);
export default MainLayout;

// const renderGrid = data.map((item, index) => (
//   <p key={item.type + index}>{item.type}</p>
// ));
// {renderGrid}
