import express  from "express";
import { deleteUser, getAllUsers, getBookingsOfUser, getUsersById, loginUser, signup, updateUser } from "../controllers/user-controllers.js";


const userRouter=express.Router();
 
userRouter.get("/",getAllUsers);
userRouter.get("/:id",getUsersById)
userRouter.post("/signup",signup);
userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteUser)
userRouter.post("/login",loginUser);
userRouter.get("/bookings/:id",getBookingsOfUser)
export default userRouter;