import * as React from 'react';
import { ListItemText,Avatar,Checkbox,Button } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import ArchiveIcon from '@mui/icons-material/Archive';
import { Box, Grid } from '@mui/material';
import MenuBar from './TicketMenu';
import TicketFilters from './TicketFilters';
import { useSelector ,useDispatch} from 'react-redux';
import { toggleForm } from '../redux/slices/ticketSlice';
import { selectSearchText } from '../redux/slices/ticketSlice';
import TicketForm from './TicketForm';
import TicketUpdateForm from './TicketUpdateForm';
import { useData } from '../context/DataContext';
import Gmail from '../assets/gmail.png';
import WhatsApp  from '../assets/whatsapp.png'
import Instagram from '../assets/instagram.png';
import Linkedin from '../assets/linkedin.png';
import { useState } from 'react';
import TicketDetails from './TicketDetails';
const channelAvatars = {
  Gmail: Gmail,
  WhatsApp: WhatsApp,
  Instagram: Instagram,
  Linkedin: Linkedin,
};
export default function TicketTable() {
  const { data,deleteTicket } = useData();
  
  const page = useSelector((state) => state.pagination.page);
  const rowsPerPage = useSelector((state) => state.pagination.rowsPerPage)


  const [flaggedItems, setFlaggedItems] = useState([]);
  const handleFlagItemClick = (value) => {
    if (flaggedItems.includes(value)) {
      setFlaggedItems(flaggedItems.filter(item => item !== value));
    } else {
      setFlaggedItems([...flaggedItems, value]);
    }
  };
  const isFlagged = (value) => {
    return flaggedItems.includes(value);
  };

  const searchText = useSelector(selectSearchText);
  const filteredData = searchText
    ? data.filter((item) =>
        item.email.toLowerCase().startsWith(searchText.toLowerCase())
      )
    : data;

  const startIndex = (page - 1) * rowsPerPage;
  const displayedItems = filteredData.slice(startIndex, startIndex + rowsPerPage);


  const showTicketForm=useSelector(state=>state.toggleTicket.value)
  const dispatch=useDispatch()

  const [showUpdate,setShowUpdate]=useState(false);
  const toggleUpdate=()=>{
    setShowUpdate(!showUpdate)
  }
  const [selectId,setSelectedId]=useState(0);
  const handleEmailClick = (email, id) => {
    setSelectedId(id);
    toggleUpdate();
  }

  const [showDetails,setShowDetails]=useState(false);
  const toggleDetails=()=>{
    setShowDetails(!showDetails)
  }
  const handleShowDetails=(id)=>{
    setSelectedId(id);
    toggleDetails();
  }

  const handleDelete=(id)=>{
        deleteTicket(id);
  }


  const formatDate = (due_date) => {
    const formattedDate = new Date(due_date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;

  }

  return (
    <div style={{ display: 'flex'}}>
      <TicketFilters />
      <div style={{ display: 'flow', width: '100%',position:'static' }}>
        <MenuBar />
        <Box sx={{height:'100%', width: '100%', bgcolor: 'gainsboro', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            {displayedItems.map((item) => (
              <Box key={item.id} sx={{ boxShadow: 2, margin:1, bgcolor: 'white', borderRadius: 1 }}>
                  <Grid container alignItems="center" spacing={2.5} justifyItems='flex-start'>
                    <Grid item>
                      <Checkbox />
                    </Grid>
                    <Grid item>
                        <Avatar sx={{ bgcolor: 'gray', ml: 1, height: 30, width: 30 }} variant="rounded" onClick={()=>handleShowDetails(item.id)}>
                          {item.email[0]}
                        </Avatar>
                    </Grid>
                    <Grid item xs={3} onClick={() => handleEmailClick(item.email, item.id)}>
                    <ListItemText primary={<div className="truncate">{item.email}</div> }   sx={{ textAlign: 'justify', width: '100%' }}/> </Grid>
                    <Grid item>
                        <Avatar src={channelAvatars[item.channel] || null} sx={{ height: 30, width: 30}} variant="square" />
                    </Grid>
                    <Grid item>
                      <Button sx={{ bgcolor: 'lightcoral', ml: 2, mr: 2,color:'black' }}>Inbox</Button>
                    </Grid>
                    <Grid item xs={2} >
                      <ListItemText primary={<div className="truncate">{item.title}</div>}   sx={{ textAlign: 'justify', width: '100%' }} />              
                    </Grid>
                    <Grid item>
                      <Button sx={{ bgcolor: 'lightgray', ml: 2, mr: 2,color:'black' }}>{item.category}</Button>
                    </Grid>
                    <Grid item>
                        <FlagIcon
                          onClick={() => handleFlagItemClick(item.id)}
                          color={isFlagged(item.id) ? 'error' : 'action'}
                        />
                    </Grid>
                    <Grid item>
                        <ArchiveIcon onClick={()=>handleDelete(item.id)}/>
                    </Grid>
                    
                    <Grid item>
                        <Avatar 
                        sx={{
                          bgcolor:item.priority === 'L'?'lightgreen'
                                 :item.priority === 'M'? 'royalblue'
                                 :item.priority === 'H'?'crimson':'', height: 30, width: 30,mr:2, color: 'black' }} variant="rounded">
                          {item.priority}
                        </Avatar>
                    </Grid>
                    <Grid item>
                      <ListItemText primary={formatDate(item.due_date)} />
                    </Grid>
                  </Grid>
              </Box>
            ))}
        </Box>
      </div>
      {showTicketForm && 
            <div className="absolute inset-0 z-10 overflow-y-auto bg-white bg-opacity-80 flex justify-center items-center">
             <TicketForm onClose={()=>dispatch(toggleForm())} />
            </div>
      }
      {showUpdate && 
            <div className="absolute inset-0 z-10 overflow-y-auto bg-white bg-opacity-80 flex justify-center items-center">
             <TicketUpdateForm onClose={toggleUpdate} itemId={selectId}/>
            </div>
      }
      {showDetails && (
        <div className="absolute inset-0 z-10 overflow-y-auto bg-white bg-opacity-80 flex justify-center items-center">
          <TicketDetails onClose={toggleDetails} itemId={selectId} />
        </div>
      )}
    </div>
  );
}
