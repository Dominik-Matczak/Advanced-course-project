import { createSlice } from '@reduxjs/toolkit';

const initialFilters = {
  title: '',
  priceFrom: '',
  priceTo: '',
  category: '',
  rate: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFilters,
  reducers: {
    setFilterValue: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetFilters: (state) => {
      return initialFilters;
    },
  },
});

export const { setFilterValue, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;