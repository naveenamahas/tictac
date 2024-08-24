//import React from 'react'
import { useState } from "react"

 export default function Player({initialName,symbol, isActive,onChangeName}) 
 {
  const[playerName,setplayerName]= useState(initialName);
  const [Isedit,Setisedit]=useState(false);

 function handleEdit(){
  Setisedit((editing)=>!editing)

  if(Isedit){
    console.log(Isedit);
  onChangeName(symbol,playerName); 
 }
}
  function handleChange(event){
    setplayerName(event.target.value)

  }

 let editableplayerName = <span className="player-name" >{playerName}</span>;
 if(Isedit)
  {
  editableplayerName = <input type="text" required  Value={playerName} onChange={handleChange}/>;

 }


  return (
    
        <li className={isActive ? 'active': undefined}>
          <span className="player">
           {editableplayerName}
           <span className="player-symbol">{symbol}</span>
           </span>
          <button onClick ={handleEdit}>{Isedit ? 'save':'edit'}</button>
          
        </li>
       
        

    
  );
}


