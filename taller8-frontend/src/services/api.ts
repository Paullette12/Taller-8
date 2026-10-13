
export interface Publicacion {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface DatosPublicacion {
  userId: number;
  title: string;
  body: string;
}

export const API_URL = "http://localhost:3000";

const procesarRespuesta = async (response: Response) => {
  if (response.status === 204) {
    return null;
  }

  const texto = await response.text();
  let datos;

  try {
    datos = JSON.parse(texto);
  } catch {
    datos = null;
  }

  if (!response.ok) {
    throw new Error(
      datos?.error ?? `El servidor respondió con el código ${response.status}`
    );
  }

  return datos;
};

// Paso 7: GET con filtro opcional por usuario
export const obtenerPublicaciones = async (
  userId?: number
): Promise<Publicacion[]> => {
  const url = userId
    ? `${API_URL}/api/posts?userId=${userId}`
    : `${API_URL}/api/posts`;

  const response = await fetch(url);
  return procesarRespuesta(response);
};

// Crear publicación
export const crearPublicacion = async (
  datos: DatosPublicacion
): Promise<Publicacion> => {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });

  return procesarRespuesta(response);
};

// Paso 8: Actualizar publicación
export const actualizarPublicacion = async (
  id: number,
  datos: DatosPublicacion
): Promise<Publicacion> => {
  const response = await fetch(`${API_URL}/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });

  return procesarRespuesta(response);
};

// Paso 9: Eliminar publicación
export const eliminarPublicacion = async (
  id: number
): Promise<void> => {
  const response = await fetch(`${API_URL}/api/posts/${id}`, {
    method: "DELETE"
  });

  await procesarRespuesta(response);
};
