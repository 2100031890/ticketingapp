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
import { InputLabel,Select,MenuItem,FormControl} from '@mui/material';
import { useData } from '../context/DataContext';

const validationSchema = Yup.object({
  due_date: Yup.date().min(new Date(), 'Due Date must be in the future').required('Due Date is required'),
  priority: Yup.string().required('Priority is required'),
  comments:Yup.string().required("Comment is required")
});

const defaultTheme = createTheme();
export default function TicketUpdateForm({ onClose ,itemId}) {
  const {data,updateTicket}=useData();
  const selectedItem = data.find(item => item.id === itemId) || {};
  const handleSubmit = async(values) => {
    try {
      updateTicket(values); 
      onClose();
      } catch (error) {
        console.error('Error updating ticket:', error);
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
            borderRadius:5
          }}
        >
          <Typography component="h1" variant="h5" marginBottom={5}>
            Update Ticket
          </Typography>
          <Formik
            initialValues={{
              id:selectedItem.id,
              title:selectedItem.title,
              channel: selectedItem.channel,
              email: selectedItem.email,
              due_date: selectedItem.due_date,
              priority: selectedItem.priority,
              category:selectedItem.category,
              comments:selectedItem.comments
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form noValidate>
                <Grid container spacing={2}marginBottom={1} >
                <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      type="date"
                      id="due_date"
                      name="due_date"
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
                  <FormControl fullWidth>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Field
                        as={Select}
                        id="category"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        label="Category"
                      >
                        <MenuItem value={"Open"}>Open</MenuItem>
                        <MenuItem value={"Close"}>Close</MenuItem>
                      </Field>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="comments"
                      name="comments"
                      label="Follow Up"
                      autoFocus
                    />
                  </Grid>
                 
                  <Grid item xs={12} sm={6}>
                    <Button type="submit" fullWidth variant="contained" sx={{bgcolor:'mediumblue'}}>
                      Update
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