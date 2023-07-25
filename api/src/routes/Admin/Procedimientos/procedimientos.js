const {Router}= require('express')
const procedimientosSchema = require('../../../database/procedimientos');
const authMiddleware = require('../../../Middleware/sesion');
const checkRol = require('../../../Middleware/rol');
const router= Router();

router.get('/proce', async(req, res)=>{
  try {
    const procedimientos = await procedimientosSchema.find()
    res.status(200).send(procedimientos)
    
  } catch (error) {
    console.log(error)
    res.status(500).send("Error de servidor")
  } 
  
})
router.get('/proce/:id', async(req, res)=>{
  try {
    const {id}= req.params
    const procedimientos = await procedimientosSchema.findById(id)
    res.status(200).send(procedimientos)
    
  } catch (error) {
    console.log(error)
    res.status(500).send("Error de servidor")
  } 
  
})

router.post('/procedimientos', async(req,res)=>{
    try {
        
        const { name  }= req.body
        if(!name){
            res.status(404).send("Falta el Nombre del procedimiento")
            return
        }
        const procedimiento = await procedimientosSchema(req.body)
        procedimiento.save()
      
        res.status(200).send(procedimiento)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor")
    }
})
router.put('/procedimiento/:id', async(req,res)=>{
  try {
    const {id}= req.params
    const procedimiento = await procedimientosSchema.findById(id)
    if(!procedimiento){
      res.status(404).send("No existe Procedimiento con ese Id")
      return
    }
    const {name}= req.body
    const procedimientoUpdate= await procedimientosSchema.findByIdAndUpdate(id,{
      name
    },{new:true})
    res.status(200).send("Procedimiento Actualizado Correctamente")
  } catch (error) {
    console.log(error)
    res.status(500).send("Error de servidor ")
  }
})
router.delete('/procedimiento/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const procedimiento = await procedimientosSchema.findById(id)
    if(!procedimiento){
      res.status(404).send("No existe procedimiento con ese Id")
      return
    }
    const procedimientoDelete= await procedimientosSchema.findByIdAndDelete(procedimiento)
    res.status(200).send("Procedimiento eliminado correctamente")
    
  } catch (error) {
    console.log(error)
    res.status(500).send("Error de Servidor")
  }
})

 

module.exports= router;