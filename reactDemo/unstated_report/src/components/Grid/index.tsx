import React from 'react';
import { dynamic } from 'umi';
import { ItemDataType } from '@/models/details';


const DynamicFunc = (type: string, itemData: ItemDataType) => {
  return dynamic({
    loader: async function () {
      // let Component;

      const { default: Graph } = await import(
        `@/components/Grid/${type}`
      );
      // return Graph;
      return () => {
        return <Graph itemData={itemData}/>;
      }
    },
    loading: () => (
      <div style={{ paddingTop: 10, textAlign: 'left' }}>
        111
      </div>
    ),
  });

} 

type ItemType = {
  type: string;
  item: ItemDataType
};

const GridItem = (props: ItemType) => {
  // return <DynamicFunc {...props} />;
  let Item = DynamicFunc(props.type, props.item);
  // console.log('-------',Item);
  return (
    <Item {...props}/>
  )

}

export default GridItem;