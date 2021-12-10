import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    FavoritesReducerStateType,
    setFavorites,
    setFavoritesAC
} from "../../../2-store/3-favorites-reducer/favorites-reducer";
import {AppRootStateType} from "../../../2-store/store";
import {ResultItem} from "../1-Search/Results/ResultItem/ResultItem";


export const Favorites = () => {

    const dispatch = useDispatch()
    const favoritesState = useSelector<AppRootStateType, FavoritesReducerStateType>(state => state.favorites)

    useEffect(() => {
        dispatch(setFavorites())

        return () => {
            dispatch(setFavoritesAC([]))
        }
    }, [])

    const items = favoritesState.movies.map(item => <ResultItem key={item.imdbID} item={item}/>)

    return(
        <div>
            <div style={{padding:'20px'}}>
                <h2>Favorites</h2>
            </div>
            {favoritesState.movies.length === 0
                ? <div style={{display: "flex", justifyContent: 'center'}}><h3>No favorite movies </h3></div>
                : items}
        </div>
    )
}