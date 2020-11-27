import React, { useEffect, useState, useRef } from 'react';
import { createContainer } from "unstated-next";

type InitialStateProps = {
  list?: any[];
  notices?: any[];
}
let id = 1;

function useDetail(initialState:InitialStateProps) {
  // let {list = [], notices = []} = initialState;
  const [initState, setInitState] = useState(initialState);
  const [list = [], setList] = useState(initState.list);
  const listRef = useRef(list);
  listRef.current = list;

  // let setState = (state:InitialStateProps) => {
  //   setInitState(state);
  // }

  let addList = () => {
    let _list = [...list].concat({id: id++});
    setList(_list);
  }

  let delList = (id:string | number) => {
    let _list = list.filter(item =>(item.id != id));
    setList(_list);
  }

  useEffect(() =>{
    // setInterval(() =>{console.log('lllll', listRef);}, 3000);
  }, [])

  return {list, setList, addList, delList}
}

let Detail = createContainer(useDetail);
export default Detail;