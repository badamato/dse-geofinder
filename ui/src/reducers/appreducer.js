import { initialAppState } from '../store'

const AppReducer = (state = '', action) => {
    switch (action.type) {
        case "UPDATE_APP":
            return {
                ...state,
                [action.data.key]: action.data.value
            };
            case 'RESET_MAP': {
                return {
                    ...initialAppState, 
                    "bounds": state.bounds
                }
            };
            case "SET_LOADING":
                return {
                    ...state,
                    locDataSuggest: {
                        ...state.locDataSuggest,
                        isLoading: true,
                    }
                }
        default:
            return state
    }
}

export default AppReducer;
