import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Country, Extra, Status } from 'types';

export const loadCountryByName = createAsyncThunk<
  {
    data: Country[] /* Возвращаемое значение */;
  },
  string /*Входное значение, типизируем параметр name, т.к. запрос отправляем на поиск конкретной страны */,
  {
    extra: Extra;
    rejectValue: string;
  }
>(
  '@@details/load-country-by-name',
  (name, { extra: { client, api }, rejectWithValue }) => {
    try {
      return client.get(api.searchByCountry(name));
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Cannot load data');
    }
  }
);

export const loadNeighborsByBorder = createAsyncThunk<
  {
    data: Country[];
  },
  string[],
  {
    extra: Extra;
    rejectValue: string;
  }
>(
  '@@details/load-neighbors',
  async (borders, { extra: { client, api }, rejectWithValue }) => {
    try {
      return client.get(api.filterByCode(borders));
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Cannot load data');
    }
  }
);

type DetailsSlice = {
  status: Status;
  currentCountry: Country | null;
  neighbors: string[];
  error: string | null;
};

const initialState: DetailsSlice = {
  status: 'idle',
  currentCountry: null,
  neighbors: [],
  error: null,
};

export const detailSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Cannot load data';
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = 'received';
        state.currentCountry = action.payload.data[0];
      })
      .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
        state.neighbors = action.payload.data.map((country) => country.name);
      });
  },
});

export const { clearDetails } = detailSlice.actions;
export const detailsReducer = detailSlice.reducer;
