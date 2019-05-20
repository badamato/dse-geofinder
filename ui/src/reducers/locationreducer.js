const initialState = {
        isLoading: false,
        locData: {},
}
const LocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE":
            return {
                ...state,
                locData: action.data.value,
                isLoading: false,
            }
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