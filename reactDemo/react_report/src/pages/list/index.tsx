import React from 'react';


const ListPage: React.FC = ({children}) => {
  return (
    <div>
      <h3>list index</h3>
      {children}
    </div>
  )
}

export default ListPage;