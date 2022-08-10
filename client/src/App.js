import React from 'react';
import Layout from './components/Layout/Layout';
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
    </Routes><Layout />
  );
};

export default App;
