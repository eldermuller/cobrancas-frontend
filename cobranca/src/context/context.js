import { createContext } from "react";
import useProvider from '../hooks/useProvider'

const ContextApi = createContext({})

export function ContextProvider(props) {
    const theProvider = useProvider()

    return (
        <ContextApi.Provider value={theProvider}>{props.children}</ContextApi.Provider>
    )
}

export default ContextApi