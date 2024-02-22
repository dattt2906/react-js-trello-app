import './BoardContent.css';
import Column from '../Column/Column';
import { InitData } from '../Actions/InitData';
const BoardContent= () =>  {
return(
    <>
    <div className="board-columns">
    <Column/>
    <Column/>
    <Column/>
    <Column/>
    <Column/>
    <Column/>
    <Column/>
    <Column/>
    
        
      </div>
    </>
)

}
export default BoardContent;