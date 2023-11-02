import React from 'react'
import UserIcon from '../user.svg'

export const Navbar = () => {
  return (
    <header>
      <button>
        <img
          src={UserIcon}
          alt='profile'
        ></img>
      </button>
      
    </header>
  )
}
