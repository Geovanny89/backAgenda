const express = require('express')
const router = express.Router();

const routerCirujanos = require('./Admin/Cirujanos/cirujanos')
const routerHabitaciones= require('./Admin/Habitaciones/habitaciones')
const routerPacientes = require('./Admin/Pacientes/pacientes')
const routerProcedimiento= require('./Admin/Procedimientos/procedimientos')
const routerSalas= require('./Admin/Salas/sala')
const routerUser = require('./User/auth')


router.use('/',routerCirujanos)
router.use('/',routerHabitaciones)
router.use('/',routerPacientes)
router.use('/',routerProcedimiento)
router.use('/',routerSalas)
router.use('/',routerUser)



module.exports = router;