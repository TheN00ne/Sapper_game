import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import style1 from "./styles/style1.module.css";

const app = document.getElementById("app");

function App(){

  let [field, setField] = useState([]);
  let [end, setEnd] = useState(false);
  let [id, setId] = useState(0);

  useEffect(() => {
    for(let i = 0; i < 21; i++){
      let  row = [];

      let b1 = Math.round(Math.random() * 20);
      let b2;
      let b3;
      
      function bombs2(){
        let place2 = Math.round(Math.random() * 20);
        if(place2 !== b1){
          b2 = place2;
        }
        else{
          bombs2();
        }
      }
    
      function bombs3(){  
        let place3 = Math.round(Math.random() * 20);
        if((place3 !== b1) && (place3 !== b2)){
          b3 = place3;
        }
        else{
          bombs3();
        }
      }

      bombs2();
      bombs3();

      console.log(b1,b2,b3)

      for(let j = 0; j < 21; j++){
        let isB;
        if((j == b1) || (j == b2) || (j == b3)){
          isB = true;
        }
        else{
          isB = false;
        }
        row.push({id:id, rowId:j, isBomb:isB, value:null});
        setId(id++);
      }
      field.push(row);
    }
    setEnd(true);
  }, [])

  useEffect(() => {
    if(end){
      let newArr = field.map((row, idR) => {
        let newRow = row.map((cell, idC) => {
          let val;
  
          if(cell.isBomb){
            val = null;
          }
          else{
            val = 0;
  
            let prevRow = idR-1;
            let nextRow = idR+1;
            
            let prevCell = idC-1;
            let nextCell = idC+1;
  
            if(prevRow < 0){
              prevRow = idR;
            }
            if(nextRow > 0){
              nextRow = idR;
            }
            if(prevCell < 0){
              prevCell = idC;
            }
            if(nextCell > 0){
              nextCell = idC;
            }
  
            if(field[prevRow][prevCell].isBomb){
              val = val + 1;
            }
            if(field[prevRow][cell.rowId].isBomb){
              val = val + 1;
            }
            if(field[prevRow][nextRow].isBomb){
              val = val + 1;
            }
            if(field[cell.rowId][prevCell].isBomb){
              val = val + 1;
            }
            if(field[cell.rowId][nextCell].isBomb){
              val = val + 1;
            }
            if(field[nextRow][prevCell].isBomb){
              val = val + 1;
            }
            if(field[nextRow][cell.rowId].isBomb){
              val = val + 1;
            }
            if(field[nextRow][nextCell].isBomb){
              val = val + 1;
            }
          }
          return {id:cell.id, rowId:cell.rowId, isBomb:cell.isBomb, value:val}
        })
        return newRow;
      })
      setField(newArr);
      console.log(newArr)
    }
  }, [end])

  return(
    <div>
      <h1>Sapper game</h1>
      <div className={style1.outside}>
        <div className={style1.field}>
          {field.map((row) => {
            return(
              row.map((cell) => (
                <div className={style1.cell} key={cell.id}>{cell.value}</div>
              ))
            )
          })}
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, app);