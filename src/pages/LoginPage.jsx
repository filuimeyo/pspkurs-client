import React from 'react'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'

export const LoginPage = () => {

  const schema = yup.object({
    email : yup.string().email().required("ввод email обязателен!"),
    password: yup.string().min(4, "пароль должен содержать не менее 4 символов!").max(20, "пароль должен содержать не более 20 символов!").required("ввод пароля обязателен!"),
  })
  
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver : yupResolver(schema)
  });

  let api = "http://localhost:8080/api/v1/login"
  const onSubmit = (data) => {
    console.log(data, api)
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
