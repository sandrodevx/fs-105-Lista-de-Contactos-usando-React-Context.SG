// src/hooks/useContacts.jsx

import React, { useContext, useReducer } from "react";
import storeReducer, { initialStore } from "../store/store";
import { ContactsContext } from '../store/Context'; // Importa el Context creado

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(storeReducer, initialStore);
    return (
        <ContactsContext.Provider value={{ state, dispatch }}>
            {children}
        </ContactsContext.Provider>
    );
}

export const useContacts = () => {
    const context = useContext(ContactsContext);
    if (!context) {
        throw new Error('useContacts must be used within a ContactsProvider');
    }
    return context;
};