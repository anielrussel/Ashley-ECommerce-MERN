import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSliceReducer from "./userSlice";
import productSliceReducer from './productSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userSliceReducer,
  product: productSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for now
    }),
});

export const persistor = persistStore(store);

export default { store, persistor };


// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { user: UserState, product: ProductState }
export type AppDispatch = typeof store.dispatch;
