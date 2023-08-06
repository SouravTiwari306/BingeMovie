import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";
import dotenv  from "dotenv";

dotenv.config();
   export const addAdmin = async(req,res,next)=>{
    const {email,password}=req.body;
    let existingAdmin;
    try{
        existingAdmin = await Admin.findOne({email})

    }catch(err){
        return console.log(err);
    }
if(existingAdmin){
   return  res.status(400).json({message :"Admin already exist"});
}
let admin;
const hashedPassword= bcrypt.hashSync(password)
try{
 admin = new Admin({email,password : hashedPassword});
 admin = await admin.save();
}
catch(err){
    return console.log(err);
}
if(!admin){
    return res.status(500).json({message : " unable to create admin "})
}

return res.status(201).json({admin});
}


export const adminLogin= async (req,res,next)=>{
    const {email,password}=req.body;
    console.log(email);
    if( !email && email.trim()==="" &&!password && password.trim() ==="")
    {
        return res.status(422).json({message:"Invalid Inputs"})
    }
    let existingAdmin;
    try{
    existingAdmin= await Admin.findOne({email});
    } catch(err){
        return console.log(err);
    }
    if(!existingAdmin){
    return res.status(500).json({message : "Admin Doesnot exist"})
    }
    const isPasswordCorrect= bcrypt.compareSync(password,existingAdmin.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message : "Invalid Crednetials"})
    }

    const token=jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{expiresIn:"7d",

    });
          return res.status(200).json({message :"Authentication Complete",token,id :existingAdmin._id});
     
}

export const  getAdmin=  async(req,res,next)=>{
    let admins ;
    try{
 admins= await Admin.find();
    }
    catch (err){
        return console.log(err);
    }
    if(!admins){
        return res.status(500).json({message :"Interval serevr Error"});

    }
    return res.status(200).json({admins});
}
export const  getAdminById=  async(req,res,next) =>{
    const id =req.params.id;
    console.log(id);
    let admin ;
    try{
 admin= await Admin.findById(id).populate("addedMovies");
    }
    catch (err){
        return console.log(err);
    }
    //console.log(admin);
    if(!admin){
        return res.status(500).json({message :"Cannot FInd Admin"});
    }
    return res.status(200).json({admin});
}



