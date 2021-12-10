import React from "react";
import {useParams} from "react-router-dom";


export const Details = () => {

    const params = useParams();

    return(
        <div>
            {params.movieId}
            <h2>Details</h2>
        </div>
    )
}