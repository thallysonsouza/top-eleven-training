import {

    createContext,
    useContext,
    useState

} from "react";

import ToastContainer from "../components/ui/Toast/ToastContainer";

const ToastContext = createContext();

export function ToastProvider({ children }){

    const [toasts,setToasts]=useState([]);

    function showToast(message,type="info"){

        const id=Date.now();

        setToasts(previous=>[

            ...previous,

            {

                id,
                message,
                type

            }

        ]);

        setTimeout(()=>{

            removeToast(id);

        },3000);

    }

    function removeToast(id){

        setToasts(previous=>

            previous.filter(toast=>

                toast.id!==id

            )

        );

    }

    return(

        <ToastContext.Provider

            value={{

                showToast

            }}

        >

            {children}

            <ToastContainer

                toasts={toasts}

                removeToast={removeToast}

            />

        </ToastContext.Provider>

    );

}

export function useToast(){

    return useContext(ToastContext);

}