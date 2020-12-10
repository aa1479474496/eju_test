import React from 'react';
import { ItemDataType } from '@/models/details';

const ImageGrid = ({itemData}:{itemData: ItemDataType}) => {
  // let {  }
  console.log('------', itemData);
  let { data }= itemData;
  let src = data?.src || '';
  return (
    <img className="com_img" src={src} alt=""/>
  )
}

export default ImageGrid;