import React, { useRef } from 'react';

const CreateRef:React.FC = () => {
    const inputEl = useRef<HTMLInputElement>(null);

    const onFocusClick = () => {
        console.log('inputEl',inputEl)
        if (inputEl && inputEl.current) {
            inputEl.current.focus();
        }
    }

    return (
        <div>
            <input type="text" ref={inputEl}/>
            <button onClick={onFocusClick}>Focus the input</button>
        </div>
    )
}

export default CreateRef;