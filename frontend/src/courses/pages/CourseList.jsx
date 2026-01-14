import './CourseList.css';
import Card from '../../shared/UIElements/Card';
import CourseItem from '../components/CourseItem';

const CourseList = (props) => {
    if(props.courses.length===0){
        return(
            <Card>
                <h2>No Courses yet!</h2>
            </Card>
        )
    }
    else{
  return ( 
  <ul className='course-list'>
    
    {props.courses.map((course)=><CourseItem id={course.id}
                                       key={course.id}
                                       text={course.text}
                                       onDelete={props.onDelete}
                                       onEdit={props.onEdit}/>)}
    
    </ul>
  )}
}

export default CourseList