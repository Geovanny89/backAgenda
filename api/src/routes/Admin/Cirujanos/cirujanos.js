const { Router } = require('express')
const cirujanosSchema = require('../../../database/cirujano');
// const authMiddleware = require('../../../Middleware/sesion');
// const checkRol = require('../../../Middleware/rol');
const router = Router();

router.get('/profesionales', async (req, res) => {
  try {
    // const user =req.user  // obtener el usuario que hace la consulta 
    const profesional = await cirujanosSchema.find()
    if (!profesional) {
      res.status(404).send("No existen Cirujanos")
      return
    }
    res.status(200).send(profesional)
  } catch (error) {
    console.log(error)
    res.status(500).send("Error de servidor ")
  }
})
router.get('/profesionales/:id', async (req, res) => {
  try {
    const {id}= req.params
    const profesional = await cirujanosSchema.findById(id)
    if (!profesional) {
      res.status(404).send("No existen Cirujanos")
      return
    }
    res.status(200).send(profesional)
  } catch (error) {
    console.log(error)
    res.status(500).send("Error de servidor ")
  }
})
router.post('/cirujanos', async (req, res) => {
  const { name, lastName, email } = req.body
  if ((!name || !lastName || !email)) {
    return res.status(404).send('Faltan datos')

  }
  try {

    const newCirujano =await cirujanosSchema(req.body)
    newCirujano.save()
    res.status(200).send(newCirujano)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error de servidor')
  }
})
router.put('/paciente/:id', async (req, res) => {
  try {
    const { id } = req.params
    const cirujano = cirujanosSchema.findById(id)
    if (!cirujano) {
      res.status(404).send("No existe Cirujano con ese Id")
    }
    const { name, lastName, email } = req.body
    const updateCirujano = await cirujanosSchema.findByIdAndUpdate(id, {
      name,
      lastName,
      email
    }, { new: true })
    res.status(200).send(updateCirujano)
  } catch (error) {
    console.log(error)
    res.status(500).send("Error de servidor")
  }
})
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params
    const cirujano = await cirujanosSchema.findById(id)
    if (!cirujano) {
      res.status(404).send("No existe cirujano con ese Id ")
      return
    }
    const deleteCirujano = await cirujanosSchema.findByIdAndDelete(cirujano)
    res.status(200).send("Cirujano Eliminado con Éxito")
  } catch (error) {
    console.log(error)
    res.status(500).send("Error de servidor")
  }
})

module.exports = router;