import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactCard } from '../components/ContactCard';
import { useContacts } from '../hooks/useContacts';
import { fetchContacts, deleteContact } from '../store/actions';
import { Modal } from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSort, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export const Contacts = () => {
  const { state, dispatch } = useContacts();
  const [showModal, setShowModal] = useState(false);
  const [contactToDeleteId, setContactToDeleteId] = useState(null);
  const [contactToDeleteName, setContactToDeleteName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredAndSortedContacts = state.contacts
    .filter(contact => 
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.email?.toLowerCase().includes(searchTerm) ||
      contact.phone?.toLowerCase().includes(searchTerm) ||
      contact.address?.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Lista de Contactos</h1>
        <Link to="/add" className="btn btn-primary">
          <FontAwesomeIcon icon={faUserPlus} className="me-2" />
          Nuevo Contacto
        </Link>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar contactos..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={toggleSortOrder}
              >
                <FontAwesomeIcon icon={faSort} className="me-2" />
                Ordenar {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {state.loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {state.error && (
        <div className="alert alert-danger">Error: {state.error}</div>
      )}

      <div className="row row-cols-1 g-3">
        {filteredAndSortedContacts.length > 0 ? (
          filteredAndSortedContacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={handleDeleteClick}
            />
          ))
        ) : (
          <div className="col">
            <div className="alert alert-info">
              {searchTerm 
                ? 'No se encontraron contactos que coincidan con tu búsqueda.'
                : 'No hay contactos guardados.'}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        contactName={contactToDeleteName}
      />
    </div>
  );
};