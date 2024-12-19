/* eslint-disable react/prop-types */
import { useState } from "react";
import './subirMemes.css'

export default function SubirMeme({estaAutenticado, token, subirMeme, updateLikes, closeSubirMeme}) {
    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [imagenMeme, setImagenMeme] = useState("")

    const [preview, setPreview] = useState(null);

    const handleSubirMeme = async () => {
        if (!estaAutenticado) return
        if (!imagenMeme || !titulo || !descripcion) {
          alert("Rellene todos los campos para subir un meme")
          return
        }
        const [message, error] = await subirMeme(token, titulo, descripcion, imagenMeme)
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
      const handlePreview = (event) => {
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
                    <input id="file" type="file" onChange={handlePreview} />
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
    )
}