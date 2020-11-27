import React, { useEffect } from 'react';
import Detail from '../models';

import { Button, Tag } from 'antd';


const List = () => {
  let detail = Detail.useContainer();
  let { list, addList, delList } = detail;
  useEffect(() => {
    addList();

    // setInitialState({ 
    //   list: [{ id: '测试' }] 
    // });
    console.log('effect');
    // setTimeout(() => {
    // }, 1000);
  }, []);
  return (
    <div>
      <p>list</p>
      <Button type="primary" onClick={addList}>add</Button>
      <Button type="primary" onClick={() => delList(2)}>del</Button>
      {
        list.map(item => (
          <Tag key={item.id} closable onClose={() => delList(item.id)}>
            {item.id}
          </Tag>
        ))
      }
    </div>
  )

}

export default List;