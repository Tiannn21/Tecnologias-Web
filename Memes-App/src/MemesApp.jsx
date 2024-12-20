import { useContext, useState } from "react";
import useMemes from "./hooks/useMemes";
import Memes from "./components/Memes/Memes.jsx";
import { subirMeme, registrar } from "./services/memes"
import { ContextoAutenticacion } from './context/ContextoAutenticacion.jsx'
import IniciarSesion from "./components/InicioSesion/InicioSesion.jsx";
import RegistrarUsuario from "./components/RegistrarUsuario/RegistrarUsuario.jsx";
import SubirMeme from "./components/SubirMeme/SubirMeme.jsx";
import "./App.css";

function MemesApp() {
  const [ordenarPor, setOrdenarPor] = useState("new");
  const { memes, updateMemes, updateLikes, uploadMoreMemes } = useMemes(ordenarPor)

  const { credenciales, estaAutenticado, autenticarUsuario } = useContext(ContextoAutenticacion)

  const [isOpen, setIsOpen] = useState(false)
  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const openRegisterDialog = () => setIsRegisterOpen(true)
  const closeRegisterDialog = () => setIsRegisterOpen(false)
  
  const [abrirSubirMeme, setAbrirSubirMeme] = useState(false)
  const openSubirMeme = () => setAbrirSubirMeme(true)
  const closeSubirMeme = () => setAbrirSubirMeme(false)
  
  const handleOrdenarMasLikes = () => {
    if (ordenarPor !== "top") updateMemes()
    setOrdenarPor("top")
  }

  const handleOrdenarMasReciente = () => {
    if (ordenarPor !== "new") updateMemes()
    setOrdenarPor("new")
  }

  return (
    <div className="container">
      <aside>
        <a href="#main">
          <button className="botones-azules">
            <svg
              viewBox="0 0 512 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M502.625,328.719c-6.25,6.25-14.438,9.375-22.625,9.375s-16.375-3.125-22.625-9.375L448,319.344v155.812H320v-160H192v160
        H64V319.344l-9.375,9.375c-12.5,12.5-32.75,12.5-45.25,0s-12.5-32.75,0-45.25L256,36.844l246.625,246.625
        C515.125,295.969,515.125,316.219,502.625,328.719z"
              ></path>
            </svg>
            <span>Inicio </span>
          </button>
        </a>
        {
          estaAutenticado
            ? (<button className="botones-azules" onClick={openSubirMeme}>
              <svg viewBox="0 0 30 30" className="bi bi-twitter" fill="currentColor" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                <path d="m11.17,6l3.41,3.41.59.59h12.83v16H4V6h7.17m0-2h-7.17c-1.1,0-2,.9-2,2v20c0,1.1.9,2,2,2h24c1.1,0,2-.9,2-2V10c0-1.1-.9-2-2-2h-12l-3.41-3.41c-.38-.38-.88-.59-1.41-.59h0Z"></path>
              </svg>
              <span>Subir meme</span>
            </button>)
            : (<button className="botones-azules" onClick={openDialog}>
              <svg
                viewBox="0 0 32 32"
                className="bi bi-custom"
                fill="currentColor"
                height="18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7,10a5,5,0,1,1,5-5A5.006,5.006,0,0,1,7,10ZM7,2a3,3,0,1,0,3,3A3,3,0,0,0,7,2Z" />
                <path
                  className="cls-1"
                  d="M4,16H2a1,1,0,0,1-.98-.8l-1-5A1,1,0,0,1,.553,9.105l3.6-1.8A1,1,0,1,1,5.047,9.1L2.13,10.553,2.82,14H4a1,1,0,0,1,0,2Z"
                />
                <path
                  className="cls-1"
                  d="M12,16H8a1,1,0,0,1,0-2h3.18l.69-3.447L8.953,9.1a1,1,0,1,1,.894-1.789l3.6,1.8A1,1,0,0,1,13.98,10.2l-1,5A1,1,0,0,1,12,16Z"
                />
                <path
                  className="cls-1"
                  d="M25,26a5,5,0,1,1,5-5A5.006,5.006,0,0,1,25,26Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,25,18Z"
                />
                <path
                  className="cls-1"
                  d="M22,32H20a1,1,0,0,1-.98-.8l-1-5a1,1,0,0,1,.533-1.091l3.6-1.8a1,1,0,1,1,.894,1.789L20.13,26.553,20.82,30H22a1,1,0,0,1,0,2Z"
                />
                <path
                  className="cls-1"
                  d="M30,32H26a1,1,0,0,1,0-2h3.18l.69-3.447L26.953,25.1a1,1,0,1,1,.894-1.789l3.6,1.8A1,1,0,0,1,31.98,26.2l-1,5A1,1,0,0,1,30,32Z"
                />
                <path
                  className="cls-2"
                  d="M25,14a1,1,0,0,1-1-1V11a5.006,5.006,0,0,0-5-5H17a1,1,0,0,1,0-2h2a7.008,7.008,0,0,1,7,7v2A1,1,0,0,1,25,14Z"
                />
                <path
                  className="cls-2"
                  d="M17,8a1,1,0,0,1-.707-.293l-2-2a1,1,0,0,1,0-1.414l2-2a1,1,0,1,1,1.414,1.414L16.414,5l1.293,1.293A1,1,0,0,1,17,8Z"
                />
                <path
                  className="cls-2"
                  d="M13,28H11a5.006,5.006,0,0,1-5-5V19a1,1,0,0,1,2,0v4a3,3,0,0,0,3,3h2a1,1,0,0,1,0,2Z"
                />
                <path
                  className="cls-2"
                  d="M13,30a1,1,0,0,1-.707-1.707L13.586,27l-1.293-1.293a1,1,0,0,1,1.414-1.414l2,2a1,1,0,0,1,0,1.414l-2,2A1,1,0,0,1,13,30Z"
                />
              </svg>
              <span>Iniciar Sesion</span>
            </button>)
        }

      </aside>
      {isOpen && (
        <IniciarSesion autenticarUsuario={autenticarUsuario} closeDialog={closeDialog} openRegisterDialog={openRegisterDialog} />
      )}
      {isRegisterOpen && (
        <RegistrarUsuario registrar={registrar} closeRegisterDialog={closeRegisterDialog}/>
      )}
      {abrirSubirMeme && (
        <SubirMeme estaAutenticado={estaAutenticado} closeSubirMeme={closeSubirMeme} token={credenciales.access_token} updateLikes={updateLikes} subirMeme={subirMeme}/>
      )}

      <main className="main" id="main">
        <section>
          <div className="botones">
            <button
              className="categoria"
              style={{ borderRight: "0px" }}
              onClick={handleOrdenarMasLikes}
            >
              Mas Likes
            </button>
            <button className="categoria" onClick={handleOrdenarMasReciente}>
              Mas Reciente
            </button>
          </div>
          <Memes memes={memes} token={credenciales.access_token} recargarMemes={updateLikes} />
          <div className="verMas">
            <button onClick={uploadMoreMemes}>Ver Mas</button>
          </div>
        </section>

      </main>
      <aside className="right-aside"></aside>
    </div>
  );
}

export default MemesApp;
