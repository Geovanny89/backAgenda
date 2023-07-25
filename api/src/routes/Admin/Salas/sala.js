const {Router} = require('express')
const salasSchema = require('../../../database/salas');
const authMiddleware = require('../../../Middleware/sesion');
const checkRol = require('../../../Middleware/rol');
const router= Router();

router.get('/allSalas', async(req,res)=>{
    try {
        const allSala= await salasSchema.find()
        
        res.status(200).send(allSala)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor")
    }
})
router.get('/salas/:id',authMiddleware, async(req,res)=>{
    try {
        const {id}= req.params
        const allSala= await salasSchema.findById(id)
        
        res.status(200).send(allSala)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor")
    }
})

router.post('/salas',authMiddleware,checkRol(["admin"]), async(req, res)=>{
    try {
        const {name}= req.body
        if(!name){
            res.status(404).send("Falta el nombre de la sala")
            return
        }
        const sala = await salasSchema(req.body)
        sala.save()
        res.status(200).send(sala)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor")
    }


})
router.put('/sala/:id',authMiddleware,checkRol(["admin"]),async(req, res)=>{
    try {
        const {id}= req.params
        const sala= await salasSchema.findById(id)
        if(!sala){
            res.status(404).send("No existe sala con ese Id")
        }
        const {name}= req.body
        const salaUpdate= await salasSchema.findByIdAndUpdate(id,{
            name
        })
        res.status(200).send(salaUpdate)
        
    } catch (error) {
        console.log(error)
        res.status(404).send("Error de servidor")
    }
})
router.delete('/eliminar/:id',authMiddleware,checkRol(["admin"]),async (req,res)=>{
    try {
        const {id}= req.params
        const salaId = await salasSchema.findById(id)
        if(!salaId){
            res.status(404).send("No existe sala con ese Id")
        }
        const salaDelete= await salasSchema.findByIdAndDelete(salaId)
        res.status(200).send("Se elimino la sala")
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de Servidor ")
    }
})
module.exports= router;
