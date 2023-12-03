import React , {useState,  useEffect, useRef} from 'react'
import { PurposeEditRow } from '../components/PurposeEditRow';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';



const PURPOSE_API_URL = "http://localhost:8080/api/v1/admin/purpose"



export const PurposeEditPage = () => {
    const tbodyRef = useRef(null);

    const [purposes, setPurposes] = useState([])
   
    const navigate = useNavigate();

    const serchPurposes = async () => { 
		const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
	
		};


		axios.get(PURPOSE_API_URL,{headers})
		.then(function (response) {
			
            setPurposes(response.data)
            //console.log(response.data)	
		})
		.catch(function (error) {
			navigate("/login"); 
		});
	}


    useEffect(()=>{  
		serchPurposes() 
	}, [])


    const handleDeleteClick = (id) => {
        const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
		};

      

        axios.delete( PURPOSE_API_URL+ "/" + id, {headers})
        .then(response => {
            // Handle success
            
            alert(response.data)
            setPurposes(purposes.filter(row => row.id !== id));

        }).catch(error => {
            // Handle error
            console.error(error.message);
            alert(error.message)
        });
       
        
    };

    const handleAddSubjClick = (body) => {

        const token =  localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        axios.post(PURPOSE_API_URL, body, {headers})
        .then(response => {
          // Handle success
            handleСancelСlick()
            serchPurposes()
            alert(response.data)

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
    
        const subjectEditRow = <PurposeEditRow  handleСancelСlick={handleСancelСlick} handleAddClick={handleAddSubjClick}/>; // Replace SubjectEditRow with your component name
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
            purposes.length > 0 ?
            ( 
                <table className='edittable' ref={tbodyRef}>
                    <tbody >

                        

                        {purposes.map((row) => (
                            <tr>
                                <PurposeEditRow key={row.id} purpose={row} handleDeleteClick={handleDeleteClick} />
                            </tr>
                         
                        ))}
                      
                    </tbody>
                </table>
               
               
              
            ):(<h3>no subjects found</h3>)
        }
       
       
      <button className='addbuttonSubj' onClick={handleAddClick}> + </button>

    </div>
  )
}
