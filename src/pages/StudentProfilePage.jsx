import React from 'react'
import {useEffect, useState,  useContext} from "react";
import { LikedTeacherLiked } from '../components/LikedTeacherLiked';
import { NotificationCard } from '../components/NotificationCard';
import { ProfileStudentCard } from '../components/ProfileStudentCard';
import { ApplicationStudentCard } from '../components/ApplicationStudentCard';
import { ApplicationSubjectCard } from '../components/ApplicationSubjectCard';
import {UserCard} from '../components/UserCard'
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../App';
import { TeacherProfileCard } from '../components/TeacherProfileCard';


const API_URL = "http://localhost:8080/api/v1/user/profile"

const mockedliked = [
	{
		"id": 1,
		"firstName": "Дженни",
		"lastName": "teacher",
		"info": "Привет! Я Учитель Дженни! Преподаю английский более 10 лет. Я люблю преподавать язык и литературу. Я всегда слежу за тем, чтобы мои ученики изучали английский весело и увлекательно.\n\nЯ преподаватель ESL из Великобритании. Я работаю учителем 10 лет. У меня есть степень бакалавра среднего образования, степень магистра творческого письма и сертификат TEFL (сертификация CPD).\n\nЯ больше сосредоточен на грамматике, фонетике, разговорном английском, разговорной речи, аудировании, чтении и письме. Студенты могут рассчитывать на веселые, увлекательные и захватывающие занятия с моими уникальными подходами и стратегиями обучения.",
		"lessonPrice": 22.0,
		"fileName": null,
		"filePath": null,
		"teacherSubjects": [
			{
				"id": 9,
				"name": "французский язык",
				"fileName": "264a9112-de14-4b52-a959-5968dad77539.jpg",
				"filePath": "D:\\Desktop\\uploadspspkurs\\subject\\264a9112-de14-4b52-a959-5968dad77539.jpg",
				"lessonApplications": []
			},
			{
				"id": 14,
				"name": "мастерство игры в симс",
				"fileName": "f1a5d7f1-488d-4930-93aa-4317b59f0f6d.jpg",
				"filePath": "D:\\Desktop\\uploadspspkurs\\subject\\f1a5d7f1-488d-4930-93aa-4317b59f0f6d.jpg",
				"lessonApplications": []
			},
			{
				"id": 7,
				"name": "английский язык",
				"fileName": "fc1b9aba-3ec8-4ce9-9afb-be199fc895ec.jpg",
				"filePath": "D:\\Desktop\\uploadspspkurs\\subject\\fc1b9aba-3ec8-4ce9-9afb-be199fc895ec.jpg",
				"lessonApplications": []
			}
		],
		"purposes": [
			{
				"id": 1,
				"purpose": "подготовка к экзаменам",
				"lessonApplications": []
			}
		],
		"certificates": [
			{
				"id": 1,
				"fileName": "82e680a5-9abe-4b33-b7ec-111a245de9d3.jpg",
				"filePath": "D:/Desktop/uploadspspkurs/82e680a5-9abe-4b33-b7ec-111a245de9d3.jpg"
			}
		],
		"teacherRating": [
			{
				"id": 1,
				"rating": 10,
				"comment": "Очень рад ,что выбрал репетитором именно Анастасию Викторовну. Во-первых, с первого же занятия общение оказалось лёгким ,непринуждённым и комфортным , что безусловно влияет на качество усваиваемого материала. Во-вторых, чтобы убедиться ,что материал действительно усвоен , Анастасия на протяжении занятия интересуется все ли понятно , объясняет снова , если есть необходимость ; указывает на ошибки, исправляет их ,даёт материал для закрепления пройденных уроков. В-третьих, также приятно ,что по окончании занятий Анастасия уточняет остались ли у меня вопросы ,всем ли я доволен касательно подачи материала. Если же нет, то она открыта для диалога и готова выстроить работу таким образом ,чтобы было комфортно в первую очередь мне . Работать с Анастасией приятно , продуктивно , легко и комфортно. Всем желающим подготовиться к экзаменам /повысить уровень владения китайский языком / начать изучение китайского настоятельно рекомендую обратиться именно к ней !"
			},
			{
				"id": 3,
				"rating": 9,
				"comment": null
			},
			{
				"id": 2,
				"rating": 7,
				"comment": null
			}
		],
		"finalRating": 8.666666666666666,
		"lessonApplications": []
	},
	{
		"id": 2,
		"firstName": "Хермет Сосэдж-Хансен",
		"lastName": "teacher",
		"info": null,
		"lessonPrice": 22.0,
		"fileName": "a2d94804-1bdc-44ce-a2da-7f42112c36ce.jpg",
		"filePath": "D:\\Desktop\\uploadspspkurs\\teacherpic\\a2d94804-1bdc-44ce-a2da-7f42112c36ce.jpg",
		"teacherSubjects": [
			{
				"id": 7,
				"name": "английский язык",
				"fileName": "fc1b9aba-3ec8-4ce9-9afb-be199fc895ec.jpg",
				"filePath": "D:\\Desktop\\uploadspspkurs\\subject\\fc1b9aba-3ec8-4ce9-9afb-be199fc895ec.jpg",
				"lessonApplications": []
			}
		],
		"purposes": [],
		"certificates": [],
		"teacherRating": [
			{
				"id": 4,
				"rating": 5,
				"comment": null
			}
		],
		"finalRating": 5.0,
		"lessonApplications": []
	}
]

