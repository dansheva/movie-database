import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import s from './Search.module.css'
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {setSearchedMovies} from "../../../2-store/2-search-reducer/search-reducer";

type FormikErrorType = {
    search?: string
}


export const Search = () => {

    const dispatch = useDispatch()

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
                <div className={s.searchForm}>
                    <TextField id="outlined-basic"
                               label="Search film..."
                               variant="outlined"
                               name={'search'}
                               onChange={formik.handleChange}
                               value={formik.values.search}
                               error={formik.touched.search && Boolean(formik.errors.search)}
                    />
                    <Button variant="contained"
                            type={'submit'}>Search
                    </Button>
                </div>
            </form>
        </div>
    )
}