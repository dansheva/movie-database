import React from "react";
import {Search} from "./SearchForm/Search";
import {Results} from "./Results/Results";
import Pagination from "@mui/material/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../2-store/store";
import {SearchReducerStateType, setSearchedMovies} from "../../../2-store/2-search-reducer/search-reducer";
import s from './SearchPage.module.css'

export const SearchPage = () => {

    const searchState = useSelector<AppRootStateType, SearchReducerStateType>(state => state.search)
    const dispatch = useDispatch()

    const pageCount = Math.ceil(+searchState.totalResults / 10);

    const onChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setSearchedMovies(searchState.title, value.toString()))
    }

    return (
        <div>
            <Search/>
            <Results/>
            {pageCount > 1
                ? <div className={s.pagination}>
                    <Pagination page={searchState.page} count={pageCount} color="primary" onChange={onChange}/>
                </div>
                : null
            }
        </div>
    )
}