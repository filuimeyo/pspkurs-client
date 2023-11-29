import React from 'react'

export const NotificationCard = ({notification}) => {

  //"message": "Новый отклик на заявку!",
	//	"details": "На вашу заявку от 2023-11-05 по предмету французский язык откликнулся преподаватель.\n Французский язык, Дженни откликнулась на вашу заявку.\n Вы можете связаться с преподавателем по почте: teacher@gmail.com",
		
  //"message": "К сожалению вам отказали",
	//	"details": "На вашу заявку от 2023-11-04 по предмету aглийский язык пришел отказ.",


  let message;
  let details;
  if(notification.feedbackType!=null){
    switch(notification.feedbackType){
      case 'REFUSED':{
        message = "К сожалению вам отказали"
        details = `На вашу заявку от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}' пришел отказ.`;
        break
      }
      case 'OK': {
        message = "Преподаватель откликнулся на вашу заявку!"
        details = `На вашу заявку от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}' откликнулся преподаватель.\n
        ${notification.application.subject.name}, ${notification.application.teacher.name} откликнулся(-лась) на вашу заявку. \n
        Вы можете связаться с преподавателем по почте: ${notification.email}`;
        break
      }
    }
  } else{
    message =  "Новый отклик на заявку!"
    details = `На вашу заявку от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}' откликнулся преподаватель.\n
      ${notification.application.subject.name}, ${notification.teacher.name} откликнулся(-лась) на вашу заявку. \n
      Вы можете связаться с преподавателем по почте: ${notification.email}
    `
  }

  const arr = details.split('\n')
  
  return (
    <div 
        className='notification'
    >
      <h5> {notification.applicationDate.slice(0,10)} {notification.applicationDate.slice(11,16)}</h5>
        <h4>{message}</h4>

        {
          details != null?
          (
           
            arr.map((str, i) =>
              <p key={i}>{str}</p>
            )
          ):(<></>)
        }

        
    </div>
  )
}
