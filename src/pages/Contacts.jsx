
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactCard } from '../components/ContactCard';
import { useContacts } from '../hooks/useContacts';
import { fetchContacts, deleteContact } from '../store/actions';
import { Modal } from '../components/Modal'; // Importa el Modal

export const Contacts = () => {
  const { state, dispatch } = useContacts();
  const [showModal, setShowModal] = useState(false);
  const [contactToDeleteId, setContactToDeleteId] = useState(null);
  const [contactToDeleteName, setContactToDeleteName] = useState('');

  useEffect(() => {
    fetchContacts(dispatch);
  }, [dispatch]);

  const handleDeleteClick = (id, name) => {
    setContactToDeleteId(id);
    setContactToDeleteName(name);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (contactToDeleteId !== null) {
      deleteContact(dispatch, contactToDeleteId);
      setContactToDeleteId(null);
      setContactToDeleteName('');
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setContactToDeleteId(null);
    setContactToDeleteName('');
  };

  return (
    <div className="container">
      <h1>Lista de Contactos</h1>
      {state.loading && <p>Cargando contactos...</p>}
      {state.error && <p className="alert alert-danger">Error: {state.error}</p>}
      <div className="row row-cols-1 g-3">
        {state.contacts && state.contacts.length > 0 ? (
          state.contacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={() => {/* Navegar a la página de edición */}}
              onDelete={handleDeleteClick} // Usa la nueva función para mostrar el modal
            />
          ))
        ) : (
          <p>{state.loading ? 'Cargando contactos...' : (state.error ? `Error: ${state.error}` : 'No hay contactos.')}</p>
        )}
      </div>
      <Link to="/add" className="btn btn-success mt-3">
        Añadir Nuevo Contacto
      </Link>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        contactName={contactToDeleteName}
      />
    </div>
  );
};