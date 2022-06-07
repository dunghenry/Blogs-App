import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../apiRequest"
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
export const getTours = createAsyncThunk('tour/getTours', async (page, { rejectWithValue }) => {
    try {
        const response = await api.getTours(page);
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
export const likeTour = createAsyncThunk('tour/likeTour', async ({_id}, { rejectWithValue }) => {
    try {
        const response = await api.likeTour(_id);
        console.log(response.data)
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
export const searchTours = createAsyncThunk('tour/searchTours', async (searchQuery, { rejectWithValue }) => {
    try {
        const response = await api.getToursBySearch(searchQuery);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const getToursByTag = createAsyncThunk('tour/getToursByTag', async (tag, { rejectWithValue }) => {
    try {
        const response = await api.getToursByTag(tag);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const getRelatedTours = createAsyncThunk('tour/getRelatedTours', async (tags, { rejectWithValue }) => {
    try {
        const response = await api.getRelatedTours(tags);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
const initialState = {
    tour: {},
    tours: [],
    userTours: [],
    tagTours: [],
    relatedTours: [],
    currentPage: 1,
    numberOfPages: null,
    errors: [],
    loading: false
}
const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
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
            state.tours = action.payload.tours
            state.currentPage = action.payload.currentPage
            state.numberOfPages = action.payload.numberOfPages
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
            state.userTours = state.userTours.map((tour) => tour._id === action.payload._id ? action.payload : tour)
            state.tours = state.tours.map((tour) => tour._id === action.payload._id ? action.payload : tour);
            state.errors = [];
        },
        [updateTour.rejected]: (state, action) => {
            state.loading = false
            state.errors = [action.payload.message]
        },
        [likeTour.pending]: (state) => {},
        [likeTour.fulfilled]: (state, action) => {
            state.loading = false
            state.userTours = state.userTours.map((tour) => tour._id === action.payload._id ? action.payload : tour)
            state.tours = state.tours.map((tour) => tour._id === action.payload._id ? action.payload : tour);
            state.errors = [];
        },
        [likeTour.rejected]: (state, action) => {
            state.loading = false
            state.errors = [action.payload.message]
        },
        [searchTours.pending]: (state) => {
            state.loading = true
        },
        [searchTours.fulfilled]: (state, action) => {
            state.loading = false
            state.tours = action.payload
            state.errors = []
        },
        [searchTours.rejected]: (state, action) => {
            state.errors = [action.payload.message]
        },
        [getToursByTag.pending]: (state) => {
            state.loading = true
        },
        [getToursByTag.fulfilled]: (state, action) => {
            state.loading = false
            state.tagTours = action.payload
            state.errors = []
        },
        [getToursByTag.rejected]: (state, action) => {
            state.errors = [action.payload.message]
        },
        [getRelatedTours.pending]: (state) => {
            state.loading = true
        },
        [getRelatedTours.fulfilled]: (state, action) => {
            state.loading = false
            state.relatedTours = action.payload
            state.errors = []
        },
        [getRelatedTours.rejected]: (state, action) => {
            // console.log(action)
            state.errors = [action.payload.message]
        },
    }
})
export const { setCurrentPage } = tourSlice.actions;
const tourReducer = tourSlice.reducer;
export default tourReducer