import { useContext, useState } from "react";
import "./App.css";
import useMemes from "./hooks/useMemes";
import Memes from "./components/Memes";
import { subirMeme, registrar } from "./services/memes"
import { ContextoAutenticacion } from './context/ContextoAutenticacion.jsx'

function MemesApp() {
  const [ordenarPor, setOrdenarPor] = useState("new");
  const { memes, updateMemes, updateLikes, uploadMoreMemes } = useMemes(ordenarPor);

  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const openRegisterDialog = () => setIsRegisterOpen(true);
  const closeRegisterDialog = () => setIsRegisterOpen(false);
  const [registerUser, setRegisterUser] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [abrirSubirMeme, setAbrirSubirMeme] = useState(false)
  const openSubirMeme = () => setAbrirSubirMeme(true);
  const closeSubirMeme = () => setAbrirSubirMeme(false);
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [imagenMeme, setImagenMeme] = useState("")

  const [preview, setPreview] = useState(null);


  const { credenciales, estaAutenticado, autenticarUsuario } = useContext(ContextoAutenticacion)

  const handleOrdenarMasLikes = () => {
    if (ordenarPor !== "top") updateMemes()
    setOrdenarPor("top")
  };

  const handleOrdenarMasReciente = () => {
    if (ordenarPor !== "new") updateMemes()
    setOrdenarPor("new")
  }

  const handleLogin = async () => {
    const autenticado = await autenticarUsuario(userInput, passwordInput)
    if (autenticado) {
      closeDialog()
      alert('Bienvenido ' + userInput + ' esta autenticado: ' + credenciales)
      setUserInput('')
      setPasswordInput('')
    }
    else alert("Autenticación fallida");
  }

  const handleRegister = async () => {
    if (registerPassword === confirmPassword) {
      const [message, error] = await registrar(registerUser, registerPassword)
      if (!error) {
        alert("Registrado con exito: " + message)
      }
      closeRegisterDialog()
      setRegisterUser("")
      setRegisterPassword("")
      setConfirmPassword("")
    } else {
      alert("Las contraseñas no coinciden.");
    }
  };

  const handleSubirMeme = async () => {
    if (!estaAutenticado) return
    if (!imagenMeme || !titulo || !descripcion) {
      alert("Rellene todos los campos para subir un meme")
      return
    }
    const [message, error] = await subirMeme(credenciales.access_token, titulo, descripcion, imagenMeme)
    if (error) {
      alert(error)
    }
    else {
      updateLikes()
      setImagenMeme()
      setPreview()
      setTitulo()
      setDescripcion()
      alert(message)
      closeSubirMeme()
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagenMeme(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  const handleCerraSubirMeme = () => {
    closeSubirMeme()
    setImagenMeme()
    setPreview()
    setTitulo()
    setDescripcion()
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
        <div className="overlay">
          <div className="dialog">
            <h2>Iniciar Sesión</h2>
            <input
              type="text"
              placeholder="Usuario"
              className="input-field"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="input-field"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <div className="button-group">
              <button onClick={handleLogin}>Iniciar sesión</button>
              <button onClick={closeDialog}>Cancelar</button>
            </div>
            <div>
              <h3>No tienes cuenta?
                <a style={{ color: '#00ace8', cursor: 'pointer' }} onClick={openRegisterDialog}> haz click aqui</a>
              </h3>
            </div>
          </div>
        </div>
      )}
      {isRegisterOpen && (
        <div className="overlay">
          <div className="dialog">
            <h2>Registro</h2>
            <input
              type="text"
              placeholder="Usuario"
              className="input-field"
              value={registerUser}
              onChange={(e) => setRegisterUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="input-field"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="button-group">
              <button onClick={handleRegister}>Crear cuenta</button>
              <button onClick={closeRegisterDialog}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {abrirSubirMeme && (
        <div className="overlay">
          <div className="dialogSubirMeme">
            <h2>Sube Tu Meme</h2>
            <div className="containerMemes">
              <div className="header">
                {preview ? (
                  <img width='200' height='200' src={preview} alt="Preview" className="preview-image" />
                ) : (
                  <><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                    <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg><p>Browse File to upload!</p></>
                )}
              </div>

              <label htmlFor="file" className="footer">
                <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path><path d="M18.153 6h-.009v5.342H23.5v-.002z"></path></g></svg>
                {
                  imagenMeme
                    ? <p>{imagenMeme.name}</p>
                    : <p>No has seleccionado un meme</p>
                }
              </label>
              <input id="file" type="file" onChange={handleFileChange} />
            </div>
            <input
              type="text"
              placeholder="Titulo"
              className="inputSubirMeme"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descripcion"
              className="inputSubirMeme"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <div className="button-group">
              <button onClick={handleSubirMeme}>Subir</button>
              <button onClick={handleCerraSubirMeme}>Cancelar</button>
            </div>
          </div>
        </div>
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
