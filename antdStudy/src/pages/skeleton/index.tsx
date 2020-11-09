import * as React from 'react';
import Skeleton from "@/components/skeleton/Skeleton";
{/* <Skeleton loading={true}></Skeleton> */}

type ButtonProps = {
  color: string;
  text: string;
  width?: number | string;
}

type ContainerProps = ButtonProps & {
  height: number;
}

const Container: React.FC<ContainerProps> = ({color,height, width, text}) => {
  return <div style={{backgroundColor: color, height: `${height}px`}}>{text}</div>
}

export default () => {
  return (
    <>
      <Skeleton loading={true}>
      </Skeleton> 
      <Container color={'red'} height={200} text={'测试组件'}/>
    </>
  )
}