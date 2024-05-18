import React from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css'; // Custom styles for Layout
import loginImg from './images/login.png'
import apptImg from './images/appointments.png'
import avatarImg from './images/avatar.png'
import homeImg from './images/home.png'
import masseuseImg from './images/masseuse.png'
import portalImg from './images/portal.png'

const Layout = ({ children }) => {
    const navItems = [
      { to: "/Login", title: "Login", imgSrc: loginImg },
      { to: "/Appointments", title: "Appointments", imgSrc: apptImg },
      { to: "/Customer", title: "Customer", imgSrc: avatarImg },
      { to: "/Employee", title: "Employee", imgSrc: avatarImg },
      { to: "/Home", title: "Home", imgSrc: homeImg },
      { to: "/Masseuse", title: "Masseuse", imgSrc: masseuseImg },
      { to: "/Portal", title: "Portal", imgSrc: portalImg }
    ];
  
    return (
        <div className="container-fluid d-flex flex-column flex-md-row">
          <nav className="flex-shrink-0 bg-light navbar-container">
            <div className="nav flex-md-column nav-pills" role="tablist">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  className="nav-link btn btn-light my-1 d-flex align-items-center"
                  to={item.to}
                  activeClassName="active"
                >
                  <img src={item.imgSrc} alt={item.title} className="me-2" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </nav>
          <main className="flex-grow-1 p-3">
            {children}
          </main>
        </div>
      );
    };
    
    export default Layout;