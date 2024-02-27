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


  useEffect(()=>{
    if(isAddList=== true && inputRef && inputRef.current){
      inputRef.current.focus();
    }

  },[isAddList])


  useEffect(() =>{
    const boardInitData= InitData.boards.find(item=> item.id==="board-1");
    if(boardInitData){
      setBoard(boardInitData);

      //sort column
      /*boardInitData.columns.sort((a,b)=>
      boardInitData.columnOrder.indexOf(a.id) - boardInitData.columnOrder.indexOf(b.id)
      ) */
      setColumns(boardInitData.columns) // doan nay thay cho doan sort o tren do da dinh nghia o trong sort.js

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
    // localStorage.setItem("Column", JSON.stringify(_column));
    // let data=JSON.parse(localStorage.getItem(Column));
    // console.log(data);

    setColumns(_column);
    setValueInput("");


  }

  const columnDel=(column)=>{
      let newColumns=[...columns];
      const index=newColumns.findIndex(item=>item.id===column.id);
      newColumns.splice(index,1);
      setColumns(newColumns);

  }

<input type="file"></input>
 
  
if(_.isEmpty(board)){
  return(
    <>
    <div className='not-found'>Board not found</div>
    </>
  )
}

return(
    <>
    <div className="board-columns">
      {columns && columns.length > 0 && columns.map((column,index)=>{ /*voi moi phan tu column va index cua no ta se tra ve 1 ptu <Colum> va Prop cua no */
        return(
          <Column
          key={column.id}
          column={column}
          columnDel={()=> columnDel(column)} //truyen vao 1 ham xu ly du lieu co tham so duoi dang thuoc tinh cua column
          
          />
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