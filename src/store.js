import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './slices/tableSlice';

const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});

export default store;
