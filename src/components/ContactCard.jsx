// src/components/ContactCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Evita la inyección automática de CSS

export const ContactCard = ({ contact, onDelete, onEdit }) => (
  <div className="card mb-3">
    <div className="row g-0 align-items-center">
      <div className="col-md-2 text-center">
        <FontAwesomeIcon icon={faUserCircle} size="3x" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{contact.name}</h5>
          <p className="card-text mb-0"><small className="text-muted">Teléfono:</small> {contact.phone}</p>
          <p className="card-text mb-0"><small className="text-muted">Email:</small> {contact.email}</p>
          <p className="card-text"><small className="text-muted">Dirección:</small> {contact.address}</p>
        </div>
      </div>
      <div className="col-md-2 d-flex flex-column align-items-center justify-content-around">
        <Link to={`/edit/${contact.id}`} className="btn btn-light p-2">
          <FontAwesomeIcon icon={faPen} size="lg" />
        </Link>
        <button onClick={() => onDelete(contact.id, contact.name)} className="btn btn-light p-2">
          <FontAwesomeIcon icon={faTrash} size="lg" className="text-danger" />
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
  onEdit: PropTypes.func.isRequired,
};