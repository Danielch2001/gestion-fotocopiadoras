# 📌 TecnoQuito - Sistema de Gestión de Fotocopiadoras

TecnoQuito es una aplicación web diseñada para la gestión eficiente de fotocopiadoras empresariales. Permite a los usuarios **reservar, comprar y alquilar** fotocopiadoras de manera sencilla, asegurando disponibilidad y optimizando la administración del equipo.

## 🚀 Tecnologías Utilizadas

### **Frontend**
- **React.js** con Context API para manejo de estado.
- **React Router** para navegación dinámica.
- **Material UI / Tailwind CSS** para una interfaz moderna y responsiva.
- **Axios** para consumo de API.

### **Backend**
- **Node.js** con **Express.js** para la API REST.
- **Autenticación JWT** para la seguridad de usuarios.
- **CORS & Helmet** para mejorar la seguridad del backend.
- **bcrypt.js** para encriptación de contraseñas.

### **Base de Datos**
- **PostgreSQL** como sistema de base de datos relacional.
- **Sequelize ORM** para la gestión de modelos y consultas SQL.

### **Despliegue**
- **Amazon EC2** para hosting del backend y frontend.
- **Docker** para contenerización de la aplicación.
- **Nginx** para balanceo de carga y hosting estático.

---

## 📌 Funcionalidades Implementadas

### 🔐 **1. Autenticación y Autorización**
✔ Registro de usuarios con validación de datos.  
✔ Inicio de sesión con **JWT** (JSON Web Tokens).  
✔ Gestión de roles:
  - **Usuarios:** pueden ver y gestionar sus reservas, compras y alquileres.
  - **Administradores:** pueden ver estadísticas, modificar el catálogo y gestionar reservas.

---

### 🖨️ **2. Gestión de Fotocopiadoras**
✔ Visualización de todas las fotocopiadoras disponibles.  
✔ Búsqueda optimizada por **modelo, marca o ubicación**.  
✔ Filtrado por estado: Disponible, Reservada, Ocupada, En Mantenimiento o Vendida.  

---

### 📅 **3. Reservas, Compras y Alquileres**
✔ **Reservar** una fotocopiadora disponible.  
✔ **Comprar** una fotocopiadora si está en venta.  
✔ **Alquilar** por un período determinado con fecha de inicio y fin.  

---

### 📊 **4. Panel de Administración**
✔ **Dashboard interactivo** con estadísticas clave:
  - Horas y fechas de mayor uso.
  - Fotocopiadoras más demandadas.
  - Tendencias de reservas y alquileres.  
✔ Gestión de usuarios y fotocopiadoras.  

---

## 📌 Última Vista Implementada: **Reserva de Fotocopiadoras**

✅ **Características:**
- Botón de acción dinámico: **"Reservar"**, **"Comprar"** o **"Alquilar"** según disponibilidad.
- **Búsqueda optimizada** con barra compacta.
- **Diseño responsivo** compatible con dispositivos móviles.
- **Notificaciones en tiempo real** con alertas visuales.

---

## 🛠️ **Principios SOLID Aplicados**

### 🔹 1. **Principio de Responsabilidad Única (SRP)**
✔ Código modular: cada función y componente tiene un único propósito.  
✔ Separación del frontend y backend en archivos organizados.  

### 🔹 2. **Principio de Abierto/Cerrado (OCP)**
✔ Se pueden agregar nuevos tipos de transacciones sin modificar código existente.  
✔ Uso de parámetros dinámicos para manejar diferentes acciones.  

### 🔹 3. **Principio de Sustitución de Liskov (LSP)**
✔ La autenticación permite tanto usuarios como administradores sin afectar la lógica principal.  

### 🔹 4. **Principio de Segregación de Interfaces (ISP)**
✔ Controladores y rutas organizados por entidad (`usuarios`, `fotocopiadoras`, `reservas`).  

### 🔹 5. **Principio de Inversión de Dependencias (DIP)**
✔ La conexión a PostgreSQL está centralizada en `config/db.js`, desacoplando la base de datos del resto de la aplicación.  

---

## 🎨 **Patrones de Diseño Utilizados**

### 🏗 **1. Patrón MVC (Modelo-Vista-Controlador)**
✔ **Modelo:** PostgreSQL maneja los datos.  
✔ **Vista:** React.js con componentes reutilizables.  
✔ **Controlador:** Funciones en `controllers/` que gestionan la lógica.  

### 🏭 **2. Patrón Factory**
✔ Creación dinámica de objetos para manejar transacciones (`reservar`, `comprar`, `alquilar`).  

### 🔄 **3. Patrón Singleton**
✔ La conexión con la base de datos (`db.js`) se maneja con una única instancia.  

### 📡 **4. Patrón Observer**
✔ Uso de Context API en React para actualizar automáticamente el estado global.  

## 🔜 **Próximos Pasos**
- 🔹 **Optimizar la gestión de estados** en el frontend con Redux o Zustand.  
- 🔹 **Implementar notificaciones en tiempo real** al reservar o comprar.  
- 🔹 **Agregar soporte para pagos en línea** con Stripe o MercadoPago.  
- 🔹 **Integración con microservicios** para mejorar escalabilidad.  

---

## 🚀 **Configuración y Ejecución**

### **1️⃣ Clonar el Repositorio**
```bash
git clone https://github.com/usuario/tecnoquito.git
cd tecnoquito
```

### **2️⃣ Instalar Dependencias**
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### **3️⃣ Configurar Variables de Entorno**
Crea un archivo `.env` en el backend con la configuración de la base de datos:
```env
DB_USER=tu_usuario
DB_HOST=localhost
DB_NAME=tecnoquito
DB_PASSWORD=tu_contraseña
DB_PORT=5432
JWT_SECRET=clave_secreta
```

### **4️⃣ Ejecutar la Aplicación**
```bash
# Iniciar Backend
cd backend
npm start

# Iniciar Frontend
cd frontend
npm start
```

---

## 👨‍💻 **Contribuidores**
- **Daniel Chicaiza** | [Email](mailto:daniel.chicaiza@udla.edu.ec)  

---

## 📜 **Licencia**
Este proyecto está bajo la licencia **UDLA**.
