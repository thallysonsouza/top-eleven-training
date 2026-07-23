import "../styles/ParticleLayer.css";

function ParticleLayer() {

    const particles = Array.from({ length: 40 });

    return (

        <div className="particle-layer">

            {particles.map((_, index) => (

                <span
                    key={index}
                    className={`particle particle-${index + 1}`}
                />

            ))}

        </div>

    );

}

export default ParticleLayer;