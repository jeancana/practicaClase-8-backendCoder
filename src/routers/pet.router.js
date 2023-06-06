
import { Router } from 'express'

const router = Router()


let pets = [
    { id: 1, name: 'Firulais', age: 4 },
    { id: 2, name: 'Cremita', age: 1 },
    { id: 3, name: 'Nucita', age: 7 },
    { id: 4, name: 'Jagger', age: 2 }
]



//3.1 endpoint (READ) - para LEER todos los "user" -- hace referencia al http://localhost:8080/pets/
router.get('/', (req, res) => {
    // enviado todo los pets junto con su Status code 
    res.status(200).json({ pets })
})

//3.2 endpoint (READ)- para LEER un solo "pet" a partir de su ID ( ojo el ID se recibe por URL params --> seria: '/:id')
router.get('/:id', (req, res) => {
    const id = req.params.id
    const pet = pets.find(item => item.id == id) 
    if(!pet) return res.status(404).json({ messega: 'this pet not exist'})
    res.json({ pets })
})

//3.3 endpoint (CREATE)- para CREAR/registrar/dar de alta un nuevo "pet" 
// la Buena Practica es mandar los datos por Body
router.post('/', (req, res) => {
    //recibiendo los datos por body
    const { id, name, age } = req.body
    // Pusheando los datos del array para Crear un nuevo pet 
    pets.push({ id, name, age })
    res.json({ message: 'Mascota Registrada con Exito!' })
})

//3.4 endpoint (UPDATE)- para ACTUALIZAR  los datos de un "user" a partit de su ID
router.put('/:id', (req, res) => {
    // recibiendo el id que necesitamos por URL params
    const id = req.params.id
    // recibiendo data a actualizar que viene por body
    const data = req.body
    // buscando el pet a traves de su indice 
    const petIndex = pets.findIndex(item => item.id == id)
    pets[petIndex] = { ...pets[petIndex], ...data } 
    res.json({ message: `Actualizacion exitosa de pet con id = ${id}` })
})

//3.5 endpoint (ELIMINAR)- para ELIMINAR/borrar/dar de baja un "user" a partir de su ID
// NOTA: para poder borrar algun "user" y que funcione el array de objetos "users" no debe ser "const (constante)", sino "let (variable)"
router.delete('/:id', (req, res) => {
    // Recibiendo el ID que queremos eliminar 
    const id = req.params.id
    pets = pets.filter(item => item.id != id)
    // usando backtip
    res.json({ message: `Mascota con id = ${id} eliminado` })
})


export default router