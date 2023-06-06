//******** LA MODULARIZACION NOS AYUDA A VOLVER EL CODIGO MUCHO MAS LEGIBLE / SE ESCALA MUCHA MAS EL PROYECTO  **************

// ***-> Estructura del Archivo src/routers/user.router.js - 1. AL PRINCIPIO importacion de la funcionalidad ROUTER incluida en la libreria EXPRESS
import { Router } from 'express'

// ***-> Estructura del Archivo src/routers/user.router.js - 2. AL CENTRO la Ejecucion de la funcionalidad ROUTER
const router = Router()

// creando un array vacio para generar un BD estatica en memoria volatil - para usar de ejemplo
let users = [
    { id: 1, name: 'Aquiles Brinco', age: 45 },
    { id: 2, name: 'Alan Brito', age: 23 },
    { id: 3, name: 'Dolores de Cabeza', age: 34 },
    { id: 4, name: 'Barry Gon', age: 18 }
]

// ***-> Estructura del Archivo src/routers/user.router.js - 3. EN EL MEDIO DE TODO se crean todas las rutas - endpoints

// --------- 3.1 CREACION DE LOS ENDPOINTS PARA AL ENTIDAD "users"(C.R.U.D) -------------


//3.1 endpoint (READ) - para LEER todos los "user" -- hace referencia al http://localhost:8080/users/
router.get('/', (req, res) => {
    // enviado todo los ususarios junto con su Status code 
    res.status(200).json({ users })
})

//3.2 endpoint (READ)- para LEER un solo "user" a partir de su ID ( ojo el ID se recibe por URL params --> seria: '/:id')
router.get('/:id', (req, res) => {
    const id = req.params.id
    //leyeno un solo 'user a partir de su id 
    const user = users.find(item => item.id == id)
    // validando su el array esta vacio o el usuario no existe 
    if(!user) return res.status(404).json({ messega: 'this user not exist'})
    // usando backtip
    res.json({ user })
})

//3.3 endpoint (CREATE)- para CREAR/registrar/dar de alta un nuevo "user" 
// la Buena Practica es mandar los datos por Body
router.post('/', (req, res) => {
    //recibiendo los datos por body
    const { id, name, age } = req.body
    // Pusheando los datos del array para Crear un nuevo usuario 
    users.push({ id, name, age })
    res.json({ message: 'Usuario Creado con Exito!' })
})

//3.4 endpoint (UPDATE)- para ACTUALIZAR  los datos de un "user" a partit de su ID
router.put('/:id', (req, res) => {
    // recibiendo el id que necesitamos por URL params
    const id = req.params.id
    // recibiendo data a actualizar que viene por body
    const data = req.body
    // buscando el user a traves del su indice 
    const userIndex = users.findIndex(item => item.id == id)
    // Usan el Spread Operator HOF para hacer las actualizaciones del objeto (el objeto es el usuario ) dentro del array users 
    // OJO necesito que me expliquen esto MEJOR buscar AYUDA TECNICA
    users[userIndex] = { ...users[userIndex], ...data } 
    // usando backtip
    res.json({ message: `Actualizacion exitosa del usuario con id = ${id}` })
})

//3.5 endpoint (ELIMINAR)- para ELIMINAR/borrar/dar de baja un "user" a partir de su ID
// NOTA: para poder borrar algun "user" y que funcione el array de objetos "users" no debe ser "const (constante)", sino "let (variable)"
router.delete('/:id', (req, res) => {
    // Recibiendo el ID que queremos eliminar 
    const id = req.params.id
    users = users.filter(item => item.id != id)
    // usando backtip
    res.json({ message: `Usuario con id = ${id} eliminado` })
})

// ***-> Estructura del Archivo src/routers/user.router.js - 4. FINALIZA CON LA EXPORTACION  AL FINAL DE LAS LINEA DE la funcionalidad ROUTER
export default router