
import './Column.css';
import Task from '../Task/Task';
const Column= () => {
    return(
        <>
        
        <div className="column">
        <header>brainstorm</header>
          <ul className="task-list">
            <Task/>
            
            <li className= "task-item">Third</li>
            <li className= "task-item">Fourth</li>
            <li className= "task-item">second</li>
            <li className= "task-item">Third</li>
            <li className= "task-item">Fourth</li>
            
          </ul>
          <footer>Add another card </footer>
        </div>
        
        </>
    )
}
export default Column;