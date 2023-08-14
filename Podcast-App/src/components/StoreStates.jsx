import { createContext, useContext, useState } from "react"

const StoreStates = createContext()

export function StoreStatesFunc(){
     useContext(StoreStates)
} 

export default function StatesProvider({children}){
    const [ playerAudio, setPlayerAudio ] = useState(null)
    const [ playerTitle, setPlayerTitle ] = useState(null)

    return(
        <StoreStates.Provider value={{ playerAudio, setPlayerAudio, playerTitle, setPlayerTitle }}>
            {children}
        </StoreStates.Provider>
    )
}