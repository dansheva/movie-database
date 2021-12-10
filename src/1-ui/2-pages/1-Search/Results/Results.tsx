import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../2-store/store";
import {SearchReducerStateType} from "../../../../2-store/2-search-reducer/search-reducer";

export const Results = () => {

    const searchState = useSelector<AppRootStateType, SearchReducerStateType>(state => state.search)

    const items = searchState.Search.map(item => {
        return (
            <div key={item.imdbID}>
                <p>{item.Title}</p>
            </div>
        )
    })

    return (
        <div>
            {items}
        </div>
    )
}