import React from 'react'
import UserIcon from '../user.svg'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <header>
      <Link to={"/register"}>
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
