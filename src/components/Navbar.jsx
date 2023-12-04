import React from 'react'
import UserIcon from '../user.svg'
import { Link } from 'react-router-dom'

import { UserContext } from '../App';
import { useState , useContext} from 'react'

export const Navbar = () => {
  const { user, setUser } = useContext( UserContext);
  return (
    <header>

      <div>
       <Link
          style={{textDecoration: 'none', color: 'rgb(27, 106, 106)', fontSize: '0.9rem'}}
            to={'/'}
          > 
          <h3 className='link'>Главная</h3>

        </Link>
      </div>
       

     

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
