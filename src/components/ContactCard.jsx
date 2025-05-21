import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faPen, faTrash, faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Evita la inyección automática de CSS

export const ContactCard = ({ contact, onDelete }) => (
  <div className="card mb-3 shadow-sm hover-shadow">
    <div className="row g-0 align-items-center p-2">
      <div className="col-md-2 text-center">
        <FontAwesomeIcon 
          icon={faUserCircle} 
          size="3x" 
          className="text-primary"
        />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title mb-3">{contact.name}</h5>
          <div className="contact-details">
            {contact.phone && (
              <p className="card-text mb-2">
                <FontAwesomeIcon icon={faPhone} className="me-2 text-muted" />
                <a href={`tel:${contact.phone}`} className="text-decoration-none">
                  {contact.phone}
                </a>
              </p>
            )}
            {contact.email && (
              <p className="card-text mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="me-2 text-muted" />
                <a href={`mailto:${contact.email}`} className="text-decoration-none">
                  {contact.email}
                </a>
              </p>
            )}
            {contact.address && (
              <p className="card-text">
                <FontAwesomeIcon icon={faLocationDot} className="me-2 text-muted" />
                {contact.address}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-2 d-flex flex-column align-items-center gap-2">
        <Link 
          to={`/edit/${contact.id}`} 
          className="btn btn-outline-primary btn-sm w-75"
          title="Editar contacto"
        >
          <FontAwesomeIcon icon={faPen} />
        </Link>
        <button 
          onClick={() => onDelete(contact.id, contact.name)} 
          className="btn btn-outline-danger btn-sm w-75"
          title="Eliminar contacto"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  </div>
);

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};