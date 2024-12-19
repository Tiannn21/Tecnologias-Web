/* eslint-disable react/prop-types */
import { useState } from "react";


export default function RegistrarUsuario({registrar, closeRegisterDialog}) {
    const [registerUser, setRegisterUser] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        if(!registerUser || !registerPassword || !confirmPassword){
            alert("Rellene todos los campos solicitados")
            return
        }
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
      }

    return (
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
    )
}