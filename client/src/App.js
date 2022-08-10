import React from 'react';
import axios from 'axios'
import {
  Routes,
  Route,
} from "react-router-dom";
import MasterProfile from './components/MasterProfile/MasterProfile'


const App = () => {
  return (
    <Routes>
      <Route path='/master/:id/profile' element={ <MasterProfile />}/>
    </Routes>
  );
}

export default App;
