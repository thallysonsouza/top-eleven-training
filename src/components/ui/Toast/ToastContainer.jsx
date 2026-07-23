import "./Toast.css";

import Toast from "./Toast";

function ToastContainer({

    toasts,

    removeToast

}){

    return(

        <div className="toast-container">

            {

                toasts.map(toast=>(

                    <Toast

                        key={toast.id}

                        {...toast}

                        onClose={()=>

                            removeToast(toast.id)

                        }

                    />

                ))

            }

        </div>

    );

}

export default ToastContainer;