export const initialStore = {
  contacts: [],
  loading: false,
  error: null,
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'LOAD_CONTACTS':
      // Accede al array de contactos dentro de la propiedad 'contacts' de la respuesta
      return { ...store, contacts: action.payload.contacts, loading: false, error: null };
    case 'ADD_CONTACT':
      return { ...store, contacts: [...store.contacts, action.payload], error: null };
    case 'UPDATE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        error: null,
      };
    case 'DELETE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== action.payload),
        error: null,
      };
    case 'SET_LOADING':
      return { ...store, loading: action.payload, error: null };
    case 'SET_ERROR':
      return { ...store, error: action.payload, loading: false };
    default:
      return store;
  }
}