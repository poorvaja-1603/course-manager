import './Header.css';
import Button from './Button';
import {useContext} from 'react';
import { AuthContext} from '../../context/AuthContext';

const Header = () => {
    const auth=useContext(AuthContext);
  return (
    <div className='header-contents'>
        <h1 className='app-name'>CourseHub</h1>
        <div className='buttons'>
        <ul>
            <li>
                <Button to='/courses' className='btn'>Courses</Button>
            </li>
            {!auth.isLoggedIn &&
                <li>
                    <Button to='/auth' className='btn'>Login</Button>
                </li>}
            {auth.isLoggedIn && auth.role==='admin' &&
                <li>
                    <Button to='/courses/add' className='btn'>Add Course</Button>
                </li>
            }
            {auth.isLoggedIn && auth.role==='student' &&
                <li>
                    <Button to='/courses/my' className='btn'>My Courses</Button>
                </li>
            }
            {auth.isLoggedIn && 
                <li>
                <Button className='btn'
                        onClick={auth.logout}>Logout</Button>
                </li>}
            
        </ul>
        </div>
    </div>
  )
}

export default Header