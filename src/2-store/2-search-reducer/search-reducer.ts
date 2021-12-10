import {Dispatch} from "redux";
import {setErrorAC, setIsLoadingAC} from "../1-app-reducer/app-reducer";
import {moviesApi} from "../../3-dal/movies-api";

type MovieType = {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

type SearchReducerStateType = {
    Search: MovieType[]
    totalResults: string
}

const initialState: SearchReducerStateType = {
    Search: [],
    totalResults: '0',
}

export const searchReducer = (state = initialState, action: SearchActionsTypes): SearchReducerStateType => {
    switch (action.type) {
        case "SET_SEARCH":
            return {...state, Search: action.search}
        case "SET_TOTAL_RESULTS":
            return {...state, totalResults: action.total}
        default:
            return state
    }
}

type SearchActionsTypes = SetSearchActionType | SetTotalResultsActionType


type SetSearchActionType = ReturnType<typeof setSearchAC>
const setSearchAC = (search: MovieType[]) => ({
        type: 'SET_SEARCH',
        search
    } as const
)

type SetTotalResultsActionType = ReturnType<typeof setTotalResultsAC>
const setTotalResultsAC = (total: string) => ({
        type: 'SET_TOTAL_RESULTS',
        total
    } as const
)


export const setSearchedMovies = (searchTitle: string, page: string) => (dispatch: Dispatch) => {
    dispatch(setErrorAC(null))
    dispatch(setIsLoadingAC(true))
    moviesApi.search(searchTitle, page)
        .then(res => {
            if (res.data.Response === 'True') {
                if (res.data.Search && res.data.totalResults) {
                    dispatch(setSearchAC(res.data.Search))
                    dispatch(setTotalResultsAC(res.data.totalResults))
                }
                dispatch(setIsLoadingAC(false))
            } else {
                dispatch(setErrorAC(res.data.Error ? res.data.Error : 'Error'))
                dispatch(setIsLoadingAC(false))
            }
        })
        .catch(err => {
            dispatch(setErrorAC(err.toString()))
            dispatch(setIsLoadingAC(false))
        })
}