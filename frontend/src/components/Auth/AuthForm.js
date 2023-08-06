import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {Link} from "react-router-dom"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const labelStyle={
    mt:1,
    mb:1,
    color:"black"
}
const AuthForm = ({onSubmit,isAdmin}) => {
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:"",
    });
    const[isSignup,setIsSignup]=useState(false);
    const handleChange=(e)=>{
        setInputs((prevState)=>({...prevState,
            [e.target.name]:e.target.value,
        }))
    }
    const handleSubmit=(e)=>{
e.preventDefault();
onSubmit({inputs,signup:isAdmin?false :isSignup});
    };
  return (
    <Dialog PaperProps={{style:{borderRadius:20.,backgroundColor: "#bfff80", boxShadow: "0 0 8px  inset,0 0 20px #ff80bf"}}} open={true}>
        <Box sx={{ml:"auto", padding:1}}>
            <IconButton LinkComponent={Link} to="/" style={{color:"gray"}}>
                <CloseRoundedIcon />
            </IconButton>
        </Box>
        <Typography variants="h4" textAlign={"center"}
        fontFamily={"Segoe UI"}
        fontWeight="400"
        fontSize={40}
        >
        {isSignup ? "Signup" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
            <Box  padding={6}
            display={"flex"} justifyContent={'center'} flexDirection="column" width={300} 
            margin="auto"
            alignContent={'center'}
            >
                 {!isAdmin && isSignup && (
                 <>
                 {" "}
                 <FormLabel sx={labelStyle}>
                    Name
                </FormLabel>
                <TextField  value={inputs.name} onChange={handleChange}margin='normal'  variant ="standard" type={'text'} name="name" 
                 sx={{ input : { color: 'blue' } }}
                ></TextField>
                </>
                 )}
                <FormLabel sx={labelStyle}>
                    Email
                </FormLabel>
                <TextField
                value={inputs.email} onChange={handleChange} margin='normal'  variant ="standard"type={'email'} name="email"
                sx={{ input: { color: 'black' } }}
                ></TextField>
            <FormLabel>
                Password
            </FormLabel>
            <TextField value={inputs.password} onChange={handleChange}  margin='normal'
            variant ="standard" type={'password'} name="password"
            sx={{ input: { color: 'black' } }}
            ></TextField>
            
            <Button sx={{mt:2,borderRadius:10 ,bgcolor:"#2b2d42"}} type="submit" fullWidth variant='contained'>
                {isSignup ?"Singup" : "Login"}</Button>
            {!isAdmin && (<Button  onClick ={()=>
            setIsSignup(!isSignup)
            }sx={{mt:2,borderRadius:10,fontWeight:"500"}} fullWidth variant='contianed'> Switch To {isSignup?"Login" :"Signup"}</Button>)}
            </Box>
        </form>
    </Dialog>
  )
}

export default AuthForm
