// src/routes.jsx

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Contacts } from "./pages/Contacts"; 
import { AddContact } from "./pages/AddContact"; 

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>¡No encontrado!</h1>} >
            {/* Ruta para la lista de contactos (la página principal) */}
            <Route path="/" element={<Contacts />} />
            {/* Ruta para añadir un nuevo contacto */}
            <Route path="/add" element={<AddContact />} />
            {/* Ruta para editar un contacto existente (el :id es un parámetro dinámico) */}
            <Route path="/edit/:id" element={<AddContact />} />
        </Route>
    )
);