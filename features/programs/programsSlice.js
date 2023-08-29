import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchPrograms = createAsyncThunk(
    'programs/fetchPrograms',
    async () => {
        const response = await fetch(baseUrl + 'programs');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const programsSlice = createSlice({
    name: 'programs',
    initialState: { isLoading: true, errMess: null, programsArray: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrograms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPrograms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.programsArray = action.payload;
            })
            .addCase(fetchPrograms.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const programsReducer = programsSlice.reducer;

// refer to partnersSlice.js nucampsite

