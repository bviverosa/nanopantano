import React from "react";
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./pages/Login.jsx";
import Administrator from "./pages/Administrator.jsx";
import Info from "./pages/Info.jsx"

class Router extends React.Component {

  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/administrator" element={<Administrator />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>);
  }
}
export default Router; 