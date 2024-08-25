import { server } from '../store'
import axios from 'axios'

export const getMovies = (keyword = "", currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: 'getMoviesRequest' });
        let link = "";
        if (keyword === "Bollywood" || keyword === "Hollywood") {
            link = `${server}/getmovies?page=${currentPage}&filmIndustry=${keyword}`;
        }
        else if (keyword === "1080" || keyword === "720" || keyword === '480') {
            link = `${server}/getmovies?page=${currentPage}&quality.qualityName=${keyword}`;
        }
        else
            link = `${server}/getmovies?keyword=${keyword}&page=${currentPage}`;

        const { data } = await axios.get(link);
        // console.log(data);
        dispatch({ type: 'getMoviesSuccess', payload: data });
        // console.log(data);
    }
    catch (error) {
        dispatch({ type: 'getMoviesFailure', payload: error.response.data.message });
    }
}

export const getAMovie = (movieId) => async (dispatch) => {
    try {
        dispatch({ type: 'getAMovieRequest' });

        const { data } = await axios.get(`${server}/getmoviedetail/${movieId}`);
        // console.log(data);
        dispatch({ type: 'getAMovieSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'getAMovieFailure', payload: error.response.data.message });
    }
}

export const totalMoviesCount = () => async (dispatch) => {
    try {
        dispatch({ type: 'totalMoviesRequest' });
        // console.log("sachin");
        const { data } = await axios.get(`${server}/totalmovies`);
        // console.log(data);
        dispatch({ type: 'totalMoviesSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'totalMoviesFailure', payload: error.response.data.message });
    }
}

export const createMovie = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'createMovieRequest' });
        const { data } = await axios.post(`${server}/createmovie`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        console.log(data);
        dispatch({ type: 'createMovieSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'createPersonalFail', payload: error.response.data.message });
    }
}

export const deleteMovie = (movieId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteMovieRequest' });
        const { data } = await axios.delete(`${server}/deletemovie/${movieId}`);
        dispatch({ type: 'deleteMovieSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'deleteMovieFailure', payload: error.response.data.message });
    }
}