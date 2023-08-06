import {Box,Typography } from '@mui/material'

import React, { useState, useEffect } from 'react'
import { getAllMovies } from '../../api-helpers/api-helpers';
import MovieItem from './MovieItem';

const Movies = () => {
    const [movies,setMovie]=useState();
    useEffect(() => {
      getAllMovies().then((data)=>setMovie(data.movies)).catch((err)=> console.log(err))}  
    ,[]);
  return (<Box backgroundColor="#ffcc99" marginRight={0} widht={"100%"}>
    <Typography  
    margin={"auto"}
    variant="h4"
    padding={2}
    width="40%"
    bgcolor={"#1d1d20ad"}
    color="white"
    textAlign={"center"}
    borderRadius={"1%"}
    fontFamily={"Georgia, 'Times New Roman', Times, serif"}
    fontWeight={"bolder"}
    boxShadow={"0 0 25px grey"}
    >
        AllMovies
        </Typography>
    <Box
    width={"100%"}
    marginLeft="3.4%"
    marginTop={5}
    display={"flex"}
    justifyContent="flex-start"
    flexWrap={"wrap"}
    >
        {movies && movies.map((movie,index)=> <MovieItem 
        key={index}
        id={movie._id}
        posterUrl={movie.posterUrl}
        releaseDate={movie.releaseDate}
        title={movie.title}
        />
        )
     }
    </Box>
  </Box>)
}

export default Movies
