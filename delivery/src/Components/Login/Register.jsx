import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField'; 
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import Swal from 'sweetalert2'


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const [DP_EmpID,setDP_EmpID]=React.useState('');
  const [DP_Name,setDP_Name]=React.useState('');
  const [DP_EMAIL_ID,setDP_EMAIL_ID]=React.useState('');
  const [DP_PhoneNumber,setDP_PhoneNumber]=React.useState('');
  const [DP_Addressproof,setDP_Addressproof]=React.useState('');
  const [Del_IDproof,setDel_IDproof]=React.useState('');
  const approvalstatus = "pending"

  const handleSubmit = (e) => {
    e.preventDefault();
        axios.post(`${process.env.REACT_APP_FOS_DELIVERY_PARTNER_API}/registerdeliverypartner`,{DP_EmpID, DP_Name, DP_EMAIL_ID, DP_PhoneNumber, DP_Addressproof, Del_IDproof,approvalstatus})
        .then((res)=>{
            setTimeout(()=>{
                window.location.reload();
            },2000)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Request Sent",
                showConfirmButton: false,
                timer: 2000
              });
        })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="DP_ID"
                  label="DP_ID"
                  autoFocus
                  onChange={(e)=>setDP_EmpID(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="DP_Name"
                  autoFocus
                  onChange={(e)=>setDP_Name(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  onChange={(e)=>setDP_EMAIL_ID(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="phone number"
                  name="phone number"
                  autoComplete="family-name"
                  onChange={(e)=>setDP_PhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="text"
                  label="Address proof"
                  name="email"
                  autoComplete="text"
                  onChange={(e)=>setDP_Addressproof(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="del_id"
                  label="del_id"
                  type="del_id"
                  id="del_id"
                  autoComplete="new-password"
                  onChange={(e)=>setDel_IDproof(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid sx={{ mt: 3, mb: 2 }} item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider> 
  );
}