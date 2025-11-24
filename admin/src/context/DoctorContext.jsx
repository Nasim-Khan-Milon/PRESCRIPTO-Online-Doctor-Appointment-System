import { useState } from "react";
import { createContext } from "react";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl2 = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")


    const value = {
        dToken,setDToken,
        backendUrl2,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider