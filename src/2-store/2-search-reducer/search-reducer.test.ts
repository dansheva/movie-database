import {searchReducer, SearchReducerStateType, setSearchAC} from "./search-reducer";

let state: SearchReducerStateType

beforeEach(() => {
    state = {
        Search: [
            {Title: 'Title1', Year: 'Year1', imdbID: 'imdbID1', Type: 'Type1', Poster: 'Poster1'},
            {Title: 'Title2', Year: 'Year2', imdbID: 'imdbID2', Type: 'Type2', Poster: 'Poster2'},
            {Title: 'Title3', Year: 'Year3', imdbID: 'imdbID3', Type: 'Type3', Poster: 'Poster3'},
        ],
        totalResults: '5',
        title: 'Title',
        page: 1,
    }
})


test('movies should be added', () => {
    const action = setSearchAC([
        {Title: 'Title5', Year: 'Year5', imdbID: 'imdbID5', Type: 'Type5', Poster: 'Poster5'},
        {Title: 'Title6', Year: 'Year6', imdbID: 'imdbID6', Type: 'Type6', Poster: 'Poster6'},
    ])
    const newState = searchReducer(state, action)

    expect(newState === state).toBe(false)
    expect(newState.Search.length).toBe(2)
    expect(newState.Search[0].Title).toBe('Title5')
    expect(newState.page).toBe(1)
    expect(newState.title).toBe('Title')
    expect(newState.totalResults).toBe('5')
})