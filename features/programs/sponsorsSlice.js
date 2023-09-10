// code not ready
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchSponsors = createAsyncThunk(
    'sponsors/fetchSponsors',
    async () => {
        const response = await fetch(baseUrl + 'sponsors');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const sponsorsSlice = createSlice({
    name: 'sponsors',
    initialState: { isLoading: true, errMess: null, sponsorsArray: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSponsors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSponsors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.sponsorsArray = action.payload;
            })
            .addCase(fetchSponsors.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const sponsorsReducer = sponsorsSlice.reducer;

// refer to partnersSlice.js nucampsite