const mockedNotif = [
	{
		"id": 2,
		"message": "Новый отклик на заявку!",
		"details": "На вашу заявку от 2023-11-05 по предмету французский язык откликнулся преподаватель.\n Французский язык, Дженни откликнулась на вашу заявку.\n Вы можете связаться с преподавателем по почте: teacher@gmail.com",
		"isViewed": false,
		"createdAt": "2023-11-05T20:14:04"
	},
	{
		"id": 1,
		"message": "К сожалению вам отказали",
		"details": "На вашу заявку от 2023-11-04 по предмету aглийский язык пришел отказ.",
		"isViewed": true,
		"createdAt": "2023-11-04T20:09:11"
	}
]

const mockedUser = {
	"id": 1,
	"email": "admin@gmail.com",
	"password": "$2a$10$nvbOrLeOefDBUK3tiLV8B.CO01bV.EnGTPBwxKne/nRZ7RpWOd9Bi",
	"appUserRole": "STUDENT",
	"locked": false,
	"enabled": false,
	"teacher": null,
	"student": {
		"id": 1,
		"firstName": "amed",
		"lastName": "almed",
		"lessonApplications": []
	},
	"username": "admin@gmail.com",
	"accountNonLocked": true,
	"authorities": [
		{
			"authority": "STUDENT"
		}
	],
	"accountNonExpired": true,
	"credentialsNonExpired": true
}


const users = [
	{
		"id": 1,
		"email": "student@gmail.com",
		"password": "$2a$10$nvbOrLeOefDBUK3tiLV8B.CO01bV.EnGTPBwxKne/nRZ7RpWOd9Bi",
		"appUserRole": "STUDENT",
		"locked": false,
		"enabled": false,
		"teacher": null,
		"student": {
			"id": 1,
			"firstName": "amed",
			"lastName": "almed",
		},
		"accountNonLocked": true,
		"authorities": [
			{
				"authority": "STUDENT"
			}
		],
		"accountNonExpired": true,
		"credentialsNonExpired": true
	},
	{
		"id": 2,
		"email": "teacher@gmail.com",
		"password": "$2a$10$nvbOrLeOefDBUK3tiLV8B.CO01bV.EnGTPBwxKne/nRZ7RpWOd9Bi",
		"appUserRole": "TEACHER",
		"locked": false,
		"enabled": false,
		"teacher":{
			"id": 2,
			"firstName": "Хермет Сосэдж-Хансен",
			"lastName": "teacher",
			"info": null,
			"lessonPrice": 22.0,
			"fileName": "a2d94804-1bdc-44ce-a2da-7f42112c36ce.jpg",
			"filePath": "D:\\Desktop\\uploadspspkurs\\teacherpic\\a2d94804-1bdc-44ce-a2da-7f42112c36ce.jpg",
		},
		"student": null,
		"accountNonLocked": true,
		"authorities": [
			{
				"authority": "STUDENT"
			}
		],
		"accountNonExpired": true,
		"credentialsNonExpired": true
	},
	{
		"id": 3,
		"email": "admin@gmail.com",
		"password": "$2a$10$nvbOrLeOefDBUK3tiLV8B.CO01bV.EnGTPBwxKne/nRZ7RpWOd9Bi",
		"appUserRole": "ADMIN",
		"locked": false,
		"enabled": false,
		"teacher":null,
		"student": null,
		"accountNonLocked": true,
		"authorities": [
			{
				"authority": "STUDENT"
			}
		],
		"accountNonExpired": true,
		"credentialsNonExpired": true
	}
]

