import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortFilter: "default",
    searchString: "",
    jobTypeFilter: "all",
};

const jobFilterSlice = createSlice({
    name: "job-filter",
    initialState,
    reducers: {
        selectSortOption: (state, action) => {
            state.sortFilter = action.payload;
        },
        searchJob: (state, action) => {
            state.searchString = action.payload;
        },
        selectJobType: (state, action) => {
            state.jobTypeFilter = action.payload;
        },
    }
})

export default jobFilterSlice.reducer;
export const { selectSortOption, searchJob, selectJobType } = jobFilterSlice.actions;