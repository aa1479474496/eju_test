import { useState } from 'react';
import { createContainer } from 'unstated-next';
import components, { ComponentName } from '@/config/components';

import DeatailsContainer, { ItemDataType, SourceDatasType } from './details';






export function useEditItem() {
  let { activeIndex, pages, setPages } = DeatailsContainer.useContainer();

  let layout = pages[activeIndex];
  let { data = [] } = layout;

  const addItem = (type:ComponentName, id?: number) => {
    // console.log('type::', type, id, layout);
    let defConf = components[type];
    let i = `${activeIndex}layout${data.length}`;
    let _conf = {
      ...defConf.config,
      type,
      i
    }
    // 根据组件类型, copy默认样式， 如果是map或者chart类型， 需要id请求数据
    let _data = [...data, _conf];
    let _layout = {
      ...layout,
        data: _data
    }

    let _pages = pages.map((page, index) => {
      if (index === activeIndex) {
        return _layout
      }
      return { ...page }
    });
    setPages(_pages);

    // console.log('_data', _layout);
    // console.log('llll', layout);
  }


  return {
    addItem
  }
}