const mockedApplications = [

	{
		"id": 1,
		"subject":{
			"id": 9,
			"name": "французский язык",
			"fileName": "264a9112-de14-4b52-a959-5968dad77539.jpg",
			"filePath": "D:\\Desktop\\uploadspspkurs\\subject\\264a9112-de14-4b52-a959-5968dad77539.jpg",
			"lessonApplications": []
		},
		"teacher": null,
		"purpose": {
			"id": 1,
			"purpose": "подготовка к экзаменам",
		},
		"details": "хачу выучить язык за 2 часа",
		"createdAt": "2023-11-05T20:14:04",
	},
	{
		"id": 2,
		"subject": {
			"id": 7,
			"name": "английский язык",
			"fileName": "fc1b9aba-3ec8-4ce9-9afb-be199fc895ec.jpg",
			"filePath": "D:\\Desktop\\uploadspspkurs\\subject\\fc1b9aba-3ec8-4ce9-9afb-be199fc895ec.jpg",
			"lessonApplications": []
		},
		"teacher": {
			"id": 2,
			"firstName": "Хермет Сосэдж-Хансен",
			"lastName": "teacher",
			"info": null,
			"lessonPrice": 22.0,
			"fileName": "a2d94804-1bdc-44ce-a2da-7f42112c36ce.jpg",
			"filePath": "D:\\Desktop\\uploadspspkurs\\teacherpic\\a2d94804-1bdc-44ce-a2da-7f42112c36ce.jpg",
			"teacherSubjects": [
				{
					"id": 7,
					"name": "английский язык",
					"fileName": "fc1b9aba-3ec8-4ce9-9afb-be199fc895ec.jpg",
					"filePath": "D:\\Desktop\\uploadspspkurs\\subject\\fc1b9aba-3ec8-4ce9-9afb-be199fc895ec.jpg",
					"lessonApplications": []
				}
			],
			"purposes": [],
			"certificates": [],
			"teacherRating": [
				{
					"id": 4,
					"rating": 5,
					"comment": null
				}
			],
			"finalRating": 5.0,
			"lessonApplications": []
		},
		"createdAt": "2023-11-04T20:14:04",
		"details": null,
		"purpose": null
	}

	
]

