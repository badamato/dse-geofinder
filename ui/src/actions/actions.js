import {get} from '../common/requests';



export const getGeoNameSuggest = (name, lat, lng) => dispatch => {

    dispatch(setLoading())
    const url = `/api/geo-name-suggest?name=${name}&lat=${lat}&lng=${lng}`;

        get({
            url: url,
            success: function(res){
                const names = res.data.names
                const formattedNames = names.map(name => {
                    return {
                        value: name,
                        label: name,
                    }
                })
                res.data.names = formattedNames
                dispatch(updateValue('locDataSuggest', res.data))
            },
            dispatch: dispatch
        });
}


export const getGeoNameSearch = (name, lat, lng, radius) => dispatch => {

    dispatch(setLoading())
    const url = `/api/geo-name-search?name=${name}&lat=${lat}&lng=${lng}&radius=20`;

        get({
            url: url,
            success: function(res){
                const formattedLocations = res.data.locations.map(location => {
                    return {
                        label: location.name,
                        address: location.address,
                        city: location.city,
                        province: location.province,
                        zip: location.post_code,
                        phone: location.phone,
                        geo: location.geo
                    }
                })
                res.data.locations = formattedLocations
                dispatch(updateValue('locDataSearch', res.data))
                
            },
            dispatch: dispatch
        });

}


export const getAllCategories = (lllat, lllng, urlat, urlng) => dispatch => {

    const url = `/api/geo-bbox-pivot-on-category-and-subcategory?lllat=${lllat}&lllng=${lllng}&urlat=${urlat}&urlng=${urlng}`;

        get({
            url: url,
            success: function(res){
                dispatch(updateAppValue('allCategoryData', res.data))
            },
            dispatch: dispatch
        });
}



export function updateValue(key, value){
    return(dispatch, getState) => {
            dispatch(updateData("UPDATE", {"key": key, "value": value}))
    }
}

export function updateAppValue(key, value){
    return(dispatch, getState) => {
            dispatch(updateData("UPDATE_APP", {"key": key, "value": value}))
    }
}

export const setLoading = () => {
    return{
        type: "SET_LOADING"
    }
}

export const updateData = (type, data) => {
    return {
        type: type,
        data: data
    }
}


export default {updateValue, updateAppValue, getGeoNameSuggest, getGeoNameSearch, getAllCategories};
