import React from 'react';
import { dynamic } from 'umi';


const DynamicFunc = (type: string) => {
  return dynamic({
    loader: async function () {
      // let Component;

      const { default: Graph } = await import(
        `@/components/Grid/${type}`
      );
      // return Graph;
      return () => {
        return <Graph />;
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
};

const GridItem = (props: ItemType) => {
  // return <DynamicFunc {...props} />;
  let Item = DynamicFunc(props.type);
  // console.log('-------',Item);
  return (
    <Item />
  )

}

export default GridItem;