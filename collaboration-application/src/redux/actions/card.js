import axios from 'axios';
const server = "https://iiit-colloboration-app-backend-2.vercel.app/api/v1"

export const register = (user) => async (dispatch) => {
    try {
        dispatch({ type: 'signUpRequest' });

        const text = `${server}/register`
        console.log({ text });
        const response = await axios.post(`${server}/register`, user);

        const data = response.data;
        console.log({ data })

        dispatch({ type: 'signUpSuccess', payload: data });

    }
    catch (error) {
        dispatch({ type: 'signUpFailure', payload: error.response.data.message });
    }
}

export const login = (user) => async (dispatch) => {
    try {
        dispatch({ type: 'loginRequest' });

        const response = await axios.post(`${server}/login`, user);

        const data = response.data;
        console.log({ data })

        dispatch({ type: 'loginSuccess', payload: data });

    }
    catch (error) {
        dispatch({ type: 'loginFailure', payload: error.response.data.message });
    }
}

