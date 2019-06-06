const AppReducer = (state = '', action) => {
    switch (action.type) {
        // case "UPDATE":
        //     return {
        //         ...state,
        //         [action.data.key]: action.data.value
        //     }
        //     case "SET_LOADING":
        //         return {
        //             ...state,
        //             locDataSuggest: {
        //                 ...state.locDataSuggest,
        //                 isLoading: true,
        //             }
        //         }
        default:
            return state
    }
}

export default AppReducer;
