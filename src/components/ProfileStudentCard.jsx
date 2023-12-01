import React from 'react'

import { UserContext } from '../App';
import { useState , useContext} from 'react'

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
            <button onClick={(e) => alert(userc.id)}>
                Изменить пароль
            </button>

            <button onClick={(e) => {setUser(false)}}>
               Выйти
            </button>

        </div>
    </div>
  )
}
