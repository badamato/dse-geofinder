import axios from 'axios';
import {addRequest, removeRequest} from '../actions/requestactions';

/*
 * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * UUID function is from the SO post above
 * */
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

export function get({url, params, success, error, dispatch, auth = true} = {}) {
    var key = uuidv4()
    var request = axios.get(url, {
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        params: params,
    }).then(success || function(response){
        console.log(response)
    })
    .catch(error || function (error) {
        console.log(error.response)
    })
    .then(function(){
        dispatch(removeRequest(key))
    })
    dispatch(addRequest(key, request))
}

export function post({url, params, success, error, dispatch} = {}) {
    var key = uuidv4()
    var request = axios.post(url, params, {
        headers: {},
    })
    .then(success || function(response){
        console.log(response)
    })
    .catch(error || function (error) {
        console.log(error.response)
    })
    .then(function(){
        dispatch(removeRequest(key))
    })
    dispatch(addRequest(key, request))

}

export function remove({url, success, error, dispatch} = {}) {
    var key = uuidv4()
    var request = axios.delete(url, {
        headers: {}
    })
    .then(success || function(response){
        console.log(response)
    })
    .catch(error || function (error) {
        console.log(error.response.headers)
    })
    .then(function(){
        dispatch(removeRequest(key))
    })
    dispatch(addRequest(key, request))
}
