import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../apiRequest"
export const login = createAsyncThunk('/auth/login', async ({formValue, navigate, toast}, {rejectWithValue}) => {
  try {
    const response = await api.signIn(formValue);
    if (response.data) {
      toast.success("Login  Successfully!")
      navigate('/')
    }
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const register = createAsyncThunk("auth/resgister", async ({ formValue, navigate, toast }, {rejectWithValue}) => {
  try {
    const response = await api.signUp(formValue);
    if (response.data) {
      toast.success("Register successfully!")
      navigate('/login')
    }
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const googleSignIn = createAsyncThunk("auth/googleSignIn", async ({ result, navigate, toast }, {rejectWithValue}) => {
  try {
      const response = await api.signInGoogle(result);
      toast.success("Google Sign-in Successfully");
      navigate("/");
      return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})


const initialState = {
  user: null,
  error: [],
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLogout: (state) => {
      localStorage.removeItem('profile');
      state.user = null
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.error = []
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.error = []
      localStorage.removeItem('profile');
      state.loading = false
      localStorage.setItem("profile", JSON.stringify({...action.payload}))
      state.user = action.payload
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = [action.payload.message]
    },
    [register.pending]: (state) => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      state.error = []
    },
    [register.rejected]: (state, action) => {
      state.loading = false
      state.error = [action.payload.message]
    },
    [googleSignIn.pending]: (state) => {
      state.loading = true
    },
    [googleSignIn.fulfilled]: (state, action) => {
      localStorage.removeItem('profile');
      state.loading = false
      localStorage.setItem("profile", JSON.stringify({...action.payload}))
      state.user = action.payload
      state.error = []
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false
      state.error = [action.payload.message]
    },
  },
});
export const {setUser, setLogout} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
