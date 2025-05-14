// src/components/Navbar.jsx

import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Lista de Contactos</span>
        </Link>
        <div className="ml-auto">
          <Link to="/add">
            <button className="btn btn-success">Añadir Contacto</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};