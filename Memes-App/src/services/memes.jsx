

const URL_MEMES = "https://memes-api.grye.org";

export const getDataMemes = async (page, quantity, ordernarPor) =>{
    try {
      if(!ordernarPor) return
        const url = `${URL_MEMES}/memes/?sort_by=${ordernarPor}&page=${page}&limit=${quantity}`
        const response = await fetch(url)
    
        const data = await response.json()
    
        if (!response.ok) {
          return [null, "Error al obtener memes"];
        }
    
        return [data, null]
      } catch (error) {
        return [null, error.message]
      }
}

export const registrar = async (usuario, contraseña) => {
  try {
    const respuesta = await fetch(`${URL_MEMES}/register`, {
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
      return [null, "Error al registrar usuario"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

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
    return [data, null]
  } catch (error) {
    return [null, error.message]
  }
}

export const subirMeme = async (token, titulo, descripcion, imagen) => {
  try {
    if (!token) {
      return [null, "Debes iniciar sesión para subir un meme."];
    }

    const url = `${URL_MEMES}/memes/?title=${encodeURIComponent(
      titulo
    )}&description=${encodeURIComponent(descripcion)}`;

    const dataFormulario = new FormData();
    dataFormulario.append("file", imagen);

    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: dataFormulario,
    });

    if (!respuesta.ok) {
      return [null, "Error al subir meme"];
    }

    return ["Meme subido con éxito!", null];
  } catch (error) {
    return [null, error.message || "Error al subir meme"];
  }
}

export const likeMeme = async (token, memeId) => {
  try {
    if (!token) {
      return [null, "Debes iniciar sesión para dar like a un meme."];
    }

    const url = `${URL_MEMES}/memes/${memeId}`;

    const respuesta = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const { likes } = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al dar like a meme"];
    }

    return [likes, null];
  } catch (error) {
    return [null, error.message || "Error al subir meme"];
  }
}