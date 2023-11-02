import React from 'react'
import {Navbar} from './Navbar'

export const Layout = ({children}) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className='app'>
        {children}
      </div>
    </React.Fragment>
  )
}
