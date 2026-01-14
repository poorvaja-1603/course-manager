import './Authenticate.css';
import { AuthContext} from '../context/AuthContext';
import {useContext} from 'react';
import {useState} from 'react';
import Card from '../shared/UIElements/Card';
import Button from '../shared/UIElements/Button';

const Authenticate = () => {

    const auth=useContext(AuthContext);
    const[isLoginMode, setIsLoginMode]=useState(true);
    const[username, setUsername]=useState('');
    const[password, setPassword]=useState('');
    const[role, setRole]=useState('admin');

    const submitHandler=(e)=>{
        e.preventDefault();
        if(username.trim()==='' || password.trim()===''){
            return;
        }
        else if(isLoginMode){
            auth.login(role);
        }
        else{
            console.log('Signing up: ',{username, password, role})
            auth.login(role);
        }
    }
  return (
    <Card>
        <div className='auth-header'>
        <h2>{isLoginMode ? 'Login' : 'Sign-up'}</h2>
        </div>
        <form className='auth-form' onSubmit={submitHandler}>
            <label>Username: </label>
            <input type='text'
            value={username}
            placeholder='Username: '
            onChange={(e)=>setUsername(e.target.value)}></input>
            <label>Password: </label>
            <input type='password'
            value={password}
            placeholder='Password: '
            onChange={(e)=>setPassword(e.target.value)}></input>
            <label>Select your Role: </label>
            <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}>
            <option value='admin'>Admin</option>   
            <option value='student'>Student</option> 
            </select>  
            <Button className='authen' type='submit'>{isLoginMode ? 'Login' : 'Create Account'}</Button>     
        </form>
        <p className='switch-auth'>
            {isLoginMode ? 'New User?' : 'Already have an account?' }
            <Button className='switch-authen'
            onClick={()=>setIsLoginMode(prev=>!prev)}>{isLoginMode ? 'Sign-up' : 'Login'}</Button>
        </p>
    </Card>
  )
}

export default Authenticate