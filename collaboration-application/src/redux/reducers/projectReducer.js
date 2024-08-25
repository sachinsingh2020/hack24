import { createAction, createReducer } from '@reduxjs/toolkit';

const getProjectsRequest = createAction('getProjectsRequest');
const getProjectsSuccess = createAction('getProjectsSuccess');
const getProjectsFailure = createAction('getProjectsFailure');
const addProjectRequest = createAction('addProjectRequest');
const addProjectSuccess = createAction('addProjectSuccess');
const addProjectFailure = createAction('addProjectFailure');
const openProjectRequest = createAction('openProjectRequest');
const openProjectSuccess = createAction('openProjectSuccess');
const openProjectFailure = createAction('openProjectFailure');
const downloadProjectRequest = createAction('downloadProjectRequest');
const downloadProjectSuccess = createAction('downloadProjectSuccess');
const downloadProjectFailure = createAction('downloadProjectFailure');
const getRedirectLinkRequest = createAction('getRedirectLinkRequest');
const getRedirectLinkSuccess = createAction('getRedirectLinkSuccess');
const getRedirectLinkFailure = createAction('getRedirectLinkFailure');
const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');

export const projectReducer = createReducer({
    projects: null,
    openedProject: null,
    loading: false,
    error: null,
    message: null
}, (builder) => {
    builder
        .addCase(getProjectsRequest, (state) => {
            state.loading = true;
        })
        .addCase(getProjectsSuccess, (state, action) => {
            state.loading = false;
            state.projects = action.payload;
        })
        .addCase(getProjectsFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addProjectRequest, (state) => {
            state.loading = true;
        })
        .addCase(addProjectSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(addProjectFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(openProjectRequest, (state) => {
            state.loading = true;
        })
        .addCase(openProjectSuccess, (state, action) => {
            state.loading = false;
            state.openedProject = action.payload;
        })
        .addCase(openProjectFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(downloadProjectRequest, (state) => {
            state.loading = true;
        })
        .addCase(downloadProjectSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(downloadProjectFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getRedirectLinkRequest, (state) => {
            state.loading = true;
        })
        .addCase(getRedirectLinkSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(getRedirectLinkFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        })

});