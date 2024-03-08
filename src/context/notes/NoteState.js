
import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState =(props)=>{
    const S1 = {
        "name": "kitty",
        "class": "12th"
    }
    const [state, setStet]= useState(S1)
    const update = ()=>{
        setTimeout(() => {
            setStet({
                "name":"atul",
                "class":"11th"
            })
        }, 1000);
    }
    return(
        <NoteContext.Provider value={{state, update }}>
           { props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;