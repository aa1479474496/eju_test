import React from 'react';

type UserInfo = {
    name: string,
    age: number
}

// export const User = ({name, age}: UserInfo) => {
//     return (
//         <div className="App">
//             <p>{ name }</p>
//             <p>{ age }</p>
//         </div>
//     )
// }

// const user = <User name='vortesnail' age={25} />;

// export const User: React.FC<UserInfo> = ({ name, age, children }) => {
//     return (
//         <div className="User">
//             <p>{name}</p>
//             <p>{age}</p>
//             <div>{children}</div>
//         </div>
//     )
// }

export const User: React.FC<UserInfo> = (props) => {
    return (
        <div className="User">
            <p>{props.name}</p>
            <p>{props.age}</p>
            <div>{props.children}</div>
        </div>
    )
}

