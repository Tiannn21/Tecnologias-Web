/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { autenticar } from "../services/memes";

export const ContextoAutenticacion = createContext();

export const ProveedorAutenticacion = ({ children }) => {
  const [credenciales, actualizaCredenciales] = useState({});
  const [estaAutenticado, actualizaEstaAutenticado] = useState(false);

  const autenticarUsuario = async (usuario, contraceña) => {
    const [creds, error] = await autenticar(usuario, contraceña);
    if (error) {
      actualizaEstaAutenticado(false);
      return false;
    }

    actualizaCredenciales(creds);
    actualizaEstaAutenticado(true);
    return true;
  };

  return (
    <ContextoAutenticacion.Provider
      value={{
        credenciales,
        estaAutenticado,
        autenticarUsuario,
      }}
    >
      {children}
    </ContextoAutenticacion.Provider>
  );
};