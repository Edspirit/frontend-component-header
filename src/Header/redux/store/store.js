import { configureStore } from '@reduxjs/toolkit';
import recentPages from '../slice/recentPagesSlice';

const store = configureStore({
  reducer: {
    recentPages,
  },
});

export default store;
