import "./CreateCard.css";

function CreateCard({

    title,

    description,

    icon: Icon,

    onClick

}){

    return(

        <button

            className="create-card"

            onClick={onClick}

        >

            <div className="create-card-icon">

                <Icon size={52}/>

            </div>

            <h3>

                {title}

            </h3>

            <p>

                {description}

            </p>

        </button>

    );

}

export default CreateCard;