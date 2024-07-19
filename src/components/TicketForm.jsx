import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useData } from '../context/DataContext';
import { InputLabel,Select,MenuItem,FormControl} from '@mui/material';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  channel: Yup.string().required('Channel is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  due_date: Yup.date().min(new Date(), 'Due Date must be in the future').required('Due Date is required'),
  priority: Yup.string().required('Priority is required'),
});

const defaultTheme = createTheme();
export default function TicketForm({ onClose }) {
  const {addTicket}=useData();
  const handleSubmit = async (values) => {
    try {
    addTicket(values); 
    onClose();
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'white',
            border: 2,
            borderRadius:5,
          }}
        >
          <Typography component="h1" variant="h5" marginBottom={5}>
            Create Ticket
          </Typography>
          <Formik
            initialValues={{
              title: '',
              channel: '',
              email: '',
              due_date: '',
              priority: '',
              category:'Open',
              comments:''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="title"
                      name="title"
                      label="Title"
                      autoFocus
                      error={touched.title && !!errors.title}
                      helperText={touched.title && errors.title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={touched.channel && !!errors.channel}>
                      <InputLabel id="channel-label">Channel</InputLabel>
                      <Field
                        as={Select}
                        id="channel"
                        name="channel"
                        value={values.channel}
                        onChange={handleChange}
                        label="Channel"
                      >
                        <MenuItem value={"Gmail"}>Gmail</MenuItem>
                        <MenuItem value={"WhatsApp"}>WhatsApp</MenuItem>
                        <MenuItem value={"Instagram"}>Instagram</MenuItem>
                        <MenuItem value={"Linkedin"}>Linkedin</MenuItem>
                      </Field>
                      {touched.channel && errors.channel && (
                        <Typography color="error">{errors.channel}</Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      autoComplete="email"
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      type="date"
                      id="due_date"
                      name="due_date"
                      className="border-solid border-2"
                      error={touched.due_date && !!errors.due_date}
                      helperText={touched.due_date && errors.due_date}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={touched.priority && !!errors.priority}>
                      <InputLabel id="priority-label">Priority</InputLabel>
                      <Field
                        as={Select}
                        id="priority"
                        name="priority"
                        value={values.priority}
                        onChange={handleChange}
                        label="Priority"
                      >
                        <MenuItem value={'L'}>Low</MenuItem>
                        <MenuItem value={'M'}>Medium</MenuItem>
                        <MenuItem value={'H'}>High</MenuItem>
                      </Field>
                      {touched.priority && errors.priority && (
                        <Typography color="error">{errors.priority}</Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button type="submit" fullWidth variant="contained" sx={{bgcolor:'mediumblue'}}>
                      Create
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      onClick={onClose}
                      fullWidth
                      variant="outlined"
                      color="error"
                      startIcon={<CloseIcon />}
                    >
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}