const initialState = {
        isLoading: false,
        locDataSuggest: {},
        locDataSearch: {},
}

const LocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE":
            return {
                ...state,
                [action.data.key]: action.data.value,
                isLoading: false,
            };
            case 'RESET_MAP': {
                return {
                    ...initialState, 
                }
            };
            case "SET_LOADING":
                return {
                    ...state,
                    isLoading: true,
                }
        default:
            return state
    }
}

export default LocationReducer;