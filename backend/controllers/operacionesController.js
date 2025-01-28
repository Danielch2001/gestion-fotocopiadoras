const pool = require("../config/db");

// 📌 Reservar una fotocopiadora
const reservarFotocopiadora = async (req, res) => {
  const { idcliente, idfotocopiadora, fecha_inicio, fecha_fin, precio_aproximado } = req.body;

  try {
    // Verificar si la fotocopiadora está disponible
    const estadoActual = await pool.query(
      "SELECT estado FROM fotocopiadora WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    if (estadoActual.rows[0].estado !== "disponible") {
      return res.status(400).json({ message: "Fotocopiadora no disponible" });
    }

    // Insertar la reserva
    await pool.query(
      `INSERT INTO reservas (idcliente, idfotocopiadora, fecha_inicio, fecha_fin, precio_aproximado)
       VALUES ($1, $2, $3, $4, $5)`,
      [idcliente, idfotocopiadora, fecha_inicio, fecha_fin, precio_aproximado]
    );

    // Cambiar estado de la fotocopiadora
    await pool.query(
      "UPDATE fotocopiadora SET estado = 'reservada' WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    res.status(201).json({ message: "Reserva realizada con éxito" });
  } catch (error) {
    console.error("Error al reservar:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Alquilar una fotocopiadora
const alquilarFotocopiadora = async (req, res) => {
  const { idcliente, idfotocopiadora, fecha_inicio, fecha_fin } = req.body;

  try {
    // Verificar disponibilidad
    const estadoActual = await pool.query(
      "SELECT estado FROM fotocopiadora WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    if (estadoActual.rows[0].estado !== "disponible") {
      return res.status(400).json({ message: "Fotocopiadora no disponible" });
    }

    // Insertar alquiler
    await pool.query(
      `INSERT INTO historial_uso (idfotocopiadora, idcliente, tipo_uso, fecha_inicio, fecha_fin)
       VALUES ($1, $2, 'alquiler', $3, $4)`,
      [idfotocopiadora, idcliente, fecha_inicio, fecha_fin]
    );

    // Cambiar estado
    await pool.query(
      "UPDATE fotocopiadora SET estado = 'alquilada' WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    res.status(201).json({ message: "Alquiler registrado con éxito" });
  } catch (error) {
    console.error("Error al alquilar:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Comprar una fotocopiadora
const comprarFotocopiadora = async (req, res) => {
  const { idcliente, idfotocopiadora } = req.body;

  try {
    // Verificar disponibilidad
    const estadoActual = await pool.query(
      "SELECT estado FROM fotocopiadora WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    if (estadoActual.rows[0].estado !== "disponible") {
      return res.status(400).json({ message: "Fotocopiadora no disponible" });
    }

    // Registrar la compra en el historial
    await pool.query(
      `INSERT INTO historial_uso (idfotocopiadora, idcliente, tipo_uso)
       VALUES ($1, $2, 'venta')`,
      [idfotocopiadora, idcliente]
    );

    // Cambiar estado
    await pool.query(
      "UPDATE fotocopiadora SET estado = 'vendida' WHERE idfotocopiadora = $1",
      [idfotocopiadora]
    );

    res.status(201).json({ message: "Compra realizada con éxito" });
  } catch (error) {
    console.error("Error al comprar:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { reservarFotocopiadora, alquilarFotocopiadora, comprarFotocopiadora };
