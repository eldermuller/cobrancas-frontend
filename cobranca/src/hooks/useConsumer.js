import { useContext } from "react";
import ContextApi from "../context/context";

export default function useConsumer() {
    return useContext(ContextApi)
}