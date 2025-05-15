import { createContext, useContext, useState } from "react";

const CounterContext = createContext(0);


export const ContextProvider = ({ children }) => {

    const [counter, setCounter] = useState(0);

    return (
        <CounterContext.Provider value={{ counter, setCounter }}>
            {children}
        </CounterContext.Provider>
    )


}


export const useCounter = () => useContext(CounterContext);