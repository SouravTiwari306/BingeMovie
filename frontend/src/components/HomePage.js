import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../api-helpers/api-helpers'
import MovieItem from './Movies/MovieItem'


const HomePage = () => {
    const [movies,setMovies]= useState([]);
      useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log(err))
      })
      
  return (
   <Box   backgroundColor="#ffcc99" width={"100%"} height ="100%" margin ="auto">
    <Box margin ={"auto"}  width="80%" height={"60vh"} padding={2} borderRadius={"4%"}>
    <img 
    src="https://movies.universalpictures.com/media/03-opp-dm-mobile-banner-1080x745-pl-f01-062122-62defaa505f81-1.jpg" alt="Oppenheimer"
    width={"100%"}
    height={"100%"}/>
    </Box>
<Box padding={5} margin="auto">
    <Typography variant="h4"     textAlign={"center"}
    fontFamily={"Georgia, 'Times New Roman', Times, serif"} fontWeight={"500"} backgroundColor="black"  display={"inline"} justifyContent={"center"} marginLeft={63} padding={1} color={"white"}
    >
      LATEST RELEASE
    </Typography>
</Box >
<Box 
margin={"auto"}
display={"flex"} 
width="80%"
justifyContent={"center"}
alignItems='center'
flexWrap="wrap"
>
 { movies && movies.slice(0,4).map((movie,index)=>(< MovieItem  
 id={movie._id}  title={movie.title}
 posterUrl={movie.posterUrl}
 releaseDate= {movie.releaseDate}
 key={index}/>
))}
</Box>
<Box display={"flex"} padding ={5} marign="auto">
<Button  LinkComponent={Link}  to ="/movies" variant='outlined' sx={{margin:"auto"  ,color :"#2b2d42"}}>
    View All Movies
</Button>
</Box>
   </Box>
  )
}

export default HomePage
