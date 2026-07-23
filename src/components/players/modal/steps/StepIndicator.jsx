import "./StepIndicator.css";

function StepIndicator({

    step,

    totalSteps

}){

    return(

        <div className="step-indicator">

            {

                Array.from({

                    length:totalSteps

                }).map((_,index)=>{

                    const current=index+1;

                    const active=current<=step;

                    return(

                        <div

                            key={current}

                            className="step-item"

                        >

                            <div

                                className={

                                    `step-circle ${

                                        active

                                        ?

                                        "active"

                                        :

                                        ""

                                    }`

                                }

                            >

                                {current}

                            </div>

                            {

                                current<totalSteps &&

                                <div

                                    className={

                                        `step-line ${

                                            current<step

                                            ?

                                            "active"

                                            :

                                            ""

                                        }`

                                    }

                                />

                            }

                        </div>

                    );

                })

            }

        </div>

    );

}

export default StepIndicator;