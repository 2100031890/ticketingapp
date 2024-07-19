import { createSlice } from '@reduxjs/toolkit'

export const ticketFormSlice = createSlice({
  name: 'toggleTicket',
  initialState: {
    value: false
  },
  reducers: {
    toggleForm: state => {
      state.value=!state.value;
    }
  }
})
export const { toggleForm } = ticketFormSlice.actions




const initialState = {
  searchText: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = searchSlice.actions;
export const selectSearchText = (state) => state.search.searchText;



const paginationSlice = createSlice({
  name: 'pagination',
  initialState:{
  page: 1,
  rowsPerPage: 10,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
      state.page = 1;
    },
  },
});

export const { setPage, setRowsPerPage } = paginationSlice.actions;






const rootReducer = {
  toggleTicket: ticketFormSlice.reducer,
  search:searchSlice.reducer,
  pagination:paginationSlice.reducer
};
export default rootReducer;