import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch } from 'react-redux'
import { toggleForm } from '../redux/slices/ticketSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
export default function TicketFilters() {
    const [alignment, setAlignment] = React.useState('web');
    const dispatch=useDispatch()
    const singOut = useSignOut();
    const navigate = useNavigate();
  
    const logout = () => {
      singOut();
      navigate("/login");
    };

    const handleChange = (event, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
    };
    const theme = createTheme({
      palette: {
        primary: {
          main: '#333333', // black
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
      <div className='m-2'>
      <Stack direction="row" spacing={1}>
      <IconButton color="primary" aria-label="Search by Folder">
      <span className="text-lg font-bold text-gray-800">Views</span>
      </IconButton>
      <IconButton color="primary" aria-label="Search by Folder">
        <FolderCopyIcon/>
      </IconButton>
      <IconButton color="primary" aria-label="New Ticket" onClick={()=>dispatch(toggleForm())}>
        <AddCircleIcon/>
      </IconButton>
    </Stack>
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start', 
        padding: 1, 
      }}
    >
        <ToggleButtonGroup
      orientation='vertical'
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="unassigned">Unassigned</ToggleButton>
      <ToggleButton value="all pending">All Pending</ToggleButton>
      <ToggleButton value="all completed">All Completed</ToggleButton>
      <ToggleButton value="all junk">All Junk</ToggleButton>
      <ToggleButton value="assigned to me">Assigned to me</ToggleButton>
      <ToggleButton value="created by me">Created by me</ToggleButton>
      <ToggleButton value="completed by me">Completed by me</ToggleButton>

    </ToggleButtonGroup>
      </Box>

      <Button variant="contained" endIcon={<LogoutIcon />} style={{marginTop:5}} onClick={logout}>
        Logout
      </Button>
      </div>
      </ThemeProvider>
    );
  }