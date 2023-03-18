import axios from 'axios';
import * as types from './actionType';

const login = (payload) => (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST });
    return axios.post(`http://localhost:4000/user/login`, payload).then((res) => {
        console.log("res from action", res.data);
        alert(res.data.msg);
        return dispatch({ type: types.LOGIN_SUCCESS, payload: res.data })
    }).catch((err) => {
        alert('login failed')
        dispatch({ type: types.LOGIN_FAILURE })
    })
}
export { login }