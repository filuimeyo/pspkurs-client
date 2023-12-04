import React from 'react'

import { UserContext } from '../App';
import { useState , useContext} from 'react'
import { Link } from 'react-router-dom'

export const ProfileStudentCard = ({user: userc}) => {
    const { user, setUser } = useContext( UserContext);

  return (
    <div className='profilePage'>
        <div>
            <img
                src={userc.student.fileName != null ? ""+userc.student.fileName : "https://via.placeholder.com/300"}
                alt='user pic'
            ></img>
        </div>
        <div>
            <input type='text'
            // placeholder='password'
            value = {userc.student.firstName}
            />
            <input type='email'
            // placeholder='password'
            value = {userc.email}
            />
           <button >
                    <Link to={"/changepassword"} style={{ textDecoration: 'none', fontSize: '0.8rem', color : "black" }} >
                        Изменить пароль                   
                    </Link>
                
            </button>
            <button onClick={(e) => {setUser(false)}}>
               Выйти
            </button>

        </div>
    </div>
  )
}
