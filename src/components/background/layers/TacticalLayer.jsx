import "../styles/TacticalLayer.css";

function TacticalLayer(){

    return(

        <div className="tactical-layer">

            {/* Linha Superior */}

            <div className="tactical-line line-1"></div>

            <div className="tactical-node node-1"></div>

            <div className="tactical-node node-2"></div>


            {/* Linha Inferior */}

            <div className="tactical-line line-2"></div>

            <div className="tactical-node node-3"></div>

            <div className="tactical-node node-4"></div>


            {/* Arco */}

            <div className="tactical-arc"></div>

        </div>

    );

}

export default TacticalLayer;