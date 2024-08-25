import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        projectsArray: null,
    },

    reducers: {
        addProject: (state, action) => {
            state.projectsArray = action.payload;
        },
    }
})

export const { addProject } = projectsSlice.actions;
export default projectsSlice.reducer;