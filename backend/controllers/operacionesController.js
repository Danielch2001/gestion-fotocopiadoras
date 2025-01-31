const pool = require("../config/db");

// 📌 Reservar una fotocopiadora
const reservarFotocopiadora = async (req, res) => {
  const { idcliente, idfotocopiadora, fechainicio, fechafin } = req.body; // Corregidos nombres de variables

  try {
    // Verificar si la fotocopiadora está disponible
    const estadoActual = await pool.query(
      "SELECT estado, precio FROM fotocopiadora WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    if (estadoActual.rows.length === 0) {
      return res.status(404).json({ message: "Fotocopiadora no encontrada" });
    }

    if (estadoActual.rows[0].estado !== "disponible") {
      return res.status(400).json({ message: "Fotocopiadora no disponible" });
    }

    // Obtener el precio de la fotocopiadora
    const precioFotocopiadora = parseFloat(estadoActual.rows[0].precio);

    // Calcular la diferencia en meses entre fechainicio y fechafin
    const fechaInicio = new Date(fechainicio);
    const fechaFin = new Date(fechafin);
    const diferenciaMeses = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 +
                            (fechaFin.getMonth() - fechaInicio.getMonth());

    // Si la diferencia es menor a 1 mes, cobra 1 mes completo
    const mesesReserva = diferenciaMeses > 0 ? diferenciaMeses : 1;

    // Calcular el precio como 30% del precio de la fotocopiadora por cada mes
    const precio_aproximado = (precioFotocopiadora * 0.30) * mesesReserva;

    // Insertar la reserva con el precio calculado
    await pool.query(
      `INSERT INTO reservas (idcliente, idfotocopiadora, fechainicio, fechafin, precio_aproximado)
       VALUES ($1, $2, $3, $4, $5)`,
      [idcliente, idfotocopiadora, fechainicio, fechafin, precio_aproximado] // Corregidos nombres de columnas
    );

    // Cambiar estado de la fotocopiadora a "reservada"
    await pool.query(
      "UPDATE fotocopiadora SET estado = 'reservada' WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    res.status(201).json({ message: "Reserva realizada con éxito", precio_aproximado });
  } catch (error) {
    console.error("Error al reservar:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};



const alquilarFotocopiadora = async (req, res) => {
  // 📌 Normalizar nombres de claves (asegurar compatibilidad con el frontend)
  const body = req.body;
  const idcliente = body.idcliente;
  const idfotocopiadora = body.idfotocopiadora;
  const fecha_inicio = body.fechainicio || body.fecha_inicio; // Asegurar que toma cualquiera de los dos
  const fecha_fin = body.fechafin || body.fecha_fin;

  console.log("📥 Datos recibidos en el backend (normalizados):", { idcliente, idfotocopiadora, fecha_inicio, fecha_fin });

  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ message: "⚠️ Las fechas de inicio y fin son obligatorias." });
  }

  try {
    // Verificar disponibilidad
    const estadoActual = await pool.query(
      "SELECT estado, precio FROM fotocopiadora WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    if (estadoActual.rows.length === 0) {
      return res.status(404).json({ message: "⚠️ Fotocopiadora no encontrada" });
    }

    if (estadoActual.rows[0].estado !== "disponible") {
      return res.status(400).json({ message: "⚠️ Fotocopiadora no disponible" });
    }

    // Obtener el precio de la fotocopiadora
    const precioFotocopiadora = parseFloat(estadoActual.rows[0].precio);

    // Calcular la diferencia en meses entre fecha_inicio y fecha_fin
    const fechaInicio = new Date(fecha_inicio);
    const fechaFin = new Date(fecha_fin);
    const diferenciaMeses = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 +
                            (fechaFin.getMonth() - fechaInicio.getMonth());

    const mesesAlquiler = diferenciaMeses > 0 ? diferenciaMeses : 1;
    const precio_total = (precioFotocopiadora * 0.35) * mesesAlquiler;

    // Insertar alquiler en el historial_uso
    await pool.query(
      `INSERT INTO historial_uso (idfotocopiadora, idcliente, tipo_uso, fecha_inicio, fecha_fin, notas)
       VALUES ($1, $2, 'alquiler', $3, $4, 'Alquilada')`,
      [idfotocopiadora, idcliente, fecha_inicio, fecha_fin]
    );

    // Cambiar estado de la fotocopiadora a "alquilada"
    await pool.query(
      "UPDATE fotocopiadora SET estado = 'alquilada' WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    res.status(201).json({ 
      message: "✅ Alquiler registrado con éxito",
      precio_total
    });

  } catch (error) {
    console.error("❌ Error al alquilar:", error);
    res.status(500).json({ message: "❌ Error en el servidor" });
  }
};



const comprarFotocopiadora = async (req, res) => {
  const { idcliente, idfotocopiadora, fechainicio } = req.body; // Asegurar que recibe fechainicio

  try {
    // Verificar disponibilidad de la fotocopiadora
    const estadoActual = await pool.query(
      "SELECT estado, precio FROM fotocopiadora WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    if (estadoActual.rows.length === 0) {
      return res.status(404).json({ message: "Fotocopiadora no encontrada" });
    }

    if (estadoActual.rows[0].estado !== "disponible") {
      return res.status(400).json({ message: "Fotocopiadora no disponible" });
    }

    // Validar que se haya enviado fechainicio
    if (!fechainicio) {
      return res.status(400).json({ message: "Debe proporcionar una fecha de inicio para la compra" });
    }

    // Registrar la compra en historial_uso
    await pool.query(
      `INSERT INTO historial_uso (idfotocopiadora, idcliente, tipo_uso, fecha_inicio, fecha_fin, notas, idfecha)
       VALUES ($1, $2, 'venta', $3, NULL, 'vendida', NULL)`, 
      [idfotocopiadora, idcliente, fechainicio] // Enviar correctamente fechainicio
    );

    // Cambiar estado de la fotocopiadora a "vendida"
    await pool.query(
      "UPDATE fotocopiadora SET estado = 'vendida' WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    res.status(201).json({ message: "Compra realizada con éxito", precio: estadoActual.rows[0].precio });
  } catch (error) {
    console.error("Error al comprar:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};



module.exports = { reservarFotocopiadora, alquilarFotocopiadora, comprarFotocopiadora };
