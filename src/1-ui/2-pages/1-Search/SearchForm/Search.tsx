import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import s from './Search.module.css'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {setSearchedMovies} from "../../../../2-store/2-search-reducer/search-reducer";
import {AppRootStateType} from "../../../../2-store/store";
import {AppReducerStateType} from "../../../../2-store/1-app-reducer/app-reducer";
import background from '../../../../assets/img/522-min-min.jpg'

type FormikErrorType = {
    search?: string
}


export const Search = () => {

    const dispatch = useDispatch()

    const appState = useSelector<AppRootStateType, AppReducerStateType>(state => state.app)

    const formik = useFormik({
        initialValues: {
            search: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.search) {
                errors.search = 'Required';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(setSearchedMovies(values.search, '1'))
        },
    })


    return (
        <div className={s.container}>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.searchForm} >
                    <TextField id="outlined-basic"
                               label="Search film..."
                               variant="outlined"
                               name={'search'}
                               onChange={formik.handleChange}
                               value={formik.values.search}
                               error={formik.touched.search && Boolean(formik.errors.search)}
                               disabled={appState.isLoading}
                    />
                    <Button variant="contained"
                            type={'submit'}
                            disabled={appState.isLoading}>Search
                    </Button>
                </div>
            </form>
        </div>
    )
}