import axios from "axios";


const instance = axios.create({
    baseURL: `http://www.omdbapi.com`
})

type SearchMovieType = {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

type SearchResponse = {
    Search?: SearchMovieType[]
    totalResults: string
    Response: string
    Error?: string
}

export const moviesApi = {
    search: (searchTitle: string, page: string) => {
        return instance.get<SearchResponse>(`?apikey=81c008ab&s=${searchTitle}&page=${page}`)
    }
}