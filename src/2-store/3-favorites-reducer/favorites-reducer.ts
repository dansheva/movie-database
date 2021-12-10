import {Dispatch} from "redux";

type MovieType = {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

export type FavoritesReducerStateType = {
    movies: MovieType[]
}

const initialState: FavoritesReducerStateType = {
    movies: [],
}

export const favoritesReducer = (state = initialState, action: FavoritesActionsTypes): FavoritesReducerStateType => {
    switch (action.type) {
        case "SET_FAVORITE_MOVIES":
            return {...state, movies: action.favoritesMovies}
        default:
            return state
    }
}

type FavoritesActionsTypes = SetFavoritesActionType

type SetFavoritesActionType = ReturnType<typeof setFavoritesAC>
export const setFavoritesAC = (favoritesMovies: MovieType[]) => ({
        type: 'SET_FAVORITE_MOVIES',
        favoritesMovies
    } as const
)


export const setFavorites = () => (dispatch: Dispatch) => {
    const favorites = localStorage.getItem('favorites')
    if (!favorites || JSON.parse(favorites).length === 0) {
        dispatch(setFavoritesAC([]))
    } else {
        dispatch(setFavoritesAC(JSON.parse(favorites)))
    }
}