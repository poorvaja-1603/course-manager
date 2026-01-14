import './AddCourses.css';
import Button from '../../shared/UIElements/Button';
import Card from '../../shared/UIElements/Card';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';

const AddCourses = (props) => {
    const[enteredCourse, setEnteredCourse]=useState('');
    const navigate = useNavigate();
    const submitHandler=(e)=>{
        e.preventDefault()
        if(enteredCourse.trim()==='') return
        else{
            props.onAdd(enteredCourse);
            setEnteredCourse('');
            navigate('/courses');
        }
    }
  return (
    <Card>
    <form onSubmit={submitHandler}>
        <label>Enter Course Name: </label>
        <input placeholder='Course Name: '
        onChange={(e)=>setEnteredCourse(e.target.value)}
        value={enteredCourse}></input>
        <Button className='add-btn' type='submit'>Add</Button>
    </form>
    </Card>
  )
}

export default AddCourses