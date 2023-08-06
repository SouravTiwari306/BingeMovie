import React, { useEffect  } from "react";
import {AppBar, Autocomplete, TextField, Toolbar ,Tabs, Tab, IconButton} from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import {Box} from "@mui/system"
import { useState } from "react";
import { getAllMovies } from "../api-helpers/api-helpers.js";

import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store/index.js";
const Header =()=>{
    const navigate=useNavigate();
    const dispatch= useDispatch();
    const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn);
    const [movies,setMovies]=useState([]);
    const [value, setValue] = useState();
    useEffect(()=>{
        getAllMovies()
        .then((data)=>setMovies(data.movies))
        .then((data)=>console.log(data))
        .catch((err)=>console.log(err));
    } ,[]);
    const logout=(isAdmin)=>{
     dispatch(isAdmin?adminActions.logout(): userActions.logout());
    }
    const handleChange=(e,val)=>{   
        const movie= movies.find((m)=>m.title===val);
        console.log(movie);
        if(isUserLoggedIn){
            navigate(`/booking/${movie._id}`)
        }
    }
return (
<AppBar  position ="sticky" sx={{bgcolor:"#1d1d20ad"}}>
    <Toolbar>
        <Box width={"20%"}>
            <IconButton  LinkComponent={Link} to ="/"  tyle={{color:"rgba(190, 186, 186, 0.849)"}}><MovieIcon/></IconButton>
        </Box>
        <Box width={"30%"} margin="auto">
            <Autocomplete
            onChange={handleChange}
        freeSolo
       options={movies && movies.map((option) => option.title)}
        renderInput={(params) => (
        <TextField
        sx={{input :{color:"white"}}}
            variant ="standard" 
            {...params} 
            placeholder="Search Across Movie"/>)}
          />
        </Box>

        <Box display={"flex"}>
            <Tabs
              textColor="inherit" 
            indicatorcolor="secondary"

            value={value}
            onChange={(e)=>setValue(e.target.value)}
              >
                <Tab label ="Movies" LinkComponent={Link} to="/movies" />
                {!isAdminLoggedIn && !isUserLoggedIn && <>
                    <Tab label="Admin"  LinkComponent={Link} to="/admin" />
                <Tab label="User" LinkComponent={Link} to="/auth"/>
                </>}
    
    {isUserLoggedIn && (
        <>
         <Tab label="Profile"  LinkComponent={Link} to="/user" />
        <Tab  onClick={()=>logout(false)} label="Logout" LinkComponent={Link} to="/"/>
        </>
    )}
     {isAdminLoggedIn && (
        <>
         <Tab label="AddMovies"  LinkComponent={Link} to="/add" />
         <Tab label="Profile"  LinkComponent={Link} to="/user-admin" />
        <Tab onClick={()=>logout(true)} label="Logout" LinkComponent={Link} to="/"/>
        </>
    )}
            </Tabs>

        </Box>
        </Toolbar>

</AppBar>
)
}

export default Header;