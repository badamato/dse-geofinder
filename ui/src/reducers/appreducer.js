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
        //             locData: {
        //                 ...state.locData,
        //                 isLoading: true,
        //             }
        //         }
        default:
            return state
    }
}

export default AppReducer;
