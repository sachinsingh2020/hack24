import { createAction, createReducer } from '@reduxjs/toolkit';


const getMoviesRequest = createAction('getMoviesRequest');
const getMoviesSuccess = createAction('getMoviesSuccess');
const getMoviesFailure = createAction('getMoviesFailure');
const getAMovieRequest = createAction('getAMovieRequest');
const getAMovieSuccess = createAction('getAMovieSuccess');
const getAMovieFailure = createAction('getAMovieFailure');
const totalMoviesRequest = createAction('totalMoviesRequest');
const totalMoviesSuccess = createAction('totalMoviesSuccess');
const totalMoviesFailure = createAction('totalMoviesFailure');
const createMovieRequest = createAction('createMovieRequest');
const createMovieSuccess = createAction('createMovieSuccess');
const createMovieFailure = createAction('createMovieFailure');
const deleteMovieRequest = createAction('deleteMovieRequest');
const deleteMovieSuccess = createAction('deleteMovieSuccess');
const deleteMovieFailure = createAction('deleteMovieFailure');
const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');


export const movieReducer = createReducer({}, (builder) => {
    builder
        .addCase(getMoviesRequest, (state) => {
            state.loading = true;
        })
        .addCase(getMoviesSuccess, (state, action) => {
            state.loading = false;
            state.movies = action.payload.movies;
            state.filteredMoviesCount = action.payload.filteredMoviesCount;
            state.resultPerPage = action.payload.resultPerPage;
        })
        .addCase(getMoviesFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getAMovieRequest, (state) => {
            state.loading = true;
        })
        .addCase(getAMovieSuccess, (state, action) => {
            state.loading = false;
            state.movie = action.payload.movie;
        })
        .addCase(getAMovieFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(totalMoviesRequest, (state) => {
            state.loading = true;
        })
        .addCase(totalMoviesSuccess, (state, action) => {
            state.loading = false;
            state.totalMovies = action.payload;
        })
        .addCase(totalMoviesFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createMovieRequest, (state) => {
            state.loading = true;
        })
        .addCase(createMovieSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(createMovieFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteMovieRequest, (state) => {
            state.loading = true;
        })
        .addCase(deleteMovieSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(deleteMovieFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        })
})