import { configureStore } from "@reduxjs/toolkit";
import cardReducer from './cardSlice';
import projectsReducer from './projectsSlice';

const store = configureStore({
    reducer: {
        cards: cardReducer,
        projects: projectsReducer,
    }
})

export default store;