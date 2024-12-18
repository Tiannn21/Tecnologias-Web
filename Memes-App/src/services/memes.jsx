

const URL_MEMES = "https://memes-api.grye.org";

export const getDataMemes = async (page, quantity, ordernarPor) =>{
    try {
        const url = `${URL_MEMES}/memes/?sort_by=${ordernarPor}&page=${page}&limit=${quantity}`;
        const response = await fetch(url);
    
        const data = await response.json();
    
        if (!response.ok) {
          return [null, "Error al obtener memes"];
        }
    
        return [data, null];
      } catch (error) {
        return [null, error.message];
      }
}

export const autenticar = async (usuario, contraseña) => {
  try {
    const respuesta = await fetch(`${URL_MEMES}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        username: usuario,
        password: contraseña,
      }).toString(),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Usuario o contraseña incorrectos"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};