import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchCoaches = createAsyncThunk(
    'coaches/fetchCoaches',
    async () => {
        const response = await fetch(baseUrl + 'coaches');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const coachesSlice = createSlice({
    name: 'coaches',
    initialState: { isLoading: true, errMess: null, campsitesArray: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoaches.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCoaches.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.campsitesArray = action.payload;
            })
            .addCase(fetchCoaches.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const coachesReducer = coachesSlice.reducer;