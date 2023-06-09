// ************** CREANDO UNA API PARA GESTIONAR USUARIOS **************

// Estructura del Archivo src/app.js - 1. AL PRINCIPIO importacion de la libreria express
import express from 'express'

// Estructura del Archivo src/app.js - 1.1 AL PRINCIPIO importamos el archivo /user.router.js
import userRouter from './routers/user.router.js'

// Estructura del Archivo src/app.js - 1.2 AL PRINCIPIO importamos el archivo /pets.router.js
import petRouter from './routers/pet.router.js'

// Estructura del Archivo src/app.js - 2. AL CENTRO la Ejecucion de la libreria Express  
const app = express()
app.use(express.json())

// Estructura del Archivo src/app.js - 3. EN EL MEDIO DE TODO se escriben y ejecutan todos los endpoints

//endpoint - Raiz '/' - este siempre va - hace referencia al http://localhost:8080/
app.get('/', (req, res) => res.send('ok'))
//endpoint - '/health' - este siempre va 
app.get('/health', (req, res) => res.json({ message: 'The Server is running on port 8080' }))


// ----- IMPORTANTE ESTOS SON LOS ENDPOINTS MINIMOS NECESARIOS QUE CUMPLE CON EL (C.R.U.D) - para cada entidad que desee crear 

//RECORDATORIO: Las entidades son todas esas cosas que deseo crear -- ejemplo: Productos/proveedores/usarios/clientes/e-commerce/carritosDecompra etc etc.... 

// ------- Estos 5  Endpoints son el minimo requerido para cada entidad a Crear - "USAMOS COMO EJEMPLO LA ENTIDAD PRODUCTOS" 
//1. endpoint (READ) - para LEER todos los productos
//2. endpoint (READ)- para LEER un solo producto a partir de su ID 
//3. endpoint (CREATE)- para CREAR/registrar/dar de alta un nuevo producto 
//4. endpoint (UPDATE)- para ACTUALIZAR un producto a partit de su ID  
//5. endpoint (ELIMINAR)- para ELIMINAR/borrar/dar de baja  un producto a partit de su ID

/* 
***** Split = modularize! = module // que significa "Create modulos para cada entidad" 
**** AL TENER MUCHAS ENTIDADES EN LA API SE MODULARIZA 

HACER SPLIT DEL CODIGO: Se hace Split(separacion/separado) del codigo xq van a necesitar 5 endpoints minimo por cada entidad a crear

- ** Para hacer esa creacion de modulos Usaremos la funcionalidad ROUTER incluida en la libreria EXPRESS, fue creada para splitear/modularizar/enrutar y que src/app.js no sea tan grande y en otro archivo a parte creamos los modulos(dentro del modulo van los endpoints) para cada entidad - cumplimos con LA BUENA PRACTICA 
- 

--- SIGUENTE PASO IMPORTANTE ---- 
A) En la carpera src/ creamos la carpeta routers(rutas) "src/routers"
B) Dentro de "src/routers" creamos todos los routers(rutas)/moduladores necesarios para cada entidad 
C) Crear el primer Router para el Entidad "user" --- "src/routers/user.router.js" (usando el formato de nombre de 
    nombre.apellido.js)
*/

// --------- 3.1 USANDO LOS ENDPOINTS EXPORTADOS Y CREADO PARA AL ENTIDAD "user"(C.R.U.D) -------------

// ACTIVANDO EL USO DEL ROUTER PARA 'user' desde src/app.js
// Esto significa que en el endpoint '/users' USA los metodos (endpoints) creador en el router "userRouter" (routes de usuarios - creado en 'user.router.js')

// Estructura Primaria de un middelware - se le agrega la funcion next()
// la funcion next() es la funcion que se debe ejecutar antes terminar la funcion middelware 
// OJO: importante siempre colocar el "next()"" dentro de la funcion xq SINO nunca recibire respuesta en la ruta por el thunderclient al probarla 
const middelware1 = (res, req, next) => {
    console.log('Soy un middleware 1')
    // el next() le da el pase al router, sino se coloca esto dentro de la funciona nunca podra funcionar la ruta (endpoint)
    // los middelware se usa por ejemplo para validar un usuario antes de darle acceso a la ruta (endpoint)
    next()
}
// Ejemplo para validar un error con middelware 

// harcodeando el Error para probarlo en el endpoint '/pets' - lo coloco en true para afirmar que existe el error 
// y no deja pasar al endpoint - cuenta como una consulta la API
const error = true

const middelware2 = (req, res, next) => {
    console.log('Soy un middleware 2')
    if (error) return res.status(400).json({ error: 'Hubo un error'})
    next()
}

// se denomina middelwares xq se la coloco en el medio (en medio)
// Antes de alguien solicite algo a la ruta user (userRouter), prime se va a ejecutar el middelware1 por eso su nombre
app.use('/users',middelware1, userRouter)

// ACTIVANDO EL USO DEL ROUTER PARA 'pet' desde src/app.js
app.use('/pets',middelware1,middelware2, petRouter)

// Estructura del Archivo src/app.js - 4. FINALIZA CON EL SERVIDOR AL FINAL DE LAS LINEA DE CODIGO SIEMPRE ESCUCHANDO
app.listen(8080, () => console.log('Server up'))