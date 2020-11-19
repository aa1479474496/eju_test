import React from 'react';


type DetailHeaderProps = {
  info: {
    name?: string;
  }
}

const DetailHeader: React.FC<DetailHeaderProps> = (props) => {
  console.log('props::', props);
  let { info } = props;
  return (
    <div>{info.name}</div>
  )
}

export default DetailHeader;