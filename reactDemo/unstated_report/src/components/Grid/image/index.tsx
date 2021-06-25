import React from 'react';
import { ItemDataType } from '@/models/details';

const ImageGrid = ({itemData}:{itemData: ItemDataType}) => {
  // let {  }
  console.log('------ img', itemData);
  let { data }= itemData;
  let src = data?.src || '';
  return (
      <img className="com_img" src={src} alt="" draggable="false"/>
  )
}

export default ImageGrid;