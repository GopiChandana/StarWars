import React from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';

function Person() {
  React.useEffect(()=>{
    
  },[])
  const location = useLocation();
  console.log(location.pathname)
  let urlsplitter=location.pathname.split("/")
  
  return (
    <div className="person">
      <h1>Luke Skywalker</h1>
    </div>
  );
}

export default Person;
