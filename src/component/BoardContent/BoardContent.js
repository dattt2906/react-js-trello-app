import './BoardContent.css';
import Column from '../Column/Column';
import { InitData } from '../../Actions/InitData';
import { useState, useEffect, useRef } from 'react';
import _, { cloneDeep } from 'lodash';
import { mapOrder } from '../../Utilities/sort';  
import { v4 as uuidv4 } from 'uuid';  


 const BoardContent= () =>  {
  const [board, setBoard]= useState({});
  const [columns,setColumns]= useState([]);
  const [isAddList, setIsAddList]= useState(false);
  const inputRef= useRef(null);
  const [valueInput, setValueInput]= useState("");
  const isBoardDataExits= localStorage.getItem("Board");
  const [draggedItem,setDraggedItem]= useState(null);
  

  


//neu tren localStorage chua co du lieu duoc luu tru thi moi loc bang va luu len localStograge
  if(!isBoardDataExits){
  const boardInitData = InitData.boards.find(item => item.id === "board-1");
 
  localStorage.setItem("Board", JSON.stringify(boardInitData));
  }


  useEffect(()=>{
    if(isAddList=== true && inputRef && inputRef.current){
      inputRef.current.focus();
    }

  },[isAddList]);


  useEffect(() =>{
   
    
    let data=JSON.parse(localStorage.getItem("Board"));
   
    if(data){
      setBoard(data);
        console.log(data);
      //sort column
      /*boardInitData.columns.sort((a,b)=>
      boardInitData.columnOrder.indexOf(a.id) - boardInitData.columnOrder.indexOf(b.id)
      ) */
      setColumns(data.columns) // doan nay thay cho doan sort o tren do da dinh nghia o trong sort.js

    }

  },[]);


  const handleAddList= ()=>{

    setIsAddList(false);
    // if(!valueInput){
    //   if(inputRef && inputRef.current)
    //   inputRef.current.focus();
    //     return ;
      
    // }

    const _column=_.cloneDeep(columns);
    _column.push({
      id: uuidv4(),
      boardId:board.id,
      title:valueInput,
      cardOrder:[],
      cards:[]
    });
    // console.log(data);
    let data=JSON.parse(localStorage.getItem("Board"));
    data.columns=[..._column];
    localStorage.setItem("Board",JSON.stringify(data));

    setColumns(_column);
    setValueInput("");


  }

  const columnDel=(column)=>{
      let newColumns=[...columns];
      const index=newColumns.findIndex(item=>item.id===column.id);
      newColumns.splice(index,1);
      let data=JSON.parse(localStorage.getItem("Board"));
    data.columns=[...newColumns];
    localStorage.setItem("Board",JSON.stringify(data));
      setColumns(newColumns);

  }


 
  
if(_.isEmpty(board)){
  return(
    <>
    <div className='not-found'>Board not found</div>
    </>
  )
}


const onDragStart = (e, index)=>{

  
 setDraggedItem(columns[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
    e.dataTransfer.setDragImage(e.target,20,20);
};
 
 const onDragOver=index =>{
  
  
    const draggedOverItem=columns[index];
    if(draggedItem===draggedOverItem){
      return ;
    }

    let items=columns.filter(item=>item!==draggedItem);

    items.splice(index,0,draggedItem);
    let data=JSON.parse(localStorage.getItem("Board"));
    data.columns=[...items];
    localStorage.setItem("Board",JSON.stringify(data));

    setColumns(items);



 };
 const onDragEnd=()=>{
  console.log("Keo tha da ket thuc");

 }
//  const onDragEnd = () => {
//   this.draggedIdx = null;
// };

return(
    <>
    <div className="board-columns">
      {columns && columns.length > 0 && columns.map((column,index)=>{ /*voi moi phan tu column va index cua no ta se tra ve 1 ptu <Colum> va Prop cua no */
        return(
          <div 
          draggable
         onDragOver={()=>onDragOver(index)} // index truyen vao o day khong lien quan gi den index duoc tao trong than ham onDragOver 
                                                        //ma tham so index o day chi co tac dung nhan ra phan tu khi ham OnDragStart(index) keo qua 
         onDragStart={e=> onDragStart(e, index)} //nhan vao index de biet tri so cua phan tu dang duoc keo
         onDragEnd={onDragEnd}
                >        
          <Column
          key={column.id}
          column={column}
          columnDel={()=> columnDel(column)} //truyen vao 1 ham xu ly du lieu co tham so duoi dang thuoc tinh cua column
          />
          </div>
        )

      }
      
      
      )}

      
      {isAddList===false ?
      <div className='Add-new-column' onClick={() => setIsAddList(true)}><i className='fa fa-plus icon'></i>Add new column
      
      </div>
      :
      <div className='content-add'>
        <div className='text-area'>
          <input type='text' 
          ref={inputRef}
          value={valueInput}
          onChange={(event)=> setValueInput(event.target.value)}></input>
          </div>
          <div className='btn-cancel'>
              <button className='btn btn-success' onClick={()=> handleAddList()}>Add list</button>
              <i className='fa fa-times' onClick={() =>setIsAddList(false)}></i>
          </div>
          

      </div>
}

      </div>
      
  
    </>
)

}
export default BoardContent;