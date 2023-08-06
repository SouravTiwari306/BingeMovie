import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendAdmiAuthRequest } from '../../api-helpers/api-helpers';
import { adminActions } from '../../store';
import AuthForm from './AuthForm'

const Admin = () => {
  const navigate =useNavigate();
  const dispatch= useDispatch();
  const onResRecieved= (data)=>{
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId",data.id);
    localStorage.setItem("token",data.token)
    navigate("/");
  }
  const getData=(data)=>{
    console.log(data);
    sendAdmiAuthRequest(data.inputs)
    .then(onResRecieved)
    .catch((err)=>console.log(err));
      }
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}>
      </AuthForm>
    </div>
  )
}

export default Admin
