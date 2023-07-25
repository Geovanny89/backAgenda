const { Router } = require('express')
const pacientesSchema = require('../../../database/pacientes')
const Cirujano = require('../../../database/cirujano')
const Procedimiento = require('../../../database/procedimientos')
const Salas = require('../../../database/salas')
const Habitaciones = require('../../../database/habitaciones')
const authMiddleware = require('../../../Middleware/sesion')
const checkRol = require('../../../Middleware/rol')

const router = Router();

router.get('/pacien', async (req, res) => {
    try {
        // Obtener todos los pacientes de la base de datos
        const pacientes = await pacientesSchema.find()
            .populate('cirujano')
            .populate('procedimiento')
            .populate('sala')
            .populate('habitacion');

        if (pacientes.length === 0) {
            return res.status(404).send("No existen pacientes");
        }

        res.status(200).json(pacientes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de servidor");
    }
});
router.get('/pacien/name',async(req,res)=>{
    try {
        const name = req.query.name
        const regex = new RegExp(name, 'i'); // Expresión regular sin distinción entre mayúsculas y minúsculas

    const paciente = await pacientesSchema.find({ name: regex });
        if(!paciente){
            res.status(404).send("Paciente no encontrado")
            return
        }
        res.status(200).send(paciente)
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
    }
})
router.get('/pacien/:id', async (req, res) => {
    try {
        // Obtener todos los pacientes de la base de datos
        const {id} = req.params
        const pacientes = await pacientesSchema.findById(id)
            .populate('cirujano')
            .populate('procedimiento')
            .populate('sala')
            .populate('habitacion');

        if (pacientes.length === 0) {
            return res.status(404).send("No existen pacientes");
        }

        res.status(200).json(pacientes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de servidor");
    }
});


router.post('/pacientes', async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { name, lastName,id, cirujanoId, procedimientoId, salaId, habitacionId, day, month, year, hour,minute } = req.body;
        console.log(req.body)
        // Crear un nuevo paciente
        const paciente = new pacientesSchema({ name, lastName,id });
        paciente.day = day;
        paciente.month = month;
        paciente.year = year;
        paciente.hour = hour;
        paciente.minute = minute;

        // Buscar y asociar el cirujano al paciente
        const cirujano = await Cirujano.findById(cirujanoId)
        
        paciente.cirujano = cirujano;

        // Buscar y asociar el procedimiento al paciente
        const procedimiento = await Procedimiento.findById(procedimientoId);
        paciente.procedimiento = procedimiento;

        // Buscar y asociar la sala al paciente
        const sala = await Salas.findById(salaId);
        paciente.sala = sala;

        // Buscar y asociar la habitación al paciente
        const habitacion = await Habitaciones.findById(habitacionId);
        paciente.habitacion = habitacion;

        // Guardar el paciente en la base de datos
        await paciente.save();
        res.status(200).send(paciente)

    } catch (error) {
        res.status(500).json({ error: 'Error al crear el paciente' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName,estado, cirujanoId, procedimientoId, salaId, habitacionId, day, month, year, hour,minute } = req.body;

        // Verificar si existe el paciente con el ID proporcionado
        const paciente = await pacientesSchema.findById(id);
        if (!paciente) {
            return res.status(404).send("No existe paciente con ese ID");
        }

        // Actualizar los campos del paciente
        paciente.name = name;
        paciente.lastName = lastName;
        paciente.estado = estado;
        paciente.day = day;
        paciente.month = month;
        paciente.year = year;
        paciente.hour = hour;
        paciente.minute=minute;

        // Buscar y asociar el cirujano al paciente
        const cirujano = await Cirujano.findById(cirujanoId);
        if (!cirujano) {
            return res.status(404).send("No existe cirujano con ese ID");
        }
        paciente.cirujano = cirujano;

        // Buscar y asociar el procedimiento al paciente
        const procedimiento = await Procedimiento.findById(procedimientoId);
        if (!procedimiento) {
            return res.status(404).send("No existe procedimiento con ese ID");
        }
        paciente.procedimiento = procedimiento;

        // Buscar y asociar la sala al paciente
        const sala = await Salas.findById(salaId);
        if (!sala) {
            return res.status(404).send("No existe sala con ese ID");
        }
        paciente.sala = sala;

        // Buscar y asociar la habitación al paciente
        const habitacion = await Habitaciones.findById(habitacionId);
        if (!habitacion) {
            return res.status(404).send("No existe habitación con ese ID");
        }
        paciente.habitacion = habitacion;

        // Guardar los cambios en el paciente
        await paciente.save();

        res.status(200).send(paciente);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de servidor");
    }
});

router.delete('/paciente/:id', async (req, res) => {
    try {
        const { id } = req.params
        const paciente = await pacientesSchema.findById(id)
        if (!paciente) {
            res.status(404).send("No existe paciente con ese Id")
        }
        const pacienteDelete = await pacientesSchema.findByIdAndDelete(paciente)
        res.status(200).send("Paciente Eliminado con exito")

    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor")
    }
})
module.exports = router