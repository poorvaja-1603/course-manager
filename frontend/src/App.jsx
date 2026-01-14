import { useState } from 'react'
import Header from './shared/UIElements/Header';
import CourseList from './courses/pages/CourseList'
import {Route,Navigate, Routes} from 'react-router-dom';
import './App.css'
import AddCourses from './courses/pages/AddCourses';
import { AuthContext } from './context/AuthContext';
import {useContext, useEffect} from 'react';
import Authenticate from './Auth/Authenticate';
import MyCourses from './courses/pages/MyCourses';

const App=()=> {
  const[courses, setCourses] = useState(()=>{
    const savedCourses = JSON.parse(localStorage.getItem('courses'));
    return savedCourses ? savedCourses : [];
  });
  const auth=useContext(AuthContext);
  console.log("Current auth:", auth);
  const addCourseHandler=(newText)=>{
    setCourses((prevCourses)=>{
      return [{
          id: Date.now(),
          text: newText
      }, ...prevCourses]
    })
  }

  const deleteCourseHandler=(courseId)=>{
    setCourses((prevCourses)=>prevCourses.filter((course)=>course.id!==courseId))
  }

  const editCourseHandler=(editId, editText)=>{
    setCourses((prevCourses)=>prevCourses.map((course)=>course.id===editId ? {...course, text:editText} : course))
  }

  useEffect(()=>{
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses])
  return (
      <div>
        <Header />
        <Routes>
        <Route path="/courses" element={<CourseList courses={courses}
                                        onDelete={deleteCourseHandler}
                                        onEdit={editCourseHandler}/>}/>

        <Route path="/auth" element={!auth.isLoggedIn ? <Authenticate />
                                    : <Navigate to="/courses" />}/>

        <Route path="/courses/add" element={auth.isLoggedIn && auth.role === 'admin'
              ? <AddCourses onAdd={addCourseHandler} />: <Navigate to="/auth" />}/>

        <Route path="/courses/my" element={auth.isLoggedIn && auth.role==='student'
            ? <MyCourses courses={courses} /> : <Navigate to='/auth' />}/>

        <Route path="*" element={<Navigate to="/courses" />} />
      </Routes>
      </div>
    
  )
}

export default App
