import { createAction, createReducer } from '@reduxjs/toolkit';

const getSignUpRequest = createAction('getSignUpRequest');
const getSignUpSuccess = createAction('getSignUpSuccess');
const getSignUpFailure = createAction('getSignUpFailure');
const getLoginRequest = createAction('getLoginRequest');
const getLoginSuccess = createAction('getLoginSuccess');
const getLoginFailure = createAction('getLoginFailure');
const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');

export const cardReducer = createReducer({
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
    message: null
}, (builder) => {
    builder
        .addCase(getSignUpRequest, (state) => {
            state.loading = true;
        })
        .addCase(getSignUpSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload
        })
        .addCase(getSignUpFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getLoginRequest, (state) => {
            state.loading = true;
        })
        .addCase(getLoginSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase(getLoginFailure, (state, action) => {
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