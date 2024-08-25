import { server } from '../store'
import axios from 'axios'

export const register = (user) => async (dispatch) => {
    try {
        dispatch({ type: 'signUpRequest' });

        const { data } = await axios.post(`${server}/register`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'signUpSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'signUpFail', payload: error.response.data.message });
    }
}

export const login = ({ email, password }) => async (dispatch) => {
    try {
        dispatch({ type: 'loginRequest' });
        console.log({ email, password });

        const text = `${server}/login`;
        console.log({ text });
        const { data } = await axios.post(`${server}/login`, { email, password }, {
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            withCredentials: true,
        });
        dispatch({ type: 'loginSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'loginFail', payload: error.response.data.message });
    }
}


export const logout = () => async dispatch => {
    try {
        dispatch({ type: 'logoutRequest' });
        const { data } = await axios.get(`${server}/logout`, {
            withCredentials: true,
        });
        dispatch({ type: 'logoutSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'logoutFail', payload: error.response.data.message });
    }
};


export const isUserLoggedIn = () => async dispatch => {
    try {
        dispatch({ type: 'isLoggedInRequest' });
        const { data } = await axios.get(`${server}/isloggedin`, {
            withCredentials: true,
        });
        dispatch({ type: 'isLoggedInSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'isLoggedInFail', payload: error.response.data.message });
    }
}

export const movieRequest = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'movieRequestRequest' });

        const { data } = await axios.post(`${server}/contactus`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        dispatch({ type: 'movieRequestSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'movieRequestFail', payload: error.response.data.message });
    }
}