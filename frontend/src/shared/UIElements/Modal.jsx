import './Modal.css';
import Card from './Card';

const Modal = (props) => {
    if(!props.show) return null;
  return (
    <div className='backdrop' onClick={props.onCancel}>
        <Card onClick={(e)=>e.stopPropagation()}>
            {props.header && <header className='modal-header'>{props.header}</header>}
            {props.content && <div className='modal-contents'>{props.content}</div>}
            {props.footer && <footer className='modal-actions'>{props.footer}</footer>}
        </Card>
    </div>
  )
}

export default Modal