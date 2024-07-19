import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import Kapturebg from '../assets/kapturebg.jpg';
import {useSignIn} from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is a required field"),
    password: Yup.string()
      .required("Password is a required field")
      });

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Kapture
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', 
    },
  },
});
export default function SignInSide() {
  const signIn=useSignIn();
  const navigate = useNavigate();
  const handleSubmit = async(values,{setFieldError}) => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const result=await response.json();
      if (response.ok) {
        signIn({
          token: result.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { username: values.username },
        });
        navigate("/");
      } else {
        console.log("Fail login");
        setFieldError('password', 'Invalid Credentials');
        setFieldError('username', 'Invalid Credentials');
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              `url(${Kapturebg})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px', 
            borderRadius: '8px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Login
          </Typography>
          <Formik
            validationSchema={schema}
            initialValues={{ username: '', password: ''}}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange,touched, errors,setFieldError }) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  value={values.username}
                  onChange={handleChange}
                  style={{ width: '75%' }}    
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  style={{ width: '75%' }}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}

                />
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ width: '75%' }}

                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <Copyright/>
        </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}