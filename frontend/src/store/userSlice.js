import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./thunkFunction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
	userData: {
		id: "",
		email: "",
		name: "",
		role: 0,
		image: "",
	},
	isAuth: false,
	isLoading: false,
	error: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.isLoading = false;
				toast.info("Sign up success.");
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				toast.error(action.payload);
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.userData = action.payload;
				state.isAuth = true; //login state true/false
				localStorage.setItem("accessToken", action.payload.accessToken);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				toast.error(action.payload);
			});
	},
});

export default userSlice.reducer;
