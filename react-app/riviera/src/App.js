import React from 'react';
import './App.css';
import { Routes, Route, NavLink,} from "react-router-dom"
import SignUp from './SignUp';
import Login from './Login';
import AppointmentPage from './AppointmentPage';
import CustomerPage from './CustomerPage';
import EmployeePage from './EmployeePage';
import HomePage from './HomePage';
import MasseusePage from './MasseusePage';
import PortalPage from './PortalPage';
import Layout from './Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Appointments" element={<AppointmentPage />} />
        <Route path="/Customer" element={<CustomerPage />} />
        <Route path="/Employee" element={<EmployeePage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Masseuse" element={<MasseusePage />} />
        <Route path="/Portal" element={<PortalPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
