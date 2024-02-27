
import './Task.css';
const Task = (props) => {
    const {card, cardDel}=props;
    
    
    return(
        <>
         <li className= "task-item">
              {card.title} <i className='fa fa-times'
                                onClick={()=>cardDel(card)}></i>
            
            </li>
        
        </>
    )
}

export default Task;