import { configureStore } from '@reduxjs/toolkit';
import { groupsApi } from '../features/groupsApi/groupsApi';

export const store = configureStore({
  reducer: {
    [groupsApi.reducerPath]: groupsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(groupsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
