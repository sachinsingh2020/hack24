import { createAction, createReducer } from '@reduxjs/toolkit';

const loginRequest = createAction('loginRequest');
const loginSuccess = createAction('loginSuccess');
const loginFail = createAction('loginFail');
const logoutRequest = createAction('logoutRequest');
const logoutSuccess = createAction('logoutSuccess');
const logoutFail = createAction('logoutFail');
const isLoggedInRequest = createAction('isLoggedInRequest');
const isLoggedInSuccess = createAction('isLoggedInSuccess');
const isLoggedInFail = createAction('isLoggedInFail');
const movieRequestRequest = createAction('movieRequestRequest');
const movieRequestSuccess = createAction('movieRequestSuccess');
const movieRequestFail = createAction('movieRequestFail');
const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');

export const userReducer = createReducer({
    isAuthenticated: false,
}, (builder) => {
    builder
        .addCase(loginRequest, (state) => {
            state.loading = true;
        })
        .addCase(loginSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase(loginFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(logoutRequest, (state) => {
            state.loading = true;
        })
        .addCase(logoutSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload.message;
        })
        .addCase(logoutFail, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.error = action.payload;
        })
        .addCase(isLoggedInRequest, (state) => {
            state.loading = true;
        })
        .addCase(isLoggedInSuccess, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        })
        .addCase(isLoggedInFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(movieRequestRequest, (state) => {
            state.loading = true;
        })
        .addCase(movieRequestSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(movieRequestFail, (state, action) => {
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