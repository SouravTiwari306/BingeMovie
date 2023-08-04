import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user-routes.js';
import adminRouter from './routes/admin-routes.js';
import movieRouter from './routes/movie-routes.js';
import bookingRouter from './routes/booking-routes.js';
import CorsOptions  from 'cors';
dotenv.config();
const app= express();
app.use(express.json());

//middleware
app.options('*', CorsOptions())
app.use("/user",userRouter);
 app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use ("/booking",bookingRouter);
mongoose.connect(`mongodb+srv://souravtiwari7491:D1zS5rfjKdYlPFdh@cluster0.jeseruh.mongodb.net/?retryWrites=true&w=majority`
).then(()=>{
    app.listen(5000,()=>{
        console.log(`connected to Database and Server is running`)
    });
}
)
.catch((e)=>
    console.log(e)
)

