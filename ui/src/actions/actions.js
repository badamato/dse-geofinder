import {createAction} from 'redux-actions';
import requestActions from './requestactions';
import {get} from '../common/requests';
import {changeScreen} from './navigationactions';


export const getGeoName = (name, lat, lng) => dispatch => {

        const url = `/api/geo-name-suggest?name=${name}&lat=${lat}&lng=${lng}`;
            get({
                url: url,
                success: function(res){
                    dispatch(updateValue('locData', res.data))
                },
                dispatch: dispatch
            });

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

export default {updateValue, getGeoName};
