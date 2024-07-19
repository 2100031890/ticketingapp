import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KaptureLogo from '../assets/cropped_image.png';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useData } from '../context/DataContext';
import CloseIcon from '@mui/icons-material/Close';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TicketDetails({onClose,itemId}) {
  const {data}=useData();
  const selectedItem = data.find(item => item.id === itemId) || {};

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: '40%',padding:2,border:2,borderRadius:4 ,bgcolor:'midnightblue'}}>
      <CardHeader
        avatar={
          <Avatar src={KaptureLogo} style={{height:50,width:50}}/>
        }
        title=<span style={{color:'white',fontWeight: 'bold', fontSize: '20px'}}>{selectedItem.title}</span>
        subheader=<span style={{color:'white'}}>Due :{selectedItem.due_date}</span>
        action={
            <CloseIcon onClick={onClose} style={{color:'white'}}/>
        }
      />
    
      <CardContent>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{selectedItem.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Channel</TableCell>
              <TableCell>{selectedItem.channel}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>{selectedItem.category}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Priority</TableCell>
              <TableCell>{selectedItem.priority}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

      </CardContent>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"          
        >
          <ExpandMoreIcon style={{color:'white'}}/>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{color:'white'}}>
          <Typography paragraph>Comment:</Typography>
          <Typography paragraph>
            {selectedItem.comments}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}