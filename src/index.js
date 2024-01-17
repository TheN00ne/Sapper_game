import React from 'react';
import ReactDOM from 'react-dom';

const app = document.getElementById("app");

function App(){
  return(
    <div>
      Hello world
    </div>
  )
}

ReactDOM.render(<App/>, app);