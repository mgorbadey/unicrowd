import React from "react";
import { Route, Routes } from "react-router-dom";
import MasterCalendar from "./pages/MasterCalendar";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/masters/:id/schedules" element={<MasterCalendar />} />
      </Routes>
    </>
  );
};

export default App;
