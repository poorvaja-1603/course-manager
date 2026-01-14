import './Button.css';
import {Link} from 'react-router-dom';

const Button = (props) => {
    if(props.to){
        return(
            <Link to={props.to}
            className={`${props.className} btn`}>{props.children}</Link>
        )
    }
    else{
        return(
            <button type={props.type || 'button'}
            className={`${props.className || ''} btn`}
            disabled={props.disabled}
            onClick={props.onClick}>{props.children}</button>
  )}
}

export default Button