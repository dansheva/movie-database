import {Dispatch} from "redux";
import {setErrorAC, setIsLoadingAC} from "../1-app-reducer/app-reducer";
import {moviesApi} from "../../3-dal/movies-api";

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
}

const initialState: DetailsReducerStateType = {
    movie: null
}

export const detailsReducer = (state = initialState, action: DetailsActionsTypes): DetailsReducerStateType => {
    switch (action.type) {
        case "SET_MOVIE":
            return {...state, movie: action.movie}
        default:
            return state
    }
}

type DetailsActionsTypes = SetMovieActionType


type SetMovieActionType = ReturnType<typeof setMovieAC>
export const setMovieAC = (movie: MovieType | null) => ({
        type: 'SET_MOVIE',
        movie
    } as const
)

export const setMovieDetails = (movieId: string) => (dispatch: Dispatch) => {
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