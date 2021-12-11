import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../2-store/store";
import {
    addRemoveFromFavorites,
    DetailsReducerStateType,
    setMovieAC,
    setMovieDetails
} from "../../../2-store/4-details-reducer/details-reducer";
import {AppReducerStateType} from "../../../2-store/1-app-reducer/app-reducer";
import s from './Details.module.css'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";

export const Details = () => {

    const params = useParams();

    const detailsState = useSelector<AppRootStateType, DetailsReducerStateType>(state => state.details)
    const appState = useSelector<AppRootStateType, AppReducerStateType>(state => state.app)
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const movie = detailsState.movie

    useEffect(() => {
        dispatch(setMovieDetails(params.movieId ? params.movieId : ''))
        return () => {
            dispatch(setMovieAC(null))
        }
    }, [dispatch, params.movieId])

    if (appState.errors === 'Incorrect IMDb ID.') {
        navigate('/404')
    }

    if (!movie) {
        return null
    }

    const addRemoveFromFav = (isAdd: boolean) => {
        const movieToAdd = {
            Title: movie.Title,
            Year: movie.Year,
            imdbID: params.movieId ? params.movieId : '',
            Type: movie.Genre? movie.Genre: '',
            Poster: movie.Poster? movie.Poster: '',
        }
        dispatch(addRemoveFromFavorites(movieToAdd, isAdd))
    }

    const addToFav = () => {
        addRemoveFromFav(true)
    }
    const removeFromFav = () => {
        addRemoveFromFav(false)
    }

    return (
        <div>
            <div className={s.movieCard}>
                <div className={s.posterContainer}>
                    <img alt="Movie Poster" src={movie.Poster}/>
                </div>
                <div className={s.details}>
                    <div className={s.title}>
                        <h2>{movie.Title}</h2>
                        {detailsState.isFav
                            ? <IconButton className={s.like} size={'small'} onClick={removeFromFav}>
                                <FavoriteIcon sx={{color: '#3b3b3b'}}/>
                            </IconButton>
                            : <IconButton className={s.like} size={'small'} onClick={addToFav}>
                                <FavoriteBorderIcon sx={{color: '#3b3b3b'}}/>
                            </IconButton>}

                    </div>
                    <div className={s.detailsRow}>
                        <div>Year:</div>
                        <div>{movie.Year}</div>
                    </div>
                    <div className={s.detailsRow}>
                        <div>Genre:</div>
                        <div>{movie.Genre}</div>
                    </div>
                    <div className={s.detailsRow}>
                        <div>Actors:</div>
                        <div>{movie.Actors}</div>
                    </div>
                    <div className={s.detailsRow}>
                        <div>Director:</div>
                        <div>{movie.Director}</div>
                    </div>
                    <div className={s.detailsRow}>
                        <div>Released:</div>
                        <div>{movie.Released}</div>
                    </div>
                    <div className={s.detailsRow}>
                        <div>Runtime:</div>
                        <div>{movie.Runtime}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}