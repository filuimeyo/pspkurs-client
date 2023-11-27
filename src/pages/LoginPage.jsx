import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios';


const API_URL = "http://localhost:8080/api/v1/public/auth/signin"

export const LoginPage = () => {

 
  const navigate = useNavigate();

  const schema = yup.object({
    email : yup.string().email().required("ввод email обязателен!"),
    password: yup.string().min(4, "пароль должен содержать не менее 4 символов!").max(20, "пароль должен содержать не более 20 символов!").required("ввод пароля обязателен!"),
  })
  
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver : yupResolver(schema)
  });


  const onSubmit = (data) => {
    

    axios.post( API_URL, data, {headers: {
      'Content-Type': 'application/json'}})
      .then(res => {
        localStorage.setItem("token", res.data.token )
        navigate("/profilestudent")
      })
      .catch(res => alert(res))
  }
    
  

  return (
    <form onSubmit = {handleSubmit(onSubmit)}>
      <h3>Авторизация</h3>
      <input type='email' placeholder='email' {...register("email")}/>
      <small>{errors.email?.message } </small>

      <input type='password' placeholder='password' {...register("password")}/>
      <small>{errors.password?.message }</small>
      <div style={{display:'flex', alignItems: 'center' }}>
      <input type='submit' value={'Войти'} /> 

       <Link
        style={{textDecoration: 'none', color: 'rgb(27, 106, 106)', fontSize: '0.9rem'}}
          to={'/register'}
        > Нет аккаунта?

       </Link>

      </div>
    </form>
  )
}
