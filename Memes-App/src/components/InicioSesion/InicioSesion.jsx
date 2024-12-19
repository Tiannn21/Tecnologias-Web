/* eslint-disable react/prop-types */
import { useState } from "react";

export default function IniciarSesion({closeDialog, autenticarUsuario, openRegisterDialog}) {
    const [userInput, setUserInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleLogin = async () => {
        const autenticado = await autenticarUsuario(userInput, passwordInput)
        if (autenticado) {
            closeDialog()
            setUserInput('')
            setPasswordInput('')
        }
        else alert("Autenticación fallida");
    }

    return (
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
    )
}