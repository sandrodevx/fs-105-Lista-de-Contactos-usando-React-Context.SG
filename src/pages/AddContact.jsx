import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContacts } from '../hooks/useContacts';
import { addContact, updateContact } from '../store/actions';

export const AddContact = () => {
  const { dispatch, state } = useContacts();
  const navigate = useNavigate();
  const { id } = useParams(); // Para editar contactos existentes
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const contactToEdit = state.contacts.find((c) => c.id === parseInt(id));
      if (contactToEdit) {
        setContact(contactToEdit);
      } else {
        // Si no se encuentra el contacto, redirigir a la lista
        navigate('/contacts');
      }
    } else {
      setIsEditing(false);
      setContact({ name: '', phone: '', email: '', address: '' });
    }
  }, [id, state.contacts, navigate]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateContact(dispatch, id, contact)
        .then(() => navigate('/contacts'))
        .catch(error => console.error("Error updating contact:", error));
    } else {
      addContact(dispatch, contact)
        .then(() => navigate('/contacts'))
        .catch(error => console.error("Error adding contact:", error));
    }
  };

  return (
    <div className="container">
      <h1>{isEditing ? 'Editar Contacto' : 'Añadir Nuevo Contacto'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={contact.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Guardar Cambios' : 'Añadir Contacto'}
        </button>
        <button onClick={() => navigate('/contacts')} className="btn btn-secondary ms-2">
          Cancelar
        </button>
      </form>
      {state.loading && <p>Guardando contacto...</p>}
      {state.error && <p className="alert alert-danger">Error: {state.error}</p>}
    </div>
  );
};