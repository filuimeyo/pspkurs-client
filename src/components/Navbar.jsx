import React from 'react'
import UserIcon from '../user.svg'
import { Link } from 'react-router-dom'

import { UserContext } from '../App';
import { useState , useContext} from 'react'

export const Navbar = () => {
  const { user, setUser } = useContext( UserContext);
  return (
    <header>

       
        <Link
          style={{textDecoration: 'none', color: 'rgb(27, 106, 106)', fontSize: '0.9rem'}}
            to={'/'}
          > Главная

        </Link>

     

      <Link to={user? "/profilestudent": "/login"}>
        <button>
          <img
            src={UserIcon}
            alt='profile'
          ></img>
        </button>
      </Link>
    </header>
  )
}
