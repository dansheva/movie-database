import React from "react";
import Toolbar from "@mui/material/Toolbar";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LinearProgress from "@mui/material/LinearProgress";
import AppBar from "@mui/material/AppBar";
import s from './Header.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../2-store/store";

export const Header = () => {

    const state = useSelector<AppRootStateType, AppRootStateType>(state => state)


    return(
        <AppBar position="static">
            <Toolbar>
                <Link to={'/'}>
                    <h1 className={s.title}>Movie database</h1>
                </Link>
                <Link to={'/favorites'}>
                    <IconButton>
                        <FavoriteIcon sx={{color: '#fff'}}/>
                    </IconButton>
                </Link>
            </Toolbar>
            {state.app.isLoading && <LinearProgress/>}
        </AppBar>
    )
}