import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../apiRequest"
const initialState = {
    tour: {},
    tours: [],
    userTours: [],
    errors: [],
    loading: false
}
export const createTour = createAsyncThunk('tour/createTour', async ({ updatedData, navigate, toast}, { rejectWithValue }) => {
    try {
        const response = await api.createTour(updatedData);
        if (response.data) {
            toast.success("Tour added successfully!");
            navigate('/')
        }
        console.log(response.data);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response);
    }
})
export const getTours = createAsyncThunk('tour/getTours', async (_, { rejectWithValue }) => {
    try {
        const response = await api.getTours();
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const getTour = createAsyncThunk('tour/getTour', async (id, { rejectWithValue }) => {
    try {
        const response = await api.getTour(id);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const getToursByUser = createAsyncThunk('tour/getToursByUser', async (userId, { rejectWithValue }) => {
    try {
        const response = await api.getToursByUser(userId);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const deleteTour = createAsyncThunk('tour/deleteTour', async ({id, toast}, { rejectWithValue }) => {
    try {
        const response = await api.deleteTour(id);
        toast.success(response.data)
        return id
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateTour = createAsyncThunk('tour/updateTour', async ({id, updatedData, toast, navigate}, { rejectWithValue }) => {
    try {
        const response = await api.updateTour(id, updatedData);
        if (response.data) {
            toast.success("Updated tour successfully!")
        }
        navigate("/")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {
    },
    extraReducers: {
        [createTour.pending]: (state) => {
            state.loading = true
        },
        [createTour.fulfilled]: (state, action) => {
            state.loading = false
            state.tours = [action.payload]
            state.errors = []
        },
        [createTour.rejected]: (state, action) => {
            state.loading = false
            state.errors = [...action.payload.data]
        },
        [getTours.pending]: (state) => {
            state.loading = true
        },
        [getTours.fulfilled]: (state, action) => {
            state.loading = false
            state.tours = action.payload
            state.errors = []
        },
        [getTours.rejected]: (state, action) => {
            state.errors = [action.payload]
        },
        [getTour.pending]: (state) => {
            state.loading = true
        },
        [getTour.fulfilled]: (state, action) => {
            state.loading = false
            state.tour = action.payload
            state.errors = []
        },
        [getTour.rejected]: (state, action) => {
            console.log(action.payload)
            state.loading = false
            state.errors = [action.payload]
        },
        [getToursByUser.pending]: (state) => {
            state.loading = true
        },
        [getToursByUser.fulfilled]: (state, action) => {
            state.loading = false
            state.userTours = action.payload
            state.errors = []
        },
        [getToursByUser.rejected]: (state, action) => {
            state.loading = false
            state.errors = [action.payload]
        },
        [deleteTour.pending]: (state) => {
            state.loading = true
        },
        [deleteTour.fulfilled]: (state, action) => {
            state.loading = false
            state.userTours = state.userTours.filter((tour) => tour?._id !== action.payload)
            state.tours = state.tours.filter((tour) => tour?._id !== action.payload)
            state.errors = []
        },
        [deleteTour.rejected]: (state, action) => {
            state.loading = false
            state.errors = [action.payload]
        },
        [updateTour.pending]: (state) => {
            state.loading = true
        },
        [updateTour.fulfilled]: (state, action) => {
            state.loading = false
            state.userTours = state.userTours.map((tour) => {
                if (tour._id === action.payload._id) {
                    tour = action.payload
                }
                return tour;
            })
            state.tours = state.tours.map((tour) => {
                if (tour._id === action.payload._id) {
                    tour = action.payload;
                }
                return tour;
            });
            state.errors = [];
        },
        [updateTour.rejected]: (state, action) => {
            state.loading = false
            state.errors = [action.payload.message]
        },
    }
})
const { } = tourSlice.actions;
const tourReducer = tourSlice.reducer;
export default tourReducer