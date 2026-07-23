import "./IconButton.css";

function IconButton({

    children,

    variant="secondary",

    title,

    onClick,

    disabled=false,

    className=""

}){

    return(

        <button

            title={title}

            onClick={onClick}

            disabled={disabled}

            className={`icon-button icon-button-${variant} ${className}`}

        >

            {children}

        </button>

    );

}

export default IconButton;