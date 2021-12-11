import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import {Details} from "./1-ui/2-pages/2-Details/Details";
import {Favorites} from "./1-ui/2-pages/3-Favorites/Favorites";
import {NotFound} from "./1-ui/2-pages/4-NotFound/NotFound";
import {Header} from "./1-ui/1-common-components/Header/Header";
import {ErrorSnackbar} from "./1-ui/1-common-components/ErrorSnackbar/ErrorSnackbar";
import {SearchPage} from "./1-ui/2-pages/1-Search/SearchPage";


function App() {

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <Routes>
                <Route path={'/'} element={<SearchPage/>}/>
                <Route path={'/details/:movieId'} element={<Details/>}/>
                <Route path={'/favorites'} element={<Favorites/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
