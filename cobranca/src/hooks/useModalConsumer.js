import { useContext } from "react";
import ModalContextApi from "../context/modal_context";

export default function useModalConsumer() {
    return useContext(ModalContextApi)
}