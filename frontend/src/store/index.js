import { configureStore, combineReducers } from "@reduxjs/toolkit"; // Import combineReducers
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistReducer,
	persistStore,
} from "redux-persist";

// Combine all the reducers into one rootReducer.
export const rootReducer = combineReducers({
	user: userReducer, // Add the userReducer to the rootReducer.
});

// Configuration object for redux-persist.
const persistConfig = {
	key: "root", // Key for the persisted data in storage.
	storage, // Storage engine to use (default storage in this case).
};

// Create a persisted reducer using the persistConfig and rootReducer.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer and customized middleware.
export const store = configureStore({
	reducer: persistedReducer, // Use the persisted reducer.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// Create a persistor object for the store.
export const persistor = persistStore(store);
