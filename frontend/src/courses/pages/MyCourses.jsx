import './MyCourses.css';
import { AuthContext} from '../../context/AuthContext';
import CourseList from './CourseList';
import {useContext} from 'react';
import Card from "../../shared/UIElements/Card";

const MyCourses = (props) => {
    const auth = useContext(AuthContext);
    const storedApplications = JSON.parse(localStorage.getItem('applications')) || {};
    const userApplications = storedApplications[auth.userId] || [];
    const myCourses = props.courses.filter((course)=>userApplications.includes(course.id));

    if(myCourses.length===0){
        return(
            <Card>
                No Courses applied to yet! Apply to some!😊
            </Card>
        )
    }
    else{
        return (
            <CourseList courses={myCourses}/>
        )
    }
}

export default MyCourses