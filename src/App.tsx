import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import {Details} from "./1-ui/2-pages/2-Details/Details";
import {Search} from "./1-ui/2-pages/1-Search/Search";
import {Favorites} from "./1-ui/2-pages/3-Favorites/Favorites";
import {NotFound} from "./1-ui/2-pages/4-NotFound/NotFound";
import {Header} from "./1-ui/1-common-components/Header/Header";
import {AppRootStateType} from "./2-store/store";
import {useSelector} from "react-redux";
import {ErrorSnackbar} from "./1-ui/1-common-components/ErrorSnackbar/ErrorSnackbar";


function App() {

    const state = useSelector<AppRootStateType, AppRootStateType>(state => state)

    console.log(state.search.Search)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Search/>}/>
                <Route path={'/details/:movieId'} element={<Details/>}/>
                <Route path={'/favorites'} element={<Favorites/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
