import "../styles/AccentLayer.css";

function AccentLayer(){

    return(

        <div className="accent-layer">

            <div className="corner corner-tl"></div>
            <div className="corner corner-tr"></div>
            <div className="corner corner-bl"></div>
            <div className="corner corner-br"></div>

            <div className="accent-bar bar-1"></div>
            <div className="accent-bar bar-2"></div>
            <div className="accent-bar bar-3"></div>

            <div className="accent-square square-1"></div>
            <div className="accent-square square-2"></div>

        </div>

    );

}

export default AccentLayer;