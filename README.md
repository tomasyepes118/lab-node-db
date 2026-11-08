# Laboratorio Node.js con bases de datos

**Curso:** Programación Web

**Equipo del PPI:** Tomás Yepes Arboleda, Cristian Benites y Mateo Gallo

El laboratorio conecta una aplicación Node.js con la base `lab_personas` de MongoDB Atlas. Al abrir la página principal, Express consulta la colección `personas` con Mongoose y EJS muestra el nombre, apellido, edad y correo de cada persona.

## 1. Instalar dependencias

Abre la carpeta del laboratorio en VS Code y ejecuta estos comandos en la terminal. Necesitas Node.js 20.19 o superior.

```powershell
node -v
npm ci
Copy-Item .env-example .env
```

En macOS o Linux, el último comando es `cp .env-example .env`.

## 2. Configurar MongoDB Atlas

1. En [MongoDB Atlas](https://cloud.mongodb.com/), abre tu proyecto y crea o selecciona un clúster gratuito.
2. Crea un usuario de base de datos y agrega la IP de tu computador a la lista de acceso del proyecto.
3. En **Connect → Drivers → Node.js**, copia la URI. Reemplaza `<password>` por la contraseña del usuario de base de datos y agrega `/lab_personas` antes del signo `?`.
4. Abre el archivo `.env` en tu computador y pega la URI en `MONGODB_URI`. Si tu contraseña contiene `@` o `#`, codifica esos caracteres como `%40` o `%23`.

Este es un ejemplo con valores ficticios:

```dotenv
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:CLAVE@CLUSTER.mongodb.net/lab_personas?retryWrites=true&w=majority
```

Mantén el archivo `.env` en tu computador. Git lo excluye mediante `.gitignore`.

## 3. Agregar personas de ejemplo

En el explorador de datos de Atlas, crea la base `lab_personas` y la colección `personas`. En **Insert Document**, agrega cada documento por separado. Usa `edad` como número.

```json
{ "nombre": "Ana", "apellido": "Gómez", "edad": 21, "correo": "ana.gomez@example.com" }
```

```json
{ "nombre": "Luis", "apellido": "Pérez", "edad": 23, "correo": "luis.perez@example.com" }
```

```json
{ "nombre": "María", "apellido": "Rojas", "edad": 19, "correo": "maria.rojas@example.com" }
```

```json
{ "nombre": "Camilo", "apellido": "Herrera", "edad": 22, "correo": "camilo.herrera@example.com" }
```

## 4. Ejecutar y comprobar

```powershell
npm run dev
```

La terminal debe mostrar lo siguiente al conectar:

```text
Conectado a MongoDB. Base de datos: lab_personas
Servidor listo en http://localhost:3000
```

Abre [http://localhost:3000](http://localhost:3000). Con los cuatro registros de ejemplo, la tabla muestra **Ana Gómez, Camilo Herrera, Luis Pérez y María Rojas**, en ese orden, y el total es **4**. Si la colección está vacía, la página muestra un aviso y el total es **0**.

| Si aparece | Revisa |
| --- | --- |
| Falta MONGODB_URI | Que el archivo se llame `.env` y esté al lado de `server.js`. |
| Authentication failed | Que estés usando el usuario de base de datos y su contraseña de Atlas. |
| Tiempo de conexión agotado | Que el clúster esté activo y tu IP esté en la lista de acceso. |
| Tabla vacía | Que la URI apunte a `lab_personas` y los registros estén en `personas`. |

## Cómo funciona

| Archivo | Función |
| --- | --- |
| `server.js` | Carga las variables de entorno y arranca Express después de conectar MongoDB. |
| `src/configurations/database.js` | Conecta Mongoose con la URI del archivo `.env`. |
| `src/index.js` | Configura EJS, sirve los estilos y monta el router. |
| `src/routes/personaRoutes.js` | Conecta `GET /` con el controlador. |
| `src/models/persona.js` | Define los cuatro campos y la colección `personas`. |
| `src/controllers/personaController.js` | Consulta las personas, las ordena por apellido y nombre y envía el resultado a la vista. |
| `src/views/personas/index.ejs` | Muestra las filas, el total y el mensaje de colección vacía. |

La aplicación solo consulta datos. Los documentos de prueba se agregan desde Atlas. EJS usa `<%=` para mostrar los valores como texto.

## Entrega

Crea un repositorio propio en GitHub para este laboratorio. Si descargaste el código como ZIP, clona tu repositorio en otra carpeta y copia allí los archivos del ZIP, incluido `.gitignore`. La carpeta `node_modules` y el archivo `.env` se quedan en tu computador.

```powershell
git clone https://github.com/TU_USUARIO/lab-node-db.git lab-node-db-github
cd lab-node-db-github
# Copia aquí los archivos del proyecto antes de seguir.
git add .
git commit -m "Completa el laboratorio de listado de personas"
git push -u origin HEAD
```

Abre el repositorio y verifica que aparezcan `server.js`, `src` y este README. En Classroom entrega un archivo `.txt` que contenga únicamente el enlace al repositorio.

[Plantilla original del laboratorio](https://github.com/juliomartinezpascual/lab-node-db)
