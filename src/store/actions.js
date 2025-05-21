const API_BASE_URL = 'https://playground.4geeks.com/contact/agendas/sandrogomez';

export const fetchContacts = (dispatch) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  fetch(`${API_BASE_URL}/contacts`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      dispatch({ type: 'LOAD_CONTACTS', payload: data });
    })
    .catch(error => {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    });
};

export const addContact = async (dispatch, contact) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    dispatch({ type: 'ADD_CONTACT', payload: data });
    dispatch({ type: 'SET_LOADING', payload: false });
    return data;
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
    dispatch({ type: 'SET_LOADING', payload: false });
    throw error;
  }
};

export const updateContact = async (dispatch, id, contact) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    dispatch({ type: 'UPDATE_CONTACT', payload: data });
    dispatch({ type: 'SET_LOADING', payload: false });
    return data;
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
    dispatch({ type: 'SET_LOADING', payload: false });
    throw error;
  }
};

export const deleteContact = (dispatch, id) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    })
    .catch(error => {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    });
};