export const StudentProfilePage = () => {

	const { user, setUser } = useContext( UserContext);
	const [tabs, setTabs] = useState([]);

	const [isAdmin, setIsAdmin] = useState(false)
	const navigate = useNavigate();

	
	if(!user){
		navigate("/login")
	}


	const serchStudent = async () => { 
		const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
	
		};


		axios.get(API_URL,{headers})
		.then(function (response) {
			console.log(response.data)

			switch(response.data.role){
				case "STUDENT" : {

					setTabs(
						[
							{
								id: 1,
								tabTitle: 'Мой профиль',
								content: <ProfileStudentCard user = {response.data.user}/>,
							},
							{
								id: 2,
								tabTitle: 'Мои заявки',
								content:
									response.data.applications!=null &&
									(
										response.data.applications.length>0?
										(
											response.data.applications.map((application) =>
												<ApplicationStudentCard key={application.id} application={application} role = {response.data.role}/>
											)
										):(
											<p>У вас пока нет заявок</p>
										)
									
									)
							},
							{
								id: 3,
								tabTitle: 'Отклики',
								content:
									response.data.feedbacks!=null &&
									(
										response.data.feedbacks.length>0 ?
										(
											response.data.feedbacks.map((application) =>
											<NotificationCard 
												key={application.id}
												notification={application}
												role = {response.data.role}
											/>
											)
										):(
											<p>На ваши заявки пока нет откликов</p>
										)
									)

							}
						]
						
					)

					break;
					
				}	
				case "TEACHER": {
					setTabs(
						[
							{
								id: 1,
								tabTitle: 'Мой профиль',
								content: <TeacherProfileCard suser = {response.data.user}/>,
							},
							{
								id: 2,
								tabTitle: 'Мои заявки',
								content:
									response.data.applications!=null &&
									(
										response.data.applications.length>0?
										(
											response.data.applications.map((application) =>
												<ApplicationStudentCard key={application.id} 
												application={application}
												role = {response.data.role}
												student={application.student}
												/>
											)
										):(
											<p>У вас пока нет заявок</p>
										)
									
									)
							},
							{
								id: 3,
								tabTitle: 'Мои отклики',
								content:
									response.data.feedbacks!=null &&
									(
										response.data.feedbacks.length>0 ?
										(
											response.data.feedbacks.map((application) =>
											<NotificationCard 
												key={application.id}
												notification={application}
												role = {response.data.role}
											/>
											)
										):(
											<p>Вы еще не откликались на заявки</p>
										)
									)

							},
							{
								id: 4,
								tabTitle: 'Заявки на предметы',
								content:
									response.data.subjectApplications!=null &&
									(
										response.data.subjectApplications.length>0 ?
										(
											response.data.subjectApplications.map((application) =>
											<ApplicationSubjectCard 
												key={application.id}
												application={application}
												
											/>
											)
										):(
											<p>Пока нет заявок на предметы</p>
										)
									)

							}
						]
						
					)
					break;
				}
				case "ADMIN":{
					setTabs(
						[
							{
								id: 1,
								tabTitle: 'Мой профиль',
								content: <ProfileStudentCard user = {mockedUser}/>,
							},
							{
								id: 2,
								tabTitle: 'Заявки',
								content:
									response.data.applications!=null &&
									(
										response.data.applications.length>0?
										(
											response.data.applications.map((application) =>
												<ApplicationStudentCard key={application.id} 
												application={application} 
												student={application.student}
												role = {response.data.role}
												/>
											)
										):(
											<p>Нет заявок</p>
										)
									
									)
							},
							{
								id: 3,
								tabTitle: 'Отклики',
								content:
									response.data.feedbacks!=null &&
									(
										response.data.feedbacks.length>0 ?
										(
											response.data.feedbacks.map((application, i) =>
											<NotificationCard 
												key={i}
												notification={application}
												student={application.application.student}
												role = {response.data.role}
											/>
											)
										):(
											<p>Нет откликов</p>
										)
									)

							}
						]
						
					)

					setIsAdmin(true)
					break;
					
				}
			}
			
		})
		.catch(function (error) {
			
			navigate("/login"); 
		});
	}

	useEffect(()=>{  
		serchStudent() 
	}, [])

   

    const [currentTab, setCurrentTab] = useState('1');
	
    

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }


    return (
        <div className='profilecontainer'>
            <div className='tabs'>
                {
					tabs.length>0 && tabs.map((tab, i) =>
                    <button 
						key={i} 
						id={tab.id} 
						disabled={currentTab === `${tab.id}`} 
						onClick={(handleTabClick)}
						>
						{tab.tabTitle}
					</button>
					
                )}


				{
					isAdmin &&
					<>
					
						<Link
          					style={{textDecoration: 'none', color: 'rgb(27, 106, 106)', fontSize: '0.9rem'}}
           					 to={'/subjectedit'}
          				> 
						<button>Предметы</button>
        				</Link>

						<Link
          					style={{textDecoration: 'none', color: 'rgb(27, 106, 106)', fontSize: '0.9rem'}}
           					 to={'/purposeedit'}
          				> 
						<button>Цели</button>
        				</Link>
					</>
				}
            </div>
            <div className='content'>
                {tabs.map((tab, i) =>
                    <div key={i}>
                        {currentTab === `${tab.id}` && <div>{tab.content}</div>}
                    </div>
                )}
            </div>



        </div>
    );
}


/*

const tabs = [
	{
		id: 1,
		tabTitle: 'Мой профиль',
		title: 'Title 1',
		content: <ProfileStudentCard user = {mockedUser}/>,
		api_url:"1"
	},
	{
		id: 2,
		tabTitle: 'Мои заявки',
		title: 'Title 2',
		content: 
			<>
				{
				 mockedApplications.map((application) =>
				  <ApplicationStudentCard key={application.id} application={application}/>
				 )
			   }
			</>,
		api_url:"2"
	},
	{
		id: 3,
		tabTitle: 'Понравившиеся учителя',
		title: 'Title 3',
		content: 
			<>
			   {
				 mockedliked.map((teacher) =>
				 <LikedTeacherLiked key={teacher.id} teacher={teacher}/>
				 )
			   }
			</>,
		api_url:`http://localhost:8080/api/v1/registration/student/liked/${studentId}`
	},
   
	{
		id: 4,
		tabTitle: 'Уведомления',
		title: 'Title 5',
		content: 
			<>
				{
				 mockedNotif.map((notification) =>
					<NotificationCard 
						key={notification.id}
						notification={notification}
					/>
				 )
				   }
			</>,
		api_url:"4"
	},
	{
		id: 5,
		tabTitle: 'Аккаунты',
		title: 'Title 5',
		content: 
			<>
				{
				 users.map((user) =>
					<UserCard 
						key={user.id}
						user={user}
					/>
				 )
				   }
			</>,
		api_url:"5"
	}
];

*/