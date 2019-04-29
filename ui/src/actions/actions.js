import {createAction} from 'redux-actions';
import requestActions from './requestactions';
import {get} from '../common/requests';
import {changeScreen} from './navigationactions';


export function getGeoData() {
    return(dispatch, getState) => {
        const url = '';
        const interval = setInterval(() => {
            get({
                url: url, 
                success: function(res){

                },
                dispatch: dispatch,
            });
        }, 5000)
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

export default {updateValue};
