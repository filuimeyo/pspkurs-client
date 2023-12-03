import React , {useState,  useEffect, useRef} from 'react'
import { SubjectEditRow } from '../components/SubjectEditRow';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';



const SUBJECT_API_URL = "http://localhost:8080/api/v1/admin/subjects"

const SUBJECT_DELETE_API_URL  = "http://localhost:8080/api/v1/admin/subject/"

const ADD_API_URL = "http://localhost:8080/api/v1/admin/subject"

export const SubjectEditPage = () => {

    const tbodyRef = useRef(null);

    const [subjects, setSubjects] = useState([])
    
    const navigate = useNavigate();

    const serchSubjects = async () => { 
		const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
	
		};


		axios.get(SUBJECT_API_URL,{headers})
		.then(function (response) {
			
            setSubjects(response.data)
            //console.log(response.data)	
		})
		.catch(function (error) {
			navigate("/login"); 
		});
	}


    useEffect(()=>{  
		serchSubjects() 
	}, [])


    const handleDeleteClick = (id) => {
        const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
	
		};

        axios.delete(`${SUBJECT_DELETE_API_URL}${id}`, {headers})
        .then(response => {
            // Handle success
            
            alert(response.data.message)
            setSubjects(subjects.filter(row => row.id !== id));

        }).catch(error => {
            // Handle error
            console.error(error.message);
            alert(error.message)
        });
       
        
    };

    const handleAddSubjClick = (formData) => {

        const token =  localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        };

        axios.post(ADD_API_URL, formData, {headers})
        .then(response => {
          // Handle success
            handleСancelСlick()
            serchSubjects()
            alert(response.data.message)

        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    }

    const handleСancelСlick = () =>{
        const tbody = tbodyRef.current;

        if (tbody.lastChild.nodeName === 'TR') {
          tbody.removeChild(tbody.lastChild);
        }
    }


    const handleAddClick = () => {


        const newRow = document.createElement('tr');
        tbodyRef.current.appendChild(newRow);
    
        const subjectEditRow = <SubjectEditRow  handleСancelСlick={handleСancelСlick} handleAddClick={handleAddSubjClick}/>; // Replace SubjectEditRow with your component name
        ReactDOM.render(subjectEditRow, newRow);


        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }
 
  return (

    <div>
        <Link
          	style={{textDecoration: 'none', color: 'rgb(27, 106, 106)', fontSize: '0.9rem'}}
           		to={'/profilestudent'}
          	> 
		    Назад
        </Link>

        {
            subjects.length > 0 ?
            ( 
                <table className='edittable' ref={tbodyRef}>
                    <tbody >

                        

                        {subjects.map((row) => (
                            <tr>
                                <SubjectEditRow key={row.id} subject={row} handleDeleteClick={handleDeleteClick} />
                            </tr>
                         
                        ))}
                      
                    </tbody>
                </table>
               
               
              
            ):(<h3>no subjects found</h3>)
        }
       
       
      <button className='addbuttonSubj' onClick={handleAddClick}> + </button>

    </div>
    
  );

}
