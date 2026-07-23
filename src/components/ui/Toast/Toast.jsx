import "./Toast.css";

import {

    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    Info,
    X

} from "lucide-react";

const icons = {

    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info

};

function Toast({

    type,

    message,

    onClose

}){

    const Icon = icons[type] || Info;

    return(

        <div className={`toast ${type}`}>

            <div className="toast-left">

                <Icon size={20}/>

                <span>

                    {message}

                </span>

            </div>

            <button

                onClick={onClose}

                className="toast-close"

            >

                <X size={16}/>

            </button>

        </div>

    );

}

export default Toast;