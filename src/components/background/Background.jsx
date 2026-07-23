import "./Background.css";

import BaseLayer from "./layers/BaseLayer";
import GlowLayer from "./layers/GlowLayer";
import GridLayer from "./layers/GridLayer";
import TechLinesLayer from "./layers/TechLinesLayer";
import HexagonLayer from "./layers/HexagonLayer";
import AccentLayer from "./layers/AccentLayer";
import ParticleLayer from "./layers/ParticleLayer";
import NoiseLayer from "./layers/NoiseLayer";
import StadiumLightsLayer from "./layers/StadiumLightsLayer";
import TacticalLayer from "./layers/TacticalLayer";
import FieldLayer from "./layers/FieldLayer";

function Background(){

    return(

        <div className="background">

            <BaseLayer />

            <GlowLayer />

            <StadiumLightsLayer />

            <GridLayer />

            <FieldLayer />

            <TechLinesLayer />

            <HexagonLayer />

            <AccentLayer />

            <TacticalLayer />

            <ParticleLayer />

            <NoiseLayer />

        </div>

    );

}

export default Background;