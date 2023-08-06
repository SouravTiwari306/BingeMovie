import { Box} from '@mui/system';
import React, { Fragment, useEffect,useState } from 'react'
import { delBooking, getUserDetails, getUserBooking } from '../api-helpers/api-helpers'
import { useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { IconButton, List, ListItem, ListItemText, Typography} from '@mui/material';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const toastOptions = {
    position: "bottom-left",
    autoClose: 2500,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
    
  };
  const navigate=useNavigate();
  const [bookings,setBookings]= useState();
  const [user,setUser]= useState();
  useEffect(()=>{
    getUserBooking()
    .then((res)=>setBookings(res.bookings))
    .catch((err)=>console.log(err));

    getUserDetails().then((res)=>setUser(res.user)).catch((err)=>console.log(err))
    
  
  },[]);
  
  const handleDelete=(id,title)=>{
    delBooking(id)
    .then((res)=>{
      console.log(res)
    toast.error(`Booking for '${title}' has been cancelled` ,toastOptions);
    setTimeout(() => {
      navigate('/');
    }, 3700); 
  } 
    )
    .catch((err)=>console.log(err));

  }
  return (
    <div>
  <Box   width ={"100%"} height={"1000px"} display="flex">
 
    <Fragment>
  {" "}
    {user && (<Box 
     flexDirection={"column"}
    justifyContent="center"
    alignItems={"center"}
    width={"30%"}
    padding={3}
    
    boxShadow={"0 0 25px white"}
     backgroundColor={"black"}
     >
      <AccountCircleRoundedIcon sx={{fontSize :"10rem" ,textAlign: "center"  ,ml:3 ,color:"whitesmoke"}}>
      </AccountCircleRoundedIcon>
      <Typography padding={1} width="auto" 
      textAlign={"center"}
      border={" 10px solid grey"}
      borderRadius={6}
      fontFamily={"Georgia, 'Times New Roman', Times, serif"}
      color={"white"}
      >
        Name : {user.name}
      </Typography>
      <Typography padding={1} width="auto" 
      textAlign={"center"}
      border={" 10px solid grey"}
      borderRadius={6}
      fontFamily={"Georgia, 'Times New Roman', Times, serif"}
      color={"white"}
      >
        Email : {user.email}
      </Typography>
      
      </Box>)}
      
   {bookings && ( <Box width={"70%"} display="flex"
    flexDirection={"column"} backgroundColor="black"
    
    >
 <Typography variant="h3" fontFamily={"verdana"}
 textAlign="center" padding={2} color="white">
  BOOKINGS
 </Typography>

    <Box  display="flex"
    flexDirection={"column"} width="80%" marginLeft={9}
    >
 <List>
  {bookings.map((booking,index)=>(
    <ListItem  sx={{bgcolor :"black" ,color:"white" , textAlign :"center" ,margin:"1",
    marginLeft: "3",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
     boxShadow:"0 0 16px grey",
    backgroundColor:"black"
    }}>

  <ListItemText sx={{ margin :1,width :"25%" ,textAlign:"left"}}>
    Movie : {booking.movie.title}
  </ListItemText>
  <ListItemText sx={{ margin :1,width :"19%" ,textAlign:"left"}}>
    SeatNumber : {booking.seatNumber}
  </ListItemText>
  <ListItemText sx={{ margin :1,width :"30%" ,textAlign:"left"}}>
    Date : {new Date (booking.date).toDateString()}
  </ListItemText>
  <IconButton onClick={()=>handleDelete(booking._id,booking.movie.title)} color="error">
    <DeleteForeverRoundedIcon >
    </DeleteForeverRoundedIcon>
  </IconButton>
  </ListItem>
  ))}
 </List>
    </Box>
    </Box>
    )}
    </Fragment>
  </Box>
  </div>
  );
};

export default UserProfile

