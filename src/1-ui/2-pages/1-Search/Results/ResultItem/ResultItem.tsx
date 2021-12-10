import React from "react";
import {SearchMovieType} from "../../../../../2-store/2-search-reducer/search-reducer";
import s from './ResultItem.module.css'
import {Link} from "react-router-dom";

type PropsType = {
    item: SearchMovieType
}

export const ResultItem = React.memo( ({item}: PropsType) => {
    return(
        <Link to={`../details/${item.imdbID}`}>
            <div className={s.container}>
                <div className={s.imageContainer}>
                    <img src={item.Poster} alt="Poster"/>
                </div>
                <div>
                    <div className={s.title}>{item.Title}</div>
                    <div className={s.year}>{item.Year}</div>
                    <div className={s.type}>{item.Type}</div>
                </div>
            </div>
        </Link>
    )
})