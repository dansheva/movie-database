export type AppReducerStateType = {
    errors: string | null,
    isLoading: boolean
}

const initialState: AppReducerStateType = {
    errors: null,
    isLoading: false
}

export const appReducer = (state = initialState, action: AppActionsTypes): AppReducerStateType => {
    switch (action.type) {
        case "SET_ERROR":
            return {...state, errors: action.err}
        case "SET_IS_LOADING":
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}

type AppActionsTypes = setIsLoadingActionType | SetErrorActionType

type setIsLoadingActionType = ReturnType<typeof setIsLoadingAC>
export const setIsLoadingAC = (isLoading: boolean) => ({
        type: 'SET_IS_LOADING',
        isLoading
    } as const
)

type SetErrorActionType = ReturnType<typeof setErrorAC>
export const setErrorAC = (err: string | null) => ({
        type: 'SET_ERROR',
        err
    } as const
)