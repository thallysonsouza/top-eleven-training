import { House, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import "./Breadcrumb.css";
import buildBreadcrumb from "./breadcrumb/buildBreadcrumb";

function Breadcrumb(){

    const location = useLocation();

    const items = buildBreadcrumb(
        location.pathname
    );

    return(

        <nav className="breadcrumb">

            {

                items.map((item,index)=>{

                    const isFirst = index===0;

                    const isLast = index===items.length-1;

                    return(

                        <div
                            key={index}
                            className="breadcrumb-item"
                        >

                            {

                                !isFirst &&

                                <ChevronRight size={14}/>

                            }

                            {

                                isLast || !item.path

                                ?

                                <span className="breadcrumb-current">

                                    {

                                        isFirst

                                        ?

                                        <>

                                            <House size={16}/>

                                            <span>

                                                {item.label}

                                            </span>

                                        </>

                                        :

                                        item.label

                                    }

                                </span>

                                :

                                <Link
                                    to={item.path}
                                    className="breadcrumb-link"
                                >

                                    {

                                        isFirst

                                        ?

                                        <>

                                            <House size={16}/>

                                            <span>

                                                {item.label}

                                            </span>

                                        </>

                                        :

                                        item.label

                                    }

                                </Link>

                            }

                        </div>

                    );

                })

            }

        </nav>

    );

}

export default Breadcrumb;