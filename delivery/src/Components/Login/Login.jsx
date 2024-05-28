import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'

const defaultTheme = createTheme();

export default function Login() {
  const [otpBox, setOtpBox] = React.useState(false);
  const [countdown, setCountdown] = React.useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const [phoneNumber,setPhoneNumber] = React.useState(null);
  const [otp,setOtp] = React.useState(null);
  const [dpId, setDpId] = React.useState({});

  const navigate = useNavigate()

  const startCountdown = () => {
    setCountdown(60);
    setIsButtonDisabled(true);

    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsButtonDisabled(false);
    }, 60000);
  };

  

  const handleVerification = () => {
    if(phoneNumber != null && phoneNumber.length>0){
      axios.post(`${process.env.REACT_APP_FOS_DELIVERY_PARTNER_API}/verifydeliverylogin`,{phoneNumber})
      .then((res)=>{
        if(res.data.status == 'success'){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "OTP has been sent to your " + phoneNumber,
            showConfirmButton: false,
            timer: 2500
          }); 
          setDpId(res.data.dpId)
          setOtpBox(true);
          startCountdown();
        }
        else if(res.data == "PhoneNumber Not Valid"){
          Swal.fire({
            title: "Ouch !",
            text: `----PhoneNumber Not Registered----Try another number or make sign up`,
            icon: "question"
          });
        }
      })
    }
    else{
      alert("Enter Mobile Number")
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(otp == 1234){
      localStorage.setItem("dpId",dpId)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "LoginSuccessfully",
        showConfirmButton: false,
        timer: 1500
      });
      window.location.reload();
    }
    else{
      Swal.fire({
        title: "Ouch !",
        text: `--------------- Incorrect OTP ------------- Make send OTP request Again`,
        icon: "question"
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            marginBottom:23,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              onChange={(e)=>setPhoneNumber(e.target.value)}
              type='number'
              autoComplete="phoneNumber"
              autoFocus
            />
            <Button
              onClick={handleVerification}
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? `Send OTP (${countdown}s)` : 'Send OTP'}
            </Button>

            {otpBox && (
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="OTP"
                  name="otp"
                  type='number'
                  autoComplete="otp"
                  autoFocus
                  onChange={(e)=>setOtp(e.target.value)}
                />
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  Sign in
                </Button>
              </div>
            )}

            <Grid sx={{ mt: 2, mb: 2 }} container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot OTP?
                </Link>
              </Grid>
              <Grid item>
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
