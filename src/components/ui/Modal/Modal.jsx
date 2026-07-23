import { X } from "lucide-react";

import "./Modal.css";

import Button from "../Button/Button";

function Modal({

    open,

    title,

    children,

    footer,

    onClose

}){

    if(!open) return null;

    return(

        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>{title}</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >

                        <X size={20}/>

                    </button>

                </div>

                <div className="modal-body">

                    {children}

                </div>

                {

                    footer &&

                    <div className="modal-footer">

                        {footer}

                    </div>

                }

            </div>

        </div>

    );

}

export default Modal;