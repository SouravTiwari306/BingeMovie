import { Box } from '@mui/system';
import React, { Fragment, useEffect,useState } from 'react'
import { getAdminById,deleteMovie} from '../api-helpers/api-helpers'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import {IconButton,List, ListItem, ListItemText, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
const AdminProfile = () => {

  const toastOptions = {
    position: "bottom-left",
    autoClose: 2200,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };
  const navigate=useNavigate();
  const [admin,setAdmin]= useState();
  
  useEffect(()=>{
    getAdminById().then((res)=>setAdmin(res.admin)).catch((err)=>console.log(err))
  },[]);
  console.log(admin);
  const handleDelete = (id,title) => {
    deleteMovie(id)
      .then((res) =>{
        console.log(res)
        toast.error(`'${title}' removed` ,toastOptions);
        setTimeout(() => {
          navigate('/movies');
        }, 3700); 
      } )
      .catch((err) => console.log(err));
  };
  return (
  <Box width ={"100%"} height={"1000px"} display="flex">
    <Fragment>
  {" "}
    {admin && (<Box Box flexDirection={"column"}
    justifyContent="center"
    alignItems={"center"}
    width={"30%"}
    padding={3}
    boxShadow={"0 0 25px grey"}
            backgroundColor={"#F96167"}
     >
      <AccountCircleRoundedIcon sx={{fontSize :"10rem" ,textAlign: "center"  ,ml:3 ,color:"white"}}>
      </AccountCircleRoundedIcon>
     
      <Typography padding={1} width="auto" 
      textAlign={"center"}
      border={" 10px solid #ccc"}
      borderRadius={6}fontFamily={"Georgia, 'Times New Roman', Times, serif"}
      color={"white"}
      >
        Email : {admin.email}
      </Typography>
      </Box>
      )}

      
   {admin && admin.addedMovies.length>0 && ( 
   <Box width={"70%"} display="flex"
   bgcolor={"#F9E795"}
    flexDirection={"column"}
    >
 <Typography variant="h3" 
 textAlign="center" 
 padding={2}
 fontFamily={"Georgia, 'Times New Roman', Times, serif"}
  fontWeight="500"
  marginLeft={6}
  color={"black"}
 >
  ADDED MOVIES
 </Typography>

    <Box  display="flex"
    flexDirection={"column"} width="80%"
    marginLeft={10}
    >
 <List>
  {
  admin.addedMovies.map((movie,index)=>(

    <ListItem sx={{
       color:"white" , textAlign :"center" ,margin:"1",
      boxShadow:"0 0 16px grey",
      backgroundColor:"black"
    }}
      >
  <ListItemText sx={{ margin :1,widht :"auto" ,textAlign:"left",
  fontFamily: "Verdana, Geneva, Tahoma, sans-serif"
}}>
    Movie : {movie.title}
  </ListItemText>
  <IconButton
                      onClick={() => handleDelete(movie._id,movie.title)}
                      color="error"
                    >
                      <DeleteForeverIcon />
                      <ToastContainer/>
                    </IconButton>
  </ListItem>
   ))}
 </List>
    </Box>
    </Box>)}
    </Fragment>
      
  </Box>
  )
}

export default AdminProfile

