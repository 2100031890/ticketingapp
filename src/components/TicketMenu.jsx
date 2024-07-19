import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import TablePagination from '@mui/material/TablePagination/TablePagination';
import { useDispatch,useSelector } from 'react-redux';
import { setSearchText } from '../redux/slices/ticketSlice';
import { setPage,setRowsPerPage } from '../redux/slices/ticketSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function MenuBar() {
  const dispatch = useDispatch();
  
  const page = useSelector((state) => state.pagination.page);
  const rowsPerPage = useSelector((state) => state.pagination.rowsPerPage);

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage+1));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchText(event.target.value));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{bgcolor:'midnightblue'}}>
            <Checkbox sx={{color:'lightgrey'}}/>
          <Search sx={{bgcolor:'lightgrey'}}>
            <SearchIconWrapper sx={{color:'black'}}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{color:'black'}}
              onChange={handleSearchChange}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          <TablePagination
          component="div"
          count={100}
          page={page-1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage="Show"
          sx={{bgcolor:'lightgrey',borderRadius: '1rem'}}
          />
            
        </Toolbar>
      </AppBar>
    </Box>
  );
}