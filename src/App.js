import React,{ useEffect, useState } from 'react';
import './App.css';
import {MdDelete} from 'react-icons/md';
import {MdCheck} from 'react-icons/md';
import swal from 'sweetalert';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState([]);
   
  const AddTodo=()=>{
    if(newTitle==="" && newDescription==="")
    {
      swal({
        text: "Fields are EMPTY!",
        buttons: {
          cancel: "Close",
        },
        
      })
      return;
    }
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    }

    let updatedTodo = [...allTodos];
    updatedTodo.push(newTodoItem);
    setTodos(updatedTodo);
    localStorage.setItem('todolist',JSON.stringify(updatedTodo));
  };

  const deleteTodo = (index)=>{
    let leftTodo = [...allTodos];
    leftTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(leftTodo));
    setTodos(leftTodo);
  };

  const completedTodo = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '/' + mm + '/' + yy + ' at ' + h + ':' + m + ':' + s;
    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompleted = [...completedTodos];
    updatedCompleted.push(filteredItem);
    setCompletedTodos(updatedCompleted);
    deleteTodo(index);
    localStorage.setItem('completed', JSON.stringify(updatedCompleted));
  }

  const deleteCompletedTodo = (index)=>{
    let leftTodo = [...completedTodos];
    leftTodo.splice(index,1);
    localStorage.setItem('completedTodo',JSON.stringify(leftTodo));
    setCompletedTodos(leftTodo);
  };

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let saveCompleted = JSON.parse(localStorage.getItem('completedTodo'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(saveCompleted){
      setTodos(saveCompleted);
    }
  },[]);
  
  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Task's title"/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Task's description"/>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={AddTodo} className='primaryBtn'>ADD</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen===false && `active`}`} onClick={()=>setIsCompleteScreen(false)}>Tasks</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && `active`}`} onClick={()=>setIsCompleteScreen(true)}>Completed Tasks</button>
        </div>
        <div className='todo-list'>
          {isCompleteScreen===false && allTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className='icons'>
                <MdDelete className='icon' onClick={()=>deleteTodo(index)}/>
                <MdCheck className='check-icon' onClick={()=>completedTodo(index)}/>
              </div>
          </div>
            );
          })}

          {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on : {item.completedOn}</small></p>
                </div>
                <div className='icons'>
                  <MdDelete className='icon' onClick={()=>deleteCompletedTodo(index)}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
