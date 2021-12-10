import {Dispatch} from "redux";
import {setErrorAC, setIsLoadingAC} from "../1-app-reducer/app-reducer";
import {moviesApi} from "../../3-dal/movies-api";

export type SearchMovieType = {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

export type SearchReducerStateType = {
    Search: SearchMovieType[]
    totalResults: string
    title: string
    page: number
}

const initialState: SearchReducerStateType = {
    Search: [],
    totalResults: '0',
    title: '',
    page: 1,
}

export const searchReducer = (state = initialState, action: SearchActionsTypes): SearchReducerStateType => {
    switch (action.type) {
        case "SET_SEARCH":
            return {...state, Search: action.search}
        case "SET_TOTAL_RESULTS":
            return {...state, totalResults: action.total}
        case "SET_TITLE":
            return {...state, title: action.title}
        case "SET_PAGE":
            return {...state, page: action.page}
        default:
            return state
    }
}

type SearchActionsTypes =
    SetSearchActionType
    | SetTotalResultsActionType
    | SetSearchingTitleActionType
    | SetPageActionType

type SetSearchActionType = ReturnType<typeof setSearchAC>
const setSearchAC = (search: SearchMovieType[]) => ({
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

type SetSearchingTitleActionType = ReturnType<typeof setSearchingTitleAC>
export const setSearchingTitleAC = (title: string) => ({
        type: 'SET_TITLE',
        title
    } as const
)

type SetPageActionType = ReturnType<typeof setPageAC>
export const setPageAC = (page: number) => ({
        type: 'SET_PAGE',
        page
    } as const
)


export const setSearchedMovies = (searchTitle: string, page: string) => (dispatch: Dispatch) => {
    dispatch(setPageAC(+page))
    dispatch(setSearchingTitleAC(searchTitle))
    dispatch(setIsLoadingAC(true))
    moviesApi.search(searchTitle, page)
        .then(res => {
            dispatch(setErrorAC(null))
            dispatch(setSearchAC([]))
            dispatch(setTotalResultsAC('0'))
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
            dispatch(setErrorAC(null))
            dispatch(setSearchAC([]))
            dispatch(setTotalResultsAC('0'))
            dispatch(setErrorAC(err.toString()))
            dispatch(setIsLoadingAC(false))
        })
}