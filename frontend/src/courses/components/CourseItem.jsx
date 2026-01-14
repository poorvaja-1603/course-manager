import './CourseItem.css';
import React from 'react';
import Card from '../../shared/UIElements/Card';
import Button from '../../shared/UIElements/Button';
import {useContext,useState} from 'react';
import { AuthContext} from '../../context/AuthContext';
import Modal from '../../shared/UIElements/Modal';

const CourseItem = (props) => {
    const auth=useContext(AuthContext);
    const[showEdit, setShowEdit]=useState(false);
    const[showDelete, setShowDelete]=useState(false);
    const[editText, setEditText]= useState(props.text);

    const confirmDeleteHandler=()=>{
      props.onDelete(props.id);
      setShowDelete(false);
    }

    const confirmEditHandler=()=>{
      props.onEdit(props.id, editText);
      setShowEdit(false);
    }

    const applyHandler=()=>{
      const storedApplications = JSON.parse(localStorage.getItem('applications')) || {};
      const userApplications = storedApplications[auth.userId] || [];
      if(!userApplications.includes(props.id)){
        storedApplications[auth.userId] = [...userApplications, props.id];
      }

      localStorage.setItem('applications', JSON.stringify(storedApplications));
    }

  return (
    
    <Card>
    <li className='course-item'>
        <h2>{props.text}</h2>
        <div className='buttons'>
            {auth.role==='admin' && auth.isLoggedIn &&
            <React.Fragment>
            <Button className='edit-btn'
            onClick={()=>setShowEdit(true)}>Edit</Button>
            <Button className='delete-btn'
            onClick={()=>setShowDelete(true)}>Delete</Button></React.Fragment>}
            {auth.isLoggedIn && auth.role==='student' &&
            <Button onClick={applyHandler}>Apply</Button>}
        </div>
    </li>

    <Modal show={showEdit}
    header="Edit Course Name"
    content={
      <input 
      value={editText} 
      onChange={(e) => setEditText(e.target.value)} 
      />
    }
    footer={
    <>
      <Button onClick={() => setShowEdit(false)}>Cancel</Button>
      <Button className='edit-btn' onClick={confirmEditHandler}>Save</Button>
    </>
    }
    onCancel={() => setShowEdit(false)}
  />

    <Modal show={showDelete} 
    header="Are you sure?"
    footer={
      <>
        <Button onClick={()=>setShowDelete(false)}>Cancel</Button>
        <Button className='delete-btn' onClick={confirmDeleteHandler}>Delete</Button>
      </>
    }
    onCancel={()=>setShowDelete(false)
      
    }/>
    </Card>
  )
}

export default CourseItem