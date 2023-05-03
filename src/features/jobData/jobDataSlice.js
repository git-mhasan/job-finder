import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getJobData, addNewJob, editJob, deleteJob } from "./jobDataAPI";

const initialState = {
    jobData: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {},
};


// async thunks
export const fetchJobData = createAsyncThunk(
    "jobs/fetchJobData",
    async () => {
        const JobData = await getJobData();
        return JobData;
    }
);

export const createNewJob = createAsyncThunk(
    "jobs/createNewJob",
    async (data) => {
        const newJob = await addNewJob(data);
        return newJob;
    }
);

export const editJobItem = createAsyncThunk(
    "jobs/editJobItem",
    async ({ id, data }) => {
        const editedJob = await editJob(id, data);
        return editedJob;
    }
);

export const removeJob = createAsyncThunk(
    "jobs/removeJob",
    async (id) => {
        const response = await deleteJob(id);
        return response.data;
    }
);

const jobDataSlice = createSlice({
    name: "job-data",
    initialState,
    reducers: {
        // expected action payload: single job object
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInActive: (state) => {
            state.editing = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobData.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
                state.jobData = [];
            })
            .addCase(fetchJobData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.jobData = action.payload;
            })
            .addCase(fetchJobData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
                state.jobData = [];
            })
            .addCase(createNewJob.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createNewJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.jobData.push(action.payload);
            })
            .addCase(createNewJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(editJobItem.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(editJobItem.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;

                const indexToUpdate = state.jobData.findIndex(
                    (t) => t.id === action.payload.id
                );

                state.jobData[indexToUpdate] = action.payload;
            })
            .addCase(editJobItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(removeJob.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(removeJob.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;

                state.jobData = state.jobData.filter(
                    (t) => t.id !== action.meta.arg
                );
            })
            .addCase(removeJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    }
})

export default jobDataSlice.reducer;
export const { editActive, editInActive } = jobDataSlice.actions;
