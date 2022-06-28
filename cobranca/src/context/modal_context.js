import { createContext } from "react";
import useModalProvider from '../hooks/useModalProvider'

const ModalContextApi = createContext({})

export function ModalContextProvider(props) {
    const modalProvider = useModalProvider()

    return (
        <ModalContextApi.Provider value={modalProvider}>{props.children}</ModalContextApi.Provider>
    )
}

export default ModalContextApi