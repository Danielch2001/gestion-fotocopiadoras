export const fetchFotocopiadorasDisponibles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/fotocopiadoras/disponibles");
      return response.data;
    } catch (error) {
      console.error("Error obteniendo fotocopiadoras disponibles:", error);
      return [];
    }
  };
  
