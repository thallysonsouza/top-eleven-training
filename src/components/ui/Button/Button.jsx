import "./Button.css";

function Button({

    children,

    variant="primary",

    icon,

    onClick,

    type="button",

    disabled=false

}){

    return(

        <button

            type={type}

            onClick={onClick}

            disabled={disabled}

            className={`button button-${variant}`}

        >

            {icon}

            {children}

        </button>

    );

}

export default Button;