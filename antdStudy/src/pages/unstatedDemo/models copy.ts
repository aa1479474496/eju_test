import React, { useEffect, useState, useRef } from 'react';
import { createContainer } from "unstated-next";

type InitialStateProps = {
  list?: any[];
  notices?: any[];
}
let id = 1;

let init = {
  list: [{ id: '测试12' }]
}

let init2 = {
  list: [{ id: 'wwwwww' }]
}

function useDetail() {
  const [initState, setInitState] = useState(init);
  const [list = [], setList] = useState(initState.list);
  const listRef = useRef(list);
  listRef.current = list;

  let addList = () => {
    let _list = [...list, {id: id++}];
    setList(_list);
  }

  let delList = (id:string | number) => {
    let _list = list.filter(item =>(item.id != id));
    setList(_list);
  }

  useEffect(() =>{
    // console.log('timeout');
    // addList();
      // setInitState({
      //   list: [{
      //     id: 'effect 测试'
      //   }]
      // })

    setTimeout(() => {
      console.log('timeout');

      let r = { ...initState, ...init2};
      console.log('rrrr', r);
      // addList();
      setInitState(r);
      

      // setList([{id:'xxxxxx'}]);
      // setInitState({
      //   list: [{
      //     id: 'effect 测试'
      //   }]
      // })
    }, 2000);
  }, []);

  return {list, setList, addList, delList}
}

let Detail = createContainer(useDetail);
export default Detail;