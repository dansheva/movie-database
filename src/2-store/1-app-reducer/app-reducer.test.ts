import {appReducer, AppReducerStateType, setErrorAC, setIsLoadingAC} from './app-reducer'

let state: AppReducerStateType

beforeEach(() => {
    state = {
        errors: null,
        isLoading: false
    }
})

test('loading should be set', () => {
    const action = setIsLoadingAC(true)
    const newState = appReducer(state, action)

    expect(newState === state).toBe(false)
    expect(newState.isLoading).toBe(true)
    expect(newState.errors).toBe(null)
})

test('error should be set', () => {
    const action = setErrorAC('Error')
    const newState = appReducer(state, action)

    expect(newState === state).toBe(false)
    expect(newState.isLoading).toBe(false)
    expect(newState.errors).toBe('Error')
})
