import * as React from 'react';
import Skeleton from "@/components/skeleton/Skeleton";
{/* <Skeleton loading={true}></Skeleton> */}

console.log('----',Skeleton);
export default () => {
  return (
    <Skeleton loading={true}></Skeleton> 
  )
}