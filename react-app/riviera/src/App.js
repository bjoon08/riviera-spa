import logo from './logo.svg';
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

function App() {
  return (
    <>
    <div className="Navigation">
      <NavLink className="nav-link" to="/Login">
        Login
      </NavLink>  <NavLink className="nav-link" to="/Appointments">
        Appointments
      </NavLink>      <NavLink className="nav-link" to="/Customer">
        Customer
      </NavLink>      <NavLink className="nav-link" to="/Employee">
        Employee
      </NavLink>      <NavLink className="nav-link" to="/Home">
        Home
      </NavLink>      <NavLink className="nav-link" to="/Masseuse">
        Masseuse
      </NavLink>      <NavLink className="nav-link" to="/Portal">
        Portal
      </NavLink>

    </div>
    
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
</>
  );
}

export default App;
