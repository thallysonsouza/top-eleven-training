import "./ConfirmDialog.css";

import { TriangleAlert } from "lucide-react";
import Button from "../Button/Button";

function ConfirmDialog({

    title,

    message,

    confirmText,

    onConfirm,

    onCancel

}){

    return(

        <div className="confirm-overlay">

            <div className="confirm-dialog">

                <div className="confirm-icon">

                    <TriangleAlert size={44}/>

                </div>

                <h2>

                    {title}

                </h2>

                <p>

                    {message}

                </p>

                <div className="confirm-buttons">

                    <Button

                        variant="secondary"

                        onClick={onCancel}

                    >

                        Cancel

                    </Button>

                    <Button

                        variant="danger"

                        onClick={onConfirm}

                    >

                        {confirmText}

                    </Button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmDialog;