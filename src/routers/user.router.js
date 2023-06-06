// ***-> Estructura del Archivo src/routers/user.router.js - 1. AL PRINCIPIO importacion de la funcionalidad ROUTER incluida en la libreria EXPRESS
import { Router } from 'express'

// ***-> Estructura del Archivo src/routers/user.router.js - 2. AL CENTRO la Ejecucion de la funcionalidad ROUTER
const router = Router()

// ***-> Estructura del Archivo src/routers/user.router.js - 3. EN EL MEDIO DE TODO se crean todas las rutas - endpoints

// --------- 3.1 CREACION DE LOS ENDPOINTS PARA AL ENTIDAD "users"(C.R.U.D) -------------

//3.1 endpoint (READ) - para LEER todos los "user" -- hace referencia al http://localhost:8080/users/

router.get('/', (req, res) => {
    res.json({ message: 'Aqui va la lista de usuarios' })
})

//3.2 endpoint (READ)- para LEER un solo "user" a partir de su ID ( ojo el ID se recibe por URL params --> seria: '/:id')

router.get('/:id', (req, res) => {
    const id = req.params.id
    // usando backtip
    res.json({ message: `Aqui van los detalles del usuario con id = ${id}` })
})

//3.3 endpoint (CREATE)- para CREAR/registrar/dar de alta un nuevo "user"
router.post('/', (req, res) => {
    res.json({ message: 'Usuario Creado con Exito!' })
})

//3.4 endpoint (UPDATE)- para ACTUALIZAR  los datos de un "user" a partit de su ID
router.put('/:id', (req, res) => {
    const id = req.params.id
    // usando backtip
    res.json({ message: `Actualizacion exitosa del usuario con id = ${id}` })
})

//3.5 endpoint (ELIMINAR)- para ELIMINAR/borrar/dar de baja un "user" a partir de su ID
router.delete('/:id', (req, res) => {
    const id = req.params.id
    // usando backtip
    res.json({ message: `Usuario con id = ${id} eliminado` })
})

// ***-> Estructura del Archivo src/routers/user.router.js - 4. FINALIZA CON LA EXPORTACION  AL FINAL DE LAS LINEA DE la funcionalidad ROUTER
export default router