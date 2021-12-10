import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "./1-app-reducer/app-reducer";
import {searchReducer} from "./2-search-reducer/search-reducer";
import {favoritesReducer} from "./3-favorites-reducer/favorites-reducer";
import thunkMiddleware from 'redux-thunk'
import {detailsReducer} from "./4-details-reducer/details-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    search: searchReducer,
    favorites: favoritesReducer,
    details: detailsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>