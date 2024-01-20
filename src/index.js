import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import style1 from "./styles/style1.module.css";

const app = document.getElementById("app");

function App(){

  let [field, setField] = useState([]);
  let [end, setEnd] = useState(false);
  let [id, setId] = useState(0);
  let [isFirst, setIsFirst] = useState(true);
  let [time, setTime] = useState(0);
  let [demined, setDemined] = useState(0);
  let [step, setStep] = useState(0);

  function color(cell){
    switch(cell.value){
      case 0:
        return {
          color:"#979494",
        }
      break;
      case 1:
        return {
          color:"#5e5e92",
        }
      break;
      case 2:
        return {
          color:"#170c7c",
        }
      break;
      case 3:
        return {
          color:"#1a6414",
        }
      break;
      case 4:
        return {
          color:"#7f7f15",
        }
      break;
      case 5:
        return {
          color:"#d28c16",
        }
      break;
      case 6:
        return {
          color:"#c11414",
        }
      break;
      case 7:
        return {
          color:"#762277",
        }
      break;
      case 8:
        return {
          color:"black",
        }
      break;
    }
  }

  useEffect(() => {
    setInterval(() => {
      setTime(++time);
  }, 1000)
  }, [])

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

      for(let j = 0; j < 21; j++){
        let isB;
        if((j == b1) || (j == b2) || (j == b3)){
          isB = true;
        }
        else{
          isB = false;
        }
        row.push({id:id, rowId:j, isBomb:isB, row:i, value:null, isOpen:false});
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
  
            if((prevRow >= 0) && (prevCell >= 0)){
              if(field[prevRow][prevCell].isBomb){
                val++;  
              }
            }

            if(prevRow >= 0){
              if(field[prevRow][idC].isBomb){
                val++;
              }
            }

            if((prevRow >= 0) && (nextCell <= row.length-1)){
              if(field[prevRow][nextCell].isBomb){
                val++;
              }
            }

            if(prevCell >= 0){
              if(field[idR][prevCell].isBomb){
                val++;
              }
            }

            if(nextCell <= row.length-1){
              if(field[idR][nextCell].isBomb){
                val++;
              }
            }

            if((nextRow <= field.length-1) && (prevCell >= 0)){
              if(field[nextRow][prevCell].isBomb){
                val++;
              } 
            }

            if(nextRow <= field.length-1){
              if(field[nextRow][idC].isBomb){
                val++;
              } 
            }

            if((nextRow <= field.length-1) && (nextCell <= row.length-1)){
              if(field[nextRow][nextCell].isBomb){
                val++;
              }
            }
          }
          return {id:cell.id, rowId:cell.rowId, isBomb:cell.isBomb, row:idR, value:val, isOpen:false}
        })
        return newRow;
      })
      setField(newArr);
    }
  }, [end])

  function open(cell){
    let newArr = field.map((row, idR) => {
      let newRow = row.map((el) => {
        if(el.id == cell.id){
          return {id:cell.id, rowId:cell.rowId, row:idR, isBomb:cell.isBomb, value:cell.value, isOpen:true}
        }
        else{
          return el;
        }
      })
      return newRow; 
    })
    setField(newArr);
    setStep(++step);
  }

  function poly(cell){
    if(isFirst){
      let newArr = field.map((row) => {
        let newRow = row.map((el) => {
          if(
            ((el.rowId == cell.rowId-1) && (el.row == cell.row - 1)) ||
            ((el.rowId == cell.rowId) && (el.row == cell.row - 1)) ||
            ((el.rowId == cell.rowId+1) && (el.row == cell.row - 1)) || 
            ((el.rowId == cell.rowId-1) && (el.row == cell.row)) || 
            ((el.rowId == cell.rowId) && (el.row == cell.row)) || 
            ((el.rowId == cell.rowId+1) && (el.row == cell.row)) || 
            ((el.rowId == cell.rowId-1) && (el.row == cell.row + 1)) || 
            ((el.rowId == cell.rowId) && (el.row == cell.row + 1)) || 
            ((el.rowId == cell.rowId+1) && (el.row == cell.row + 1)) ||
            ((el.rowId == cell.rowId-1) && (el.row == cell.row - 2)) ||
            ((el.rowId == cell.rowId) && (el.row == cell.row - 2)) ||
            ((el.rowId == cell.rowId+1) && (el.row == cell.row - 2)) || 
            ((el.rowId == cell.rowId-2) && (el.row == cell.row -1)) || 
            ((el.rowId == cell.rowId+2) && (el.row == cell.row - 1)) || 
            ((el.rowId == cell.rowId-2) && (el.row == cell.row)) ||
            ((el.rowId == cell.rowId+2) && (el.row == cell.row)) ||
            ((el.rowId == cell.rowId-2) && (el.row == cell.row + 1)) ||
            ((el.rowId == cell.rowId+2) && (el.row == cell.row + 1)) ||
            ((el.rowId == cell.rowId-1) && (el.row == cell.row + 2)) ||
            ((el.rowId == cell.rowId) && (el.row == cell.row + 2)) || 
            ((el.rowId == cell.rowId+1) && (el.row == cell.row + 2))
            ){
            if(el.isBomb == false){
              return {id:el.id, rowId:el.rowId, isBomb:el.isBomb, row:el.row, value:el.value, isOpen:true}
            }
            else{
              return el;
            }
          }
          else{
            return el;
          }
        })
        return newRow; 
      })
      setField(newArr);
    }
    setIsFirst(false);
    setStep(++step);
  }

  function many() {
    let newField = [...field];
  
    field.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value == 0 && cell.isOpen) {
          newField = newField.map((row) => {
            return row.map((el) => {
              if (
                ((el.rowId === cell.rowId - 1 && el.row === cell.row - 1) ||
                  (el.rowId === cell.rowId && el.row === cell.row - 1) ||
                  (el.rowId === cell.rowId + 1 && el.row === cell.row - 1) ||
                  (el.rowId === cell.rowId - 1 && el.row === cell.row) ||
                  (el.rowId === cell.rowId + 1 && el.row === cell.row) ||
                  (el.rowId === cell.rowId - 1 && el.row === cell.row + 1) ||
                  (el.rowId === cell.rowId && el.row === cell.row + 1) ||
                  (el.rowId === cell.rowId + 1 && el.row === cell.row + 1))
              ) {
                return { ...el, isOpen: true };
              }
              else {
                return el;
              }
            });
          });
        }
      });
    });
    if(newField){
      setField(newField);
    }
  }

  useEffect(() => {
    many();
  }, [demined])

    useEffect(() => {
    if(demined == 378){
      alert(`You won! \n Time: ${Math.floor(time/60)} : ${time%60}`)
      document.location.reload();
    }

    field.map((row) => {
      row.map((cell) => {
        if((cell.isBomb) && (cell.isOpen)){
          alert("You lose!");
          document.location.reload();
        }
      })
    })
  }, [field])

  useEffect(() => {
    let score = 0;
    field.map((row) => {
      row.map((el) => {
        if(el.isOpen && !el.isBomb){
          score++;
        }
      })
    })
    setDemined(score);
    console.log(demined);
  }, [field])

  return(
    <div>
      <b>Time: {Math.floor(time/60) + ":" + time%60}</b>
      <br/>
      <b>Not demined: {378 - demined}</b>
      <h1>Sapper game</h1>
      <div className={style1.outside}>
        <div className={style1.field}>
          {field.map((row) => {
            return(
              row.map((cell) => (
                <div className={style1.cell} style={color(cell)} key={cell.id} tabIndex={1} onClick={() => {open(cell); poly(cell)}} onKeyDown={(e) => {if(e.code == "Space"){open(cell); poly(cell)}}}>{cell.isOpen ? cell.value : null}</div>
              ))
            )
          })}
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, app);