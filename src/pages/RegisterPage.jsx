import React from 'react'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'

export const RegisterPage = () => {

  const [activeCheckbox, setActiveCheckbox] = React.useState("STUDENT");

  const schema = yup.object({
    firstName : yup.string().required("ввод имени обязателен!"),
    email : yup.string().email().required("ввод email обязателен!"),
    password: yup.string().min(4, "пароль должен содержать не менее 4 символов!").max(20, "пароль должен содержать не более 20 символов!").required("ввод пароля обязателен!"),
    confirmpassword : yup.string().oneOf([yup.ref("password"), null], "пароли не совпадают!").required("подтверждение пароля обязательно!")
  })
  
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver : yupResolver(schema)
  });

  let api;
  const onSubmit = (data) => {
    if(activeCheckbox === "STUDENT") api = "http://localhost:8080/api/v1/registration/student/"
    if(activeCheckbox === "TEACHER") api = "http://localhost:8080/api/v1/registration/teacher/"
    console.log(data, api)
  }


  

  return (
    <form onSubmit = {handleSubmit(onSubmit)}>

      <h3>Регистрация</h3>
      <input type='text' placeholder='ваше имя' {...register("firstName")}/>
      <small>{errors.firstName?.message || "Ваше имя будет видно остальным пользователям."}</small>

      <input type='email' placeholder='email' {...register("email")}/>
      <small>{errors.email?.message } </small>

      <input type='password' placeholder='пароль' {...register("password")}/>
      <small>{errors.password?.message }</small>
      <input type='password' placeholder='подвердите пароль' {...register("confirmpassword")}/>
      <small>{errors.confirmpassword?.message }</small>
      
    

      <div>
        <input 
          type="radio"
          name="role"
          checked={"STUDENT" === activeCheckbox}
          onClick={() =>{ setActiveCheckbox("STUDENT")}}
          readOnly 
          />
          <label >студент</label>

          <input 
          style={{marginLeft: '1rem'}}
          type="radio"
          name="role"
          checked={"TEACHER" === activeCheckbox}
          onClick={() => { setActiveCheckbox("TEACHER")}}
          readOnly
         />
          <label>преподаватель</label>
      </div>

      
      <div  style={{display:'flex', alignItems: 'center' }}>
        <input type='submit' value={'Зарегестрироваться'} /> 
          
       

       <Link
          style={{textDecoration: 'none', color: 'rgb(27, 106, 106)', fontSize: '0.9rem'}}
          to={'/login'}
        > Уже есть аккаунт?

       </Link>

      </div>
    </form>
  )
}
