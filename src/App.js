import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import {MainPage} from "./pages/MainPage"
import {TeachersPage} from "./pages/TeachersPage"
import {TeacherPage} from "./pages/TeacherPage"
import {LoginPage} from "./pages/LoginPage"
import {RegisterPage} from "./pages/RegisterPage"
import { SubjectsPage } from "./pages/SubjectsPage";
import { StudentProfilePage } from "./pages/StudentProfilePage";
import { SubjectApplyPage } from "./pages/SubjectApplyPage";


import './App.css';


/*
import {useEffect, useState} from "react";

import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg';


const API_URL = 'http://www.omdbapi.com/?apikey=ff749f87'*/


const App = () =>{

    return(
        <Layout>
            <Routes>
                <Route path='/' element={<MainPage/>}></Route>
                <Route path='subjects' element={<SubjectsPage/>}></Route>
                <Route path='teachers' element={<TeachersPage/>}></Route>
                <Route path='teacher' element={<TeacherPage/>}></Route>
                <Route path='register' element={<RegisterPage/>}></Route>
                <Route path='login' element={<LoginPage/>}></Route>
                <Route path='profilestudent' element={<StudentProfilePage/>}></Route>
                <Route path='subjectapply' element={<SubjectApplyPage/>}></Route>

            </Routes>
        </Layout>

    )

    //
    //const [movies, setMovies] = useState([]);
//
    //const [searchTerm, setSeachTerm] = useState('');
//
    //const searcMovies = async (title) => {
    //    const responce = await fetch(`${API_URL}&s=${title}`);
    //    const data = await responce.json();
//
    //    setMovies(data.Search);
    //}
//
    //useEffect(()=>{
    //    searcMovies('Spiderman')
    //}, [])
//
//
    //return(
    //    <div className="app">
    //        <h1>Moovies</h1>
//
    //        <div className="search">
    //            <input 
    //                placeholder="Search for moovies"
    //                value={searchTerm}
    //                onChange={(e) => setSeachTerm(e.target.value)}
    //            />
    //            <img 
    //                src={SearchIcon}
    //                alt="search"
    //                onClick={() => searcMovies(searchTerm)}
    //            />
    //        </div>
//
    //        {
    //            movies?.length > 0
    //            ? (
    //                <div className="container">
    //                    {
    //                        movies.map((movie) => (
    //                        <MovieCard movie={movie}/>
    //                        ))
    //                    }
    //                </div>
    //            ):
    //            (
    //                <div className="empty">
    //                    <h2>No movies found</h2>
    //                </div>
    //            ) 
    //        }
//
    //        
//
    //    </div>
    //); 
}

export default App;