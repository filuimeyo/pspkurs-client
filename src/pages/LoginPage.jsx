import React from 'react'
import { Link } from 'react-router-dom'

export const LoginPage = () => {
  return (
    <form onSubmit = {e => e.preventDefault()}>
      <h3>Авторизация</h3>
      <input type='email'
        placeholder='email'
        />

        <input type='password'
        placeholder='password'
        />

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
