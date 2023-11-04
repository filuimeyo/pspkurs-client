import React from 'react'
import {useEffect, useState} from "react";
import { LikedTeacherLiked } from '../components/LikedTeacherLiked';


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

export const StudentProfilePage = () => {

    const studentId = 1;

   

    const [currentTab, setCurrentTab] = useState('1');
    const tabs = [
        {
            id: 1,
            tabTitle: 'Мой профиль',
            title: 'Title 1',
            content: 'Las tabs se generan automáticamente a partir de un array de objetos, el cual tiene las propiedades: id, tabTitle, title y content.',
            api_url:"1"
        },
        {
            id: 2,
            tabTitle: 'Мои заявки',
            title: 'Title 2',
            content: 'Contenido de tab 2.',
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
                     <LikedTeacherLiked teacher={teacher}/>
                     )
                   }
                </>,
            api_url:`http://localhost:8080/api/v1/registration/student/liked/${studentId}`
        },
       
        {
            id: 4,
            tabTitle: 'Уведомления',
            title: 'Title 5',
            content: 'Contenido de tab 5.',
            api_url:"4"
        }
    ];

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }


    return (
        <div className='profilecontainer'>
            <div className='tabs'>
                {tabs.map((tab, i) =>
                    <button key={i} id={tab.id} disabled={currentTab === `${tab.id}`} onClick={(handleTabClick)}>{tab.tabTitle}</button>
                )}
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
