import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {

  const [activeCheckbox, setActiveCheckbox] = React.useState("STUDENT");
  
  return (
    <form onSubmit = {e => {e.preventDefault()
      console.log(activeCheckbox)}}>

      <h3>Регистрация</h3>
      <input type='text'
        placeholder='username'
      />

      <input type='email'
      placeholder='email'
      />

      <input type='password'
      placeholder='password'
      />

      {/* <input 
          type="radio"
          name="role"
          checked={"STUDENT" === activeCheckbox}
          onClick={() =>{ setActiveCheckbox("STUDENT")}}
          readOnly />cтудент

      <div>
        <input 
          type="radio"
          name="role"
          checked={"TEACHER" === activeCheckbox}
          onClick={() => { setActiveCheckbox("TEACHER")}}
          readOnly />
        преподаватель   
      </div> */}
    

      <div>
        <input 
          type="radio"
          name="role"
          checked={"STUDENT" === activeCheckbox}
          onClick={() =>{ setActiveCheckbox("STUDENT")}}
          readOnly />
          <label >студент</label>

          <input 
          style={{marginLeft: '1rem'}}
          type="radio"
          name="role"
          checked={"TEACHER" === activeCheckbox}
          onClick={() => { setActiveCheckbox("TEACHER")}}
          readOnly />
          <label for="radio-2">преподаватель</label>
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
