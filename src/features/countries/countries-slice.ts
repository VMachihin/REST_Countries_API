import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Country, Extra, Status } from 'types';

export const loadCountries = createAsyncThunk<
  { data: Country[] } /* Возвращаемое значение */,
  undefined /* Входное значение, т.к. запрос идёт без параметров */,
  {
    state: { countries: CountrySlice };
    extra: Extra;
    rejectValue: string;
  }
>(
  '@@countries/load-countries ',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      return client.get(api.ALL_COUNTRIES);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error');
    }
  },
  {
    // используется что бы дважды не вызывалась загрузка одного и тоже запроса.
    condition: (_, { getState }) => {
      const {
        countries: { status },
      } = getState();

      if (status === 'loading') {
        return false;
      }
    },
  }
);

type CountrySlice = {
  status: Status;
  list: Country[];
  error: string | null;
};

const initialState: CountrySlice = {
  status: 'idle',
  list: [],
  error: null,
};

export const countriesSlice = createSlice({
  name: '@@countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Cannot load data';
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      });
  },
});

export const countriesReducer = countriesSlice.reducer;
