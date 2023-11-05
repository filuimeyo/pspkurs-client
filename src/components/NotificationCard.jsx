import React from 'react'

export const NotificationCard = ({notification}) => {

  const [viewed, setViewed] = React.useState(notification.isViewed);

  const arr =notification.details?.split('\n')

  let mybutton;
  if(!viewed){
    mybutton =
    <button
      onClick ={(e) => {
        alert('позже тут отправиться запрос, чтобы сделать уведомление прочитанным');
        setViewed(true)
      }}
    
    >
      Пометить как прочитанное
    </button>
  }
  
  return (
    <div 
        className='notification'
    >
      <h5 className= {viewed? "" : "newnotif"}> {notification.createdAt.slice(0,10)} {notification.createdAt.slice(11,16)}</h5>
        <h4 
          
        >{notification.message}</h4>

        {
          notification.details != null?
          (
            //arr = notification.details.split("\t")
         
            arr.map((str, i) =>
              <p key={i}>{str}</p>
            )
          ):(<></>)
        }

        {mybutton}
    </div>
  )
}
