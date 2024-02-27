
import './Column.css';
import Task from '../Task/Task';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _, { cloneDeep, flatMap } from 'lodash';
import  Form  from 'react-bootstrap/Form';
 
const Column= (props) => {
  const {column,columnDel} = props;
  const cards= column.cards;
 
  const [Cards, setCard]= useState(cards);
  const [valueTextArea, setValueTextArea]=useState("");
  const textAreaRef= useRef(null);
  const [isAddCard, setIsAddCard] = useState(false);


  const handleAddCard = ()=>{
        //validate
        if(!valueTextArea){
          textAreaRef.current.focus();
          return; 
        }

        const addcard =_.cloneDeep(Cards);
        addcard.push({
          id:uuidv4(),
          boardId:column.boardId,
          columnId:column.id,
          title:valueTextArea,
          image:null


        });
        setCard(addcard);
        console.log(addcard);
        setValueTextArea("");
        setIsAddCard(false);
        



  }

  //Khi cac gia tri cua column thay doi thi column.title duoc gan cho changTitle
  const[changeTitle,setChangeTitle]= useState(column.title);
  useEffect(()=>{
    if(changeTitle){
        column.title=changeTitle;

    }



  },[changeTitle])

  
  const cardDel=(card)=>{
    let newCard=[...Cards];
    const index = newCard.findIndex(item=>item.id===card.id);
    newCard.splice(index,1);
    setCard(newCard);

  }
    return(
        <> 
        <div className="column">
        <header>
        <input className='title-change' type='text'
        value={changeTitle}
        onChange={(event)=>setChangeTitle(event.target.value)}
        
        ></input>
        <i className='fa fa-times icon-delete'
        onClick={()=>columnDel(column)}
        
        ></i>
        </header>
          <ul className="task-list">
            {Cards && Cards.length > 0 && Cards.map((card, index) =>{
              return(
                <Task
                key={card.id}
                card={card}
                cardDel={()=> cardDel(card)}

                />
              )

            })

            }
                        
            
          </ul>
          {!isAddCard ? 
          <footer onClick={()=>setIsAddCard(true)}><i className='fa fa-plus icon'></i>Add another card </footer>
              :
          <div className='content-add-card'>
            <div className='text-area-card'>
              <textarea className='content-text'
              placeholder='Enter the content'
              ref={textAreaRef}
              value={valueTextArea}
              onChange={(event)=> setValueTextArea(event.target.value)}
              ></textarea>
              </div>
              <div className='btn-add-cancel'>
              <button className='btn btn-success' onClick={()=>handleAddCard()}>Add card</button>
              <i className='fa fa-times' onClick={()=>setIsAddCard(false)}></i>

              </div>


          </div>
}
        </div>
        
        </>
    )
}
export default Column;