const { Router } = require('express')
const habitacionesSchema = require('../../../database/habitaciones')
const authMiddleware = require('../../../Middleware/sesion')
const checkRol = require('../../../Middleware/rol')
const router = Router()

router.get('/habita', async (req, res) => {
    try {
        const habitaciones = await habitacionesSchema.find()
        if (!habitaciones) {
            res.status(404).send("No existen Habitaciones")
            return
        }
        res.status(200).send(habitaciones)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor ")
    }
})

router.get('/habita/:id',authMiddleware, async (req, res) => {
    try {
        const {id}= req.params
        const habitaciones = await habitacionesSchema.findById(id)
        if (!habitaciones) {
            res.status(404).send("No existen Habitaciones")
            return
        }
        res.status(200).send(habitaciones)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor ")
    }
})
router.post('/habitaciones',authMiddleware,checkRol(["admin"]), async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(404).send("Faltan datos")
            return
        }
        const habitacion = await habitacionesSchema(req.body)
        habitacion.save()
        res.status(200).send(habitacion)


    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor")
    }
})
router.put('/habitaciones/:id',authMiddleware,checkRol(["admin"]), async (req, res) => {
    try {
        const { id } = req.params
        const habitaciones = await habitacionesSchema.findById(id)
        if (!habitaciones) {
            res.status(404).send("No existe Habitacion con ese Id")
            return
        }
        const { name } = req.body
        const updateHabitacion = await habitacionesSchema.findByIdAndUpdate(id,{
            name
        }, { new: true })
        res.status(200).send(" Se actualizo la habitacion ")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor ")
    }
})
router.delete('/habitacion/:id',authMiddleware,checkRol(["admin"]), async(req,res)=>{
    try {
        
        const {id}= req.params
        const habitacion= await habitacionesSchema.findById(id)
        if(!habitacion){
            res.status(404).send("No existe Habitacion")
        }
        const habitaciondelete= await habitacionesSchema.findByIdAndDelete(habitacion)
        res.status(200).send("Habitacion Eliminada con exito")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor ")
    }
})

module.exports = router;
