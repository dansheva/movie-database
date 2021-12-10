import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import {Details} from "./1-ui/2-pages/2-Details/Details";
import {Search} from "./1-ui/2-pages/1-Search/Search";
import {Favorites} from "./1-ui/2-pages/3-Favorites/Favorites";
import {NotFound} from "./1-ui/2-pages/4-NotFound/NotFound";

function App() {
    return (
        <div className="App">
            <h1>Movie database</h1>
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
