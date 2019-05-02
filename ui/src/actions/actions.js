import {createAction} from 'redux-actions';
import requestActions from './requestactions';
import {get} from '../common/requests';
import {changeScreen} from './navigationactions';


// const hostname = window.location.hostname;
// const url = 'http://'+hostname+':8080/demo/write';

export function getSuggData() {
    return(dispatch, getState) => {
        const url = 'http://localhost:8080/#/api/name-suggest?name=string&sort=sortfield';
            get({
                url: url,
                // params: data,
                success: function(res){
                    console.log(res.data)
                    let locationsList = []
                },
                dispatch: dispatch,
            });
    }
}



export function updateValue(key, value){
    return(dispatch, getState) => {
            dispatch(updateData("UPDATE", {"key": key, "value": value}))
    }
}

export const updateData = (type, data) => {
    return {
        type: type,
        data: data
    }
}

export default {updateValue, getSuggData};
