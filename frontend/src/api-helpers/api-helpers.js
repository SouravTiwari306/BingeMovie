import axios from "axios";
  
export const getAllMovies= async()=>{
const res= await axios.get("/movie/").catch((err)=> console.log(err));
if(res.status!==200){
    return console.log("NO Data");
}

const data=  await res.data;
console.log(data);
return data;
};
export const sendUserAuthRequest= async(data,signup)=>{
    const res= await axios.post(`/user/${signup ? "signup" :"login"}`,{
    name :signup? data.name: "",
    email:data.email,
    password :data.password,
     } ).catch((err)=>console.log(err));

     if(res.status!==200 &&  res.status!==201){
        console.log("Unexpected error occurred");
     }
     const resData=  await res.data;
     return resData;
     
}
export const sendAdmiAuthRequest= async(data)=>{
    const res= await axios.post("/admin/login",{
    email:data.email,
    password :data.password,
     } ).catch((err)=>console.log(err));
     if(res.status!==201 ){
        console.log("Unexpected error occurred");
     }


     const resData= await res.data;
     return resData;
     
}
export const getMovieDetails= async (id)=>{
      const res= await axios.get(`/movie/${id}`).catch((err)=>console.log(err));
      if(res.status!==200 && res.status!==201){
        return console.log("Unexpected Error");
      }
      const resData= await  res.data;
      return resData;
}


export const  newBooking = async (data)=> {
   const res = await axios
   .post("/booking/",{
     movie :data.movie,
     seatNumber :data.seatNumber,
     date : new Date (data.date),
     user :localStorage.getItem("userid"),
  })
  .catch((err)=>console.log(err));
  if(res.status!==201){
    console.log("unexpected error");
  }
  const resData = await res.data;
  return resData;
}
  export const  getUserBooking = async()=>{
   const id= localStorage.getItem("userid");
   const res = await  axios.get(`/user/bookings/${id}`)
   .catch((err)=>console.log(err));

   if(res.status!==200){
      console.log("unexpected error");
   }
   const resData= await  res.data;
   return resData;
  }


  export const delBooking= async(id)=>{
    const res= await axios.delete(`/booking/${id}`).catch((err)=>console.log(err))
    if(res.status!==200){
      console.log("unexpected error");
   }
   const resData=  await res.data;
   return resData;

  }
  export const deleteMovie = async (id) => {
    const res = await axios
      .delete(`/movie/${id}`)
      .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("Unepxected Error");
    }
  
    const resData = await res.data;
    return resData;
  };

  export const getUserDetails = async ()=>{
   const id = localStorage.getItem("userid");
   console.log(id);
    const res = await  axios.get(`/user/${id}`).catch((err)=>console.log(err))
    if(res.status!==200){
      console.log("unexpected error");
   }
   const resData=  await res.data;
   //console.log(resData);
   return resData;
  }

  export const addMovie= async (data)=>{
  const res = await axios.post(
    "/movie",
  {
    title: data.title,
    description: data.description,
    releaseDate: data.releaseDate,
    posterUrl: data.posterUrl,
    ticketPrice:data.ticketPrice,
    trailerLink:data.trailerLink,
    fetaured: data.fetaured,
    actors: data.actors,
    admin: localStorage.getItem("adminId"),
 },{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`,
  },
 }).catch((err)=>console.log(err))


 if(res.status!==201){
  console.log("unexpected error");
}
const resData=  await res.data;
return resData;

  }

  export const getAdminById= async()=>{
    const adminId= localStorage.getItem("adminId");
    const res= await axios.get(`/admin/${adminId}`).catch((err)=>console.log(err));

    if(res.status!==200){
      console.log("unexpected error");
    }
    
    const resData=  await res.data;
    return resData;

  }
 
