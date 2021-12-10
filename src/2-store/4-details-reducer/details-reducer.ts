import {Dispatch} from "redux";
import {AppActionsTypes, setErrorAC, setIsLoadingAC} from "../1-app-reducer/app-reducer";
import {moviesApi} from "../../3-dal/movies-api";
import {SearchMovieType} from "../2-search-reducer/search-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store";

type MovieType = {
    Title: string
    Year: string
    Released?: string
    Runtime?: string
    Genre?: string
    Director?: string
    Actors?: string
    Poster?: string
}

export type DetailsReducerStateType = {
    movie: MovieType | null
    isFav: boolean
}

const initialState: DetailsReducerStateType = {
    movie: null,
    isFav: false
}

export const detailsReducer = (state = initialState, action: DetailsActionsTypes): DetailsReducerStateType => {
    switch (action.type) {
        case "SET_MOVIE":
            return {...state, movie: action.movie}
        case "SET_IS_FAVORITE":
            return {...state, isFav: action.isFav}
        default:
            return state
    }
}

type DetailsActionsTypes = SetMovieActionType | SetIsFavActionType


type SetMovieActionType = ReturnType<typeof setMovieAC>
export const setMovieAC = (movie: MovieType | null) => ({
        type: 'SET_MOVIE',
        movie
    } as const
)

type SetIsFavActionType = ReturnType<typeof setIsFavAC>
export const setIsFavAC = (isFav: boolean) => ({
        type: 'SET_IS_FAVORITE',
        isFav
    } as const
)


export const setIsFav = (movieId: string) => (dispatch: Dispatch) => {
    const favorites = localStorage.getItem('favorites')
    if (favorites) {
        const favoritesArr: SearchMovieType[] = JSON.parse(favorites)
        dispatch(setIsFavAC(favoritesArr.some(i => i.imdbID === movieId)))
    }
}

export const addRemoveFromFavorites = (movie: SearchMovieType, isAdd: boolean) => (dispatch: Dispatch) => {
    if (isAdd) {
        const favorites = localStorage.getItem('favorites')
        if (favorites) {
            const favoritesArr: SearchMovieType[] = JSON.parse(favorites)
            localStorage.setItem('favorites', JSON.stringify([movie, ...favoritesArr]))
            dispatch(setIsFavAC(true))
        } else {
            localStorage.setItem('favorites', JSON.stringify([movie]))
            dispatch(setIsFavAC(true))
        }
    } else {
        const favorites = localStorage.getItem('favorites')
        if (favorites) {
            const favoritesArr: SearchMovieType[] = JSON.parse(favorites)
            localStorage.setItem('favorites', JSON.stringify(favoritesArr.filter(i => i.imdbID !== movie.imdbID)))
            dispatch(setIsFavAC(false))
        }
    }
}

export const setMovieDetails = (movieId: string) => (dispatch: ThunkDispatch<AppRootStateType, void, DetailsActionsTypes | AppActionsTypes>) => {
    dispatch(setIsLoadingAC(true))
    moviesApi.getMovie(movieId)
        .then(res => {
            if (res.data.Response === 'True') {
                const data = {
                    Title: res.data.Title,
                    Year: res.data.Year,
                    Released: res.data.Released,
                    Runtime: res.data.Runtime,
                    Genre: res.data.Genre,
                    Director: res.data.Director,
                    Actors: res.data.Actors,
                    Poster: res.data.Poster,
                }
                dispatch(setMovieAC(data))
                dispatch(setIsLoadingAC(false))
                dispatch(setIsFav(movieId))
            } else {
                dispatch(setErrorAC(res.data.Error ? res.data.Error : 'Err'))
                dispatch(setIsLoadingAC(false))
            }
        })
        .catch(err => {
            dispatch(setErrorAC(err.toString()))
            dispatch(setIsLoadingAC(false))
        })
